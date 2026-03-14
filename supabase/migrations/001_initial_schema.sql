-- ============================================================
-- Nomara — Initial Schema
-- Run this in the Supabase SQL editor or via supabase db push
-- ============================================================

-- -------------------------
-- profiles
-- Extends auth.users. Created automatically on signup via trigger.
-- We never store password_hash — Supabase Auth handles that.
-- -------------------------
create table if not exists public.profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,
  nationality         text,                        -- ISO 3166-1 alpha-2 country code e.g. "NG"
  currency_preference text not null default 'USD', -- ISO 4217 e.g. "NGN", "USD"
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Keep updated_at current
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- -------------------------
-- destinations
-- Static/seeded data for countries. Visa and budget info stored as JSONB.
-- -------------------------
create table if not exists public.destinations (
  id                   uuid primary key default gen_random_uuid(),
  country_code         text not null unique, -- ISO 3166-1 alpha-2 e.g. "GB"
  country_name         text not null,
  city                 text,                -- Primary city e.g. "London"
  visa_requirements    jsonb,               -- Keyed by passport country_code
  budget_estimates     jsonb,               -- { "budget": {}, "mid": {}, "luxury": {} }
  itinerary_templates  jsonb,               -- Pre-built day plans
  last_verified_at     timestamptz
);

-- -------------------------
-- visa_guides
-- Per origin→destination pair. Source of truth for visa check flow.
-- Never AI-generated — populated from APIs and manual research only.
-- -------------------------
create table if not exists public.visa_guides (
  id                   uuid primary key default gen_random_uuid(),
  origin_country       text not null,       -- Passport country e.g. "NG"
  destination_country  text not null,       -- Destination country e.g. "GB"
  requirement_type     text not null check (
                         requirement_type in (
                           'visa-free',
                           'evisa',
                           'visa-on-arrival',
                           'embassy-visa'
                         )
                       ),
  allowed_stay_days    int,                 -- Max days permitted per entry
  documents_required   jsonb,               -- Array of required document names
  step_by_step_guide   text,                -- Markdown application guide
  official_links       jsonb,               -- Array of { label, url }
  processing_time_days int,                 -- Typical processing time
  fee_usd              numeric(8, 2),       -- Visa fee in USD
  last_updated_at      timestamptz not null default now(),
  unique (origin_country, destination_country)
);

-- -------------------------
-- saved_trips
-- Requires auth. Guest mode can plan but cannot save.
-- -------------------------
create table if not exists public.saved_trips (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  destination   text not null,
  start_date    date,
  end_date      date,
  budget_tier   text check (budget_tier in ('budget', 'mid', 'luxury')),
  itinerary     jsonb,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles     enable row level security;
alter table public.destinations  enable row level security;
alter table public.visa_guides   enable row level security;
alter table public.saved_trips   enable row level security;

-- profiles: users can only read/write their own row
create policy "profiles: owner access"
  on public.profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- destinations: public read, no public write
create policy "destinations: public read"
  on public.destinations
  for select
  using (true);

-- visa_guides: public read, no public write
create policy "visa_guides: public read"
  on public.visa_guides
  for select
  using (true);

-- saved_trips: owner access only
create policy "saved_trips: owner access"
  on public.saved_trips
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
