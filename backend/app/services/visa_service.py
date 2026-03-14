"""
Mock visa data for Nigerian passport (NG).

This module returns static, hand-researched visa information.
Visa data is NEVER AI-generated. All data should be verified against
official embassy sources before going live. Always show last_verified_at.

Week 3-4: replace get_visa_guide() with a live Sherpa/VisaList API call.
"""

from typing import Optional
from app.models.visa import VisaGuide, OfficialLink

ADVISORY = (
    "Visa information is advisory only. "
    "Always confirm with official embassy sources before travelling."
)

# ---------------------------------------------------------------------------
# Static data keyed by (passport_code, destination_code).
# Destination codes are ISO 3166-1 alpha-2 except "SCHENGEN" (multi-country).
# ---------------------------------------------------------------------------

_DATA: dict[tuple[str, str], VisaGuide] = {

    # -----------------------------------------------------------------------
    ("NG", "GB"): VisaGuide(
        destination_code="GB",
        destination_name="United Kingdom",
        requirement_type="embassy-visa",
        allowed_stay_days=180,
        processing_time_days=15,
        fee_usd=127,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Completed online application (UK Visas & Immigration)",
            "Biometric appointment attendance",
            "3–6 months bank statements showing sufficient funds",
            "Employer letter confirming employment, salary, and approved leave",
            "Confirmed accommodation (hotel booking or host's letter)",
            "Return flight itinerary",
            "Travel insurance (strongly recommended)",
        ],
        step_by_step_guide="""
## UK Standard Visitor Visa — Step-by-step

1. **Apply online** at UKVI (gov.uk). Create an account and complete the application form.
2. **Pay the fee** (£115 / ~$127) online via card.
3. **Book a biometrics appointment** at the nearest VFS Global centre in Nigeria (Lagos or Abuja).
4. **Attend your appointment** and submit your supporting documents.
5. **Track your application** via the UKVI online portal. Decisions typically take 3–4 weeks.
6. **Collect your passport** from the VFS centre or request courier return.

> Processing is 15 working days as standard. Priority (5 working days) costs extra.
""".strip(),
        official_links=[
            OfficialLink(label="Apply online — UK Visas & Immigration", url="https://www.gov.uk/standard-visitor-visa"),
            OfficialLink(label="VFS Global Nigeria", url="https://www.vfsglobal.co.uk/en/nig/index.html"),
        ],
        last_verified_at="2026-01-15",
        notes="UK is not part of the Schengen zone — a separate visa is required.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "AE"): VisaGuide(
        destination_code="AE",
        destination_name="United Arab Emirates",
        requirement_type="visa-on-arrival",
        allowed_stay_days=30,
        processing_time_days=None,
        fee_usd=90,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Confirmed return flight ticket",
            "Hotel booking or invitation letter",
            "Proof of sufficient funds (cash or card)",
            "Yellow fever vaccination certificate",
        ],
        step_by_step_guide="""
## UAE Visa on Arrival — Step-by-step

1. **Board your flight** to any UAE airport (Dubai, Abu Dhabi, Sharjah).
2. **Proceed to immigration** on arrival — do not join the e-gate queue.
3. **Present your passport**, return ticket, and hotel booking to the immigration officer.
4. **Pay the visa fee** (~AED 330 / $90) at the immigration counter.
5. **Receive your visa stamp** — valid for 30 days, single entry.

> Ensure you have proof of funds and onward/return travel. Officers may ask to see your hotel booking on your phone.
""".strip(),
        official_links=[
            OfficialLink(label="UAE Federal Authority for Identity & Citizenship", url="https://icp.gov.ae"),
            OfficialLink(label="Dubai Airports — Entry requirements", url="https://www.dubaiairports.ae"),
        ],
        last_verified_at="2026-02-01",
        notes="Extensions possible for another 30 days at GDRFA offices inside the UAE.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "RW"): VisaGuide(
        destination_code="RW",
        destination_name="Rwanda",
        requirement_type="visa-on-arrival",
        allowed_stay_days=30,
        processing_time_days=None,
        fee_usd=30,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Return or onward flight ticket",
            "Confirmed accommodation",
            "Proof of sufficient funds",
            "Yellow fever vaccination certificate",
        ],
        step_by_step_guide="""
## Rwanda Visa on Arrival — Step-by-step

1. **Arrive at Kigali International Airport (KGL).**
2. **Proceed to the visa on arrival desk** before immigration.
3. **Complete the arrival form** provided on the aircraft or at the desk.
4. **Pay the fee** ($30 USD, cash or card) and present your passport and return ticket.
5. **Receive your stamp** — valid for 30 days, extendable once for another 30 days.

> You can also apply in advance via the Irembo eVisa portal to skip the queue.
""".strip(),
        official_links=[
            OfficialLink(label="Rwanda Directorate General of Immigration", url="https://www.migration.gov.rw"),
            OfficialLink(label="Irembo eVisa Portal", url="https://irembo.gov.rw/home/citizen/all_services"),
        ],
        last_verified_at="2026-01-20",
        notes="Rwanda is exploring visa-free access for all African passport holders — confirm current status before travel.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "GH"): VisaGuide(
        destination_code="GH",
        destination_name="Ghana",
        requirement_type="visa-free",
        allowed_stay_days=90,
        processing_time_days=None,
        fee_usd=None,
        documents_required=[
            "Valid Nigerian passport or ECOWAS travel document",
            "Return or onward ticket (recommended)",
            "Proof of accommodation",
            "Sufficient funds for your stay",
        ],
        step_by_step_guide="""
## Ghana — Visa-Free Entry (ECOWAS)

1. **Arrive at any port of entry** (Kotoka International Airport, Accra, or land borders).
2. **Present your Nigerian passport** to the immigration officer.
3. **Fill in the arrival card** if issued.
4. **Receive your entry stamp** — valid for up to 90 days.

> As a Nigerian citizen you benefit from ECOWAS free movement. No visa required.
""".strip(),
        official_links=[
            OfficialLink(label="Ghana Immigration Service", url="https://www.ghanaimmigration.org"),
            OfficialLink(label="ECOWAS Free Movement Protocol", url="https://www.ecowas.int"),
        ],
        last_verified_at="2026-01-10",
        notes="ECOWAS citizens may stay up to 90 days without a visa. Extensions require a residence permit.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "MA"): VisaGuide(
        destination_code="MA",
        destination_name="Morocco",
        requirement_type="embassy-visa",
        allowed_stay_days=90,
        processing_time_days=10,
        fee_usd=0,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Completed visa application form",
            "2 recent passport photographs",
            "Return flight itinerary",
            "Hotel booking or invitation letter",
            "3 months bank statements",
            "Proof of employment or business registration",
            "Travel insurance",
        ],
        step_by_step_guide="""
## Morocco Tourist Visa — Step-by-step

1. **Book an appointment** at the Moroccan Embassy or Consulate in Lagos or Abuja.
2. **Complete the application form** (available at the embassy or online).
3. **Gather your documents** — bank statements, employment letter, hotel booking, itinerary.
4. **Attend your appointment** and submit all documents in person.
5. **Wait for processing** — typically 7–10 business days.
6. **Collect your passport** with the visa sticker from the embassy.

> The visa fee is currently waived but confirm before your appointment.
""".strip(),
        official_links=[
            OfficialLink(label="Moroccan Embassy in Nigeria", url="https://www.embassyofmorocco.ng"),
            OfficialLink(label="Morocco Tourism", url="https://www.visitmorocco.com"),
        ],
        last_verified_at="2026-01-18",
        notes="Morocco visa is free of charge but must be applied for in person at the embassy.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "CA"): VisaGuide(
        destination_code="CA",
        destination_name="Canada",
        requirement_type="embassy-visa",
        allowed_stay_days=180,
        processing_time_days=56,
        fee_usd=75,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Completed online IMM 5257 application form",
            "Biometric enrollment (Lagos VFS centre)",
            "6 months bank statements",
            "Proof of ties to Nigeria (property, employment, family)",
            "Employer letter confirming employment and salary",
            "Tax returns or Notice of Assessment (if applicable)",
            "Invitation letter (if visiting family/friends)",
            "Travel history (prior visas to UK, USA, Schengen help)",
        ],
        step_by_step_guide="""
## Canada Temporary Resident Visa (TRV) — Step-by-step

1. **Create an IRCC account** at ircc.canada.ca and complete the online application.
2. **Pay the fee** (CAD $100 / ~$75 USD) online by card.
3. **Upload all supporting documents** in PDF format through the IRCC portal.
4. **Enroll biometrics** at the nearest VFS Global centre in Lagos or Abuja.
5. **Monitor your application** via the IRCC portal — processing averages 8 weeks but can take longer.
6. **Respond promptly** if IRCC requests additional documents or an interview.
7. **Receive your visa** as a stamp or CAN-issued counterfoil in your passport.

> Strong proof of ties to Nigeria significantly improves approval chances.
""".strip(),
        official_links=[
            OfficialLink(label="IRCC — Visitor Visa Application", url="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html"),
            OfficialLink(label="VFS Global Nigeria — Canada", url="https://www.vfsglobal.ca/canada/nigeria"),
        ],
        last_verified_at="2026-02-10",
        notes="Canada processing times fluctuate significantly — apply at least 3 months before your travel date.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "ZA"): VisaGuide(
        destination_code="ZA",
        destination_name="South Africa",
        requirement_type="embassy-visa",
        allowed_stay_days=90,
        processing_time_days=10,
        fee_usd=0,
        documents_required=[
            "Valid Nigerian passport (30+ days beyond intended stay)",
            "Completed BI-84 visa application form",
            "2 recent passport photographs (35mm x 45mm, white background)",
            "Return flight itinerary",
            "Proof of accommodation (hotel booking or host letter + host's ID)",
            "Bank statements (last 3 months)",
            "Yellow fever vaccination certificate",
            "Travel insurance (minimum $30,000 cover)",
            "Police clearance certificate (within 6 months)",
        ],
        step_by_step_guide="""
## South Africa Visitor Visa — Step-by-step

1. **Book an appointment** at the South African High Commission in Abuja or Consulate in Lagos.
2. **Complete the BI-84 form** (downloadable from the High Commission website).
3. **Compile all documents** including police clearance (apply via Nigeria Police Force).
4. **Attend your appointment** — biometrics are collected at the mission.
5. **Pay no fee** — South Africa does not charge a visa fee for Nigerian applicants.
6. **Wait for processing** — typically 7–10 business days.
7. **Collect your passport** with the visa stamp.

> Police clearance is mandatory and takes 2–4 weeks to obtain — start early.
""".strip(),
        official_links=[
            OfficialLink(label="South African High Commission in Nigeria", url="https://www.sahc.org.ng"),
            OfficialLink(label="SA Department of Home Affairs — Visas", url="https://www.dha.gov.za/index.php/immigration-services/types-of-visas"),
        ],
        last_verified_at="2026-01-25",
        notes="South Africa requires a police clearance certificate — allow 3–4 weeks to obtain this.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "SCHENGEN"): VisaGuide(
        destination_code="SCHENGEN",
        destination_name="Schengen Area (Europe)",
        requirement_type="embassy-visa",
        allowed_stay_days=90,
        processing_time_days=15,
        fee_usd=87,
        documents_required=[
            "Valid Nigerian passport (3+ months beyond planned departure from Schengen)",
            "Completed Schengen visa application form",
            "2 recent passport photographs (35mm x 45mm)",
            "Round-trip flight reservation",
            "Travel insurance (minimum €30,000 cover, valid across Schengen zone)",
            "3–6 months bank statements",
            "Employer letter confirming salary and approved leave",
            "Confirmed hotel bookings for entire stay",
            "Visa fee payment receipt",
        ],
        step_by_step_guide="""
## Schengen Visa — Step-by-step

The Schengen visa covers 27 European countries. Apply to the embassy of the country where you'll spend the most time (or your first point of entry if time is equal).

1. **Identify the correct embassy** — apply to France (Paris, Nice), Germany, Italy, Spain, etc. based on your itinerary.
2. **Book an appointment** at that embassy or its VFS/TLS Contact centre in Lagos or Abuja.
3. **Complete the application form** — available on the embassy website.
4. **Purchase travel insurance** covering the full Schengen zone for the duration of your trip.
5. **Compile all documents** — pay particular attention to bank statements and employment proof.
6. **Attend your appointment** and pay the €80 (~$87) fee.
7. **Wait for a decision** — 15 calendar days is standard; processing can be 30–60 days in peak season.
8. **Collect your passport** from the embassy or VFS centre.

> Schengen countries: Austria, Belgium, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Slovakia, Slovenia, Spain, Sweden, Switzerland.
""".strip(),
        official_links=[
            OfficialLink(label="EU Schengen Visa Information", url="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en"),
            OfficialLink(label="VFS Global Schengen — Nigeria", url="https://www.vfsglobal.com/en/individuals/find-a-visa-application-centre.html"),
        ],
        last_verified_at="2026-02-05",
        notes="Apply to the embassy of the country where you'll spend the most nights, or your first entry country if equal.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "KE"): VisaGuide(
        destination_code="KE",
        destination_name="Kenya",
        requirement_type="evisa",
        allowed_stay_days=90,
        processing_time_days=3,
        fee_usd=52,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Digital passport photograph (JPEG, white background)",
            "Return or onward flight ticket",
            "Hotel booking or invitation letter",
            "Yellow fever vaccination certificate",
            "Proof of sufficient funds",
        ],
        step_by_step_guide="""
## Kenya eVisa — Step-by-step

1. **Apply online** at the Kenya eCitizen portal (ecitizen.go.ke).
2. **Create an account** and select "Department of Immigration → Visit Visa."
3. **Complete the form** and upload your passport photo and supporting documents.
4. **Pay the fee** ($52 USD) online by card or mobile money.
5. **Receive your eVisa** by email within 1–3 business days.
6. **Print your eVisa** and present it alongside your passport at immigration.

> The East Africa Tourist Visa ($100) also covers Uganda and Rwanda in a single application.
""".strip(),
        official_links=[
            OfficialLink(label="Kenya eCitizen — eVisa Portal", url="https://ecitizen.go.ke"),
            OfficialLink(label="Kenya Immigration Service", url="https://www.immigration.go.ke"),
        ],
        last_verified_at="2026-01-30",
        notes="The East Africa Tourist Visa covers Kenya, Uganda, and Rwanda for $100 — better value for multi-country trips.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "NA"): VisaGuide(
        destination_code="NA",
        destination_name="Namibia",
        requirement_type="embassy-visa",
        allowed_stay_days=90,
        processing_time_days=10,
        fee_usd=0,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Completed visa application form",
            "2 passport photographs",
            "Return or onward flight ticket",
            "Proof of accommodation",
            "Bank statements (last 3 months)",
            "Employer letter or proof of self-employment",
            "Yellow fever vaccination certificate",
        ],
        step_by_step_guide="""
## Namibia Visitor Visa — Step-by-step

1. **Contact the Namibian High Commission** in Abuja to confirm current requirements and book an appointment.
2. **Complete the visa application form** (available from the High Commission).
3. **Submit your documents** in person at the mission.
4. **No visa fee** is charged for Namibia visitor visas.
5. **Wait for processing** — typically 7–10 business days.
6. **Collect your passport** with the visa stamp.
""".strip(),
        official_links=[
            OfficialLink(label="Namibia High Commission — Abuja", url="https://www.namibiahc-abuja.com"),
            OfficialLink(label="Namibia Ministry of Home Affairs & Immigration", url="https://mhai.gov.na"),
        ],
        last_verified_at="2026-01-12",
        notes="Confirm with the High Commission directly — embassy contact details and requirements can change.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "CI"): VisaGuide(
        destination_code="CI",
        destination_name="Ivory Coast (Côte d'Ivoire)",
        requirement_type="visa-free",
        allowed_stay_days=90,
        processing_time_days=None,
        fee_usd=None,
        documents_required=[
            "Valid Nigerian passport or ECOWAS travel document",
            "Return or onward flight ticket",
            "Proof of accommodation",
            "Sufficient funds for your stay",
            "Yellow fever vaccination certificate",
        ],
        step_by_step_guide="""
## Ivory Coast — Visa-Free Entry (ECOWAS)

1. **Arrive at any port of entry** (Félix-Houphouët-Boigny International Airport, Abidjan, or land borders).
2. **Present your Nigerian passport** to the immigration officer.
3. **Receive your entry stamp** — valid for up to 90 days.

> ECOWAS free movement applies. No visa required for Nigerian citizens.
""".strip(),
        official_links=[
            OfficialLink(label="Côte d'Ivoire Tourism", url="https://www.cotedivoire-tourisme.com"),
            OfficialLink(label="ECOWAS Free Movement Protocol", url="https://www.ecowas.int"),
        ],
        last_verified_at="2026-01-10",
    ),

    # -----------------------------------------------------------------------
    ("NG", "EG"): VisaGuide(
        destination_code="EG",
        destination_name="Egypt",
        requirement_type="evisa",
        allowed_stay_days=30,
        processing_time_days=5,
        fee_usd=25,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Digital passport photograph",
            "Return or onward flight ticket",
            "Hotel booking or invitation letter",
            "Debit or credit card for online payment",
        ],
        step_by_step_guide="""
## Egypt eVisa — Step-by-step

1. **Apply online** at the official Egypt eVisa portal (visa2egypt.gov.eg).
2. **Create an account** and complete the application form.
3. **Upload a digital passport photograph** meeting the stated specifications.
4. **Pay the fee** ($25 USD for a single-entry 30-day visa) by card.
5. **Receive your eVisa** by email within 3–5 business days.
6. **Print your eVisa** and present it at immigration on arrival.

> Multiple-entry visas (90 days/12 months) are available at a higher fee.
""".strip(),
        official_links=[
            OfficialLink(label="Egypt Official eVisa Portal", url="https://visa2egypt.gov.eg"),
            OfficialLink(label="Egypt Ministry of Foreign Affairs", url="https://www.mfa.gov.eg"),
        ],
        last_verified_at="2026-02-08",
    ),

    # -----------------------------------------------------------------------
    ("NG", "SN"): VisaGuide(
        destination_code="SN",
        destination_name="Senegal",
        requirement_type="visa-free",
        allowed_stay_days=90,
        processing_time_days=None,
        fee_usd=None,
        documents_required=[
            "Valid Nigerian passport or ECOWAS travel document",
            "Return or onward ticket (recommended)",
            "Proof of accommodation",
            "Sufficient funds for your stay",
            "Yellow fever vaccination certificate",
        ],
        step_by_step_guide="""
## Senegal — Visa-Free Entry (ECOWAS)

1. **Arrive at Blaise Diagne International Airport (DSS)** or any land border.
2. **Present your Nigerian passport** to the immigration officer.
3. **Receive your entry stamp** — valid for up to 90 days.

> No visa required. ECOWAS free movement applies.
""".strip(),
        official_links=[
            OfficialLink(label="Senegal Tourism", url="https://www.tourisme.gouv.sn"),
            OfficialLink(label="ECOWAS Free Movement Protocol", url="https://www.ecowas.int"),
        ],
        last_verified_at="2026-01-10",
    ),

    # -----------------------------------------------------------------------
    ("NG", "MU"): VisaGuide(
        destination_code="MU",
        destination_name="Mauritius",
        requirement_type="visa-on-arrival",
        allowed_stay_days=60,
        processing_time_days=None,
        fee_usd=None,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Return or onward flight ticket",
            "Proof of accommodation (hotel booking or invitation letter)",
            "Proof of sufficient funds (min ~$100/day recommended)",
            "Yellow fever vaccination certificate",
        ],
        step_by_step_guide="""
## Mauritius Visa on Arrival — Step-by-step

1. **Board your flight** to Sir Seewoosagur Ramgoolam International Airport (MRU).
2. **Complete the arrival card** distributed on the aircraft.
3. **Proceed to immigration** and present your passport, return ticket, and hotel booking.
4. **Receive your entry stamp** — free of charge, valid for 60 days.

> Mauritius is one of the most accessible visa-free/on-arrival destinations for Nigerian passport holders.
""".strip(),
        official_links=[
            OfficialLink(label="Mauritius Immigration — Entry Requirements", url="https://passport.govmu.org/passport/?page_id=827"),
            OfficialLink(label="Mauritius Tourism Promotion Authority", url="https://www.tourism-mauritius.mu"),
        ],
        last_verified_at="2026-02-12",
    ),

    # -----------------------------------------------------------------------
    ("NG", "UG"): VisaGuide(
        destination_code="UG",
        destination_name="Uganda",
        requirement_type="evisa",
        allowed_stay_days=90,
        processing_time_days=3,
        fee_usd=50,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Digital passport photograph",
            "Return or onward flight ticket",
            "Hotel booking or invitation letter",
            "Yellow fever vaccination certificate",
            "Proof of sufficient funds",
        ],
        step_by_step_guide="""
## Uganda eVisa — Step-by-step

1. **Apply online** at visas.immigration.go.ug.
2. **Create an account** and complete the tourist visa application.
3. **Upload documents** — passport photo, return ticket, and hotel booking.
4. **Pay the fee** ($50 USD single entry) by card.
5. **Receive your eVisa** by email within 1–3 business days.
6. **Print your eVisa** and present it at Entebbe Airport immigration.

> The East Africa Tourist Visa ($100) also covers Kenya and Rwanda — great value for multi-country trips.
""".strip(),
        official_links=[
            OfficialLink(label="Uganda eVisa Portal", url="https://visas.immigration.go.ug"),
            OfficialLink(label="Uganda Immigration — Directorate of Citizenship", url="https://immigration.go.ug"),
        ],
        last_verified_at="2026-01-28",
    ),

    # -----------------------------------------------------------------------
    ("NG", "TH"): VisaGuide(
        destination_code="TH",
        destination_name="Thailand",
        requirement_type="embassy-visa",
        allowed_stay_days=60,
        processing_time_days=5,
        fee_usd=40,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Completed TM.86 visa application form",
            "2 recent passport photographs (4cm x 6cm)",
            "Return or onward flight itinerary",
            "Hotel booking confirmation",
            "Bank statements (last 3–6 months, min ~20,000 THB / ~$550 equivalent)",
            "Employer letter confirming employment and approved leave",
            "Travel insurance (recommended)",
        ],
        step_by_step_guide="""
## Thailand Tourist Visa (TR) — Step-by-step

1. **Visit the Royal Thai Embassy** in Abuja (or Consulate if applicable).
2. **Complete the TM.86 application form** — available at the embassy or downloaded online.
3. **Prepare documents** — ensure bank statements are stamped and signed by your bank.
4. **Submit in person** and pay the fee (~$40 USD or local equivalent).
5. **Wait for processing** — typically 3–5 business days.
6. **Collect your passport** with the visa sticker.

> Thailand Tourist Visa (TR) grants 60 days; you can extend for an additional 30 days at an Immigration office inside Thailand.
""".strip(),
        official_links=[
            OfficialLink(label="Royal Thai Embassy — Abuja", url="https://abuja.thaiembassy.org"),
            OfficialLink(label="Thailand e-Visa (select countries)", url="https://www.thaievisa.go.th"),
        ],
        last_verified_at="2026-01-22",
        notes="Nigeria is not currently on the Thailand visa-exemption list. Apply via the embassy in Abuja.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "VN"): VisaGuide(
        destination_code="VN",
        destination_name="Vietnam",
        requirement_type="evisa",
        allowed_stay_days=90,
        processing_time_days=3,
        fee_usd=25,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Digital passport photograph (4cm x 6cm, white background, JPEG)",
            "Scanned photo of passport bio-data page",
            "Debit or credit card for online payment",
            "Entry/exit dates and purpose of visit",
        ],
        step_by_step_guide="""
## Vietnam eVisa — Step-by-step

1. **Apply online** at the official Vietnam eVisa portal (evisa.xuatnhapcanh.gov.vn).
2. **Complete the form** with your personal details, passport information, and travel dates.
3. **Upload your photograph** and scanned passport page.
4. **Pay the fee** ($25 USD) online by card.
5. **Receive your eVisa** by email within 3 business days.
6. **Print your eVisa** (or show on phone) at immigration alongside your passport.

> The Vietnam eVisa is valid for multiple entries within 90 days — excellent value.
""".strip(),
        official_links=[
            OfficialLink(label="Vietnam Official eVisa Portal", url="https://evisa.xuatnhapcanh.gov.vn"),
            OfficialLink(label="Vietnam National Administration of Tourism", url="https://vietnam.travel"),
        ],
        last_verified_at="2026-02-15",
    ),

    # -----------------------------------------------------------------------
    ("NG", "SC"): VisaGuide(
        destination_code="SC",
        destination_name="Seychelles",
        requirement_type="visa-free",
        allowed_stay_days=30,
        processing_time_days=None,
        fee_usd=None,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Return or onward flight ticket",
            "Proof of accommodation (hotel booking)",
            "Proof of sufficient funds (~$150/day recommended)",
            "Travel insurance",
        ],
        step_by_step_guide="""
## Seychelles — Visa-Free Entry

Seychelles grants visa-free access to all nationalities.

1. **Arrive at Seychelles International Airport (SEZ)** on Mahé.
2. **Complete the online travel authorisation** at seychelles.govtas.com before departure (free).
3. **Present your passport**, return ticket, hotel booking, and proof of funds at immigration.
4. **Receive your entry stamp** — typically 30 days, extendable.

> The online pre-registration is not a visa — it's a passenger authorisation system. Complete it before flying.
""".strip(),
        official_links=[
            OfficialLink(label="Seychelles Travel Authorisation", url="https://seychelles.govtas.com"),
            OfficialLink(label="Seychelles Tourism Board", url="https://www.seychelles.travel"),
        ],
        last_verified_at="2026-02-18",
    ),

    # -----------------------------------------------------------------------
    ("NG", "PH"): VisaGuide(
        destination_code="PH",
        destination_name="Philippines",
        requirement_type="visa-free",
        allowed_stay_days=30,
        processing_time_days=None,
        fee_usd=None,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Return or onward flight ticket",
            "Proof of accommodation",
            "Proof of sufficient funds",
            "Travel insurance (recommended)",
        ],
        step_by_step_guide="""
## Philippines — Visa-Free Entry

1. **Arrive at Ninoy Aquino International Airport (MNL)** or any international gateway.
2. **Present your passport** and return/onward ticket at immigration.
3. **Receive your entry stamp** — visa-free for 30 days.

> Extensions of up to 29 days are possible at the Bureau of Immigration office in Manila. Total maximum stay is typically 59 days on initial entry extensions.
""".strip(),
        official_links=[
            OfficialLink(label="Philippines Bureau of Immigration", url="https://immigration.gov.ph"),
            OfficialLink(label="Philippines Department of Tourism", url="https://www.tourism.gov.ph"),
        ],
        last_verified_at="2026-01-14",
        notes="Confirm current policy with the Philippine Embassy — visa rules can change without notice.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "QA"): VisaGuide(
        destination_code="QA",
        destination_name="Qatar",
        requirement_type="visa-on-arrival",
        allowed_stay_days=30,
        processing_time_days=None,
        fee_usd=0,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Return or onward flight ticket",
            "Hotel booking or sufficient funds",
            "Travel insurance",
        ],
        step_by_step_guide="""
## Qatar Visa on Arrival — Step-by-step

1. **Arrive at Hamad International Airport (DOH), Doha.**
2. **Proceed to the visa on arrival counter** before immigration.
3. **Present your passport** and return ticket.
4. **Receive your visa stamp** — free of charge, valid for 30 days.

> Qatar also offers a free transit visa for layovers between 5–96 hours.
""".strip(),
        official_links=[
            OfficialLink(label="Qatar Visa On Arrival — Visit Qatar", url="https://visitqatar.com/intl-en/practical-info/visas"),
            OfficialLink(label="Qatar Ministry of Interior — eVisa", url="https://portal.moi.gov.qa"),
        ],
        last_verified_at="2026-02-20",
        notes="Qatar also offers a free Hayya transit visa for long layovers at Hamad International Airport.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "MV"): VisaGuide(
        destination_code="MV",
        destination_name="Maldives",
        requirement_type="visa-on-arrival",
        allowed_stay_days=30,
        processing_time_days=None,
        fee_usd=None,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Return or onward flight ticket",
            "Hotel booking (all-inclusive resort or guesthouse)",
            "Proof of sufficient funds ($100/day or prepaid resort)",
        ],
        step_by_step_guide="""
## Maldives Visa on Arrival — Step-by-step

The Maldives grants free visa on arrival to all nationalities.

1. **Arrive at Velana International Airport (MLE)**, Malé.
2. **Complete the Maldives immigration arrival card** (distributed on the aircraft).
3. **Present your passport**, return ticket, and resort/hotel booking at immigration.
4. **Receive your stamp** — free, valid for 30 days.

> Extensions up to 90 days are possible at the Maldives Immigration office.
""".strip(),
        official_links=[
            OfficialLink(label="Maldives Immigration", url="https://www.immigration.gov.mv"),
            OfficialLink(label="Maldives Tourism", url="https://visitmaldives.com"),
        ],
        last_verified_at="2026-02-22",
    ),

    # -----------------------------------------------------------------------
    ("NG", "JP"): VisaGuide(
        destination_code="JP",
        destination_name="Japan",
        requirement_type="embassy-visa",
        allowed_stay_days=90,
        processing_time_days=5,
        fee_usd=20,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Completed visa application form",
            "Recent passport photograph (45mm x 45mm, white background)",
            "Detailed day-by-day itinerary",
            "Hotel bookings for entire trip",
            "Return flight ticket",
            "Bank statements (last 6 months)",
            "Employer letter confirming employment, salary, and approved leave",
            "Copy of company registration (if self-employed)",
        ],
        step_by_step_guide="""
## Japan Tourist Visa — Step-by-step

1. **Contact the Embassy of Japan** in Abuja to confirm current requirements and any appointment booking system.
2. **Complete the visa application form** — downloadable from the embassy website.
3. **Prepare a detailed itinerary** — Japan's immigration is strict; a clear day-by-day plan is essential.
4. **Submit all documents** at the embassy (Japan does not use VFS for Nigeria at present).
5. **Pay the fee** (~¥3,000 / $20 USD equivalent).
6. **Collect your passport** — typically within 5 business days.

> Japan values clear travel purpose and strong financial evidence. A well-organised application with a detailed itinerary significantly improves approval rates.
""".strip(),
        official_links=[
            OfficialLink(label="Embassy of Japan in Nigeria", url="https://www.ng.emb-japan.go.jp"),
            OfficialLink(label="Japan Tourism Agency", url="https://www.japan.travel"),
        ],
        last_verified_at="2026-01-08",
        notes="Japan requires a very detailed itinerary. Approval rates improve significantly with a strong financial profile and clear travel purpose.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "SG"): VisaGuide(
        destination_code="SG",
        destination_name="Singapore",
        requirement_type="embassy-visa",
        allowed_stay_days=30,
        processing_time_days=3,
        fee_usd=26,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Completed e-AVES visa application (via ICA website)",
            "Recent passport photograph",
            "Return or onward flight ticket",
            "Hotel booking confirmation",
            "Bank statements (last 3 months)",
            "Employer letter confirming employment and salary",
            "Travel insurance",
        ],
        step_by_step_guide="""
## Singapore Tourist Visa — Step-by-step

1. **Apply online** via the Singapore ICA e-Service portal (eservices.ica.gov.sg). You must have a local sponsor/contact, a registered Singapore travel agent, or apply directly if eligible.
2. **Complete the application form** and upload all required documents.
3. **Pay the fee** (SGD $30 / ~$22–26 USD) online.
4. **Receive the outcome** by email within 3–5 business days.
5. **If approved**, print the approval letter (AVEL) and present it at immigration alongside your passport.

> Singapore accepts applications submitted by registered local travel agents — this is a common and reliable route.
""".strip(),
        official_links=[
            OfficialLink(label="Singapore ICA — Visitor Visa", url="https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa-requirements"),
            OfficialLink(label="Singapore Tourism Board", url="https://www.visitsingapore.com"),
        ],
        last_verified_at="2026-01-30",
        notes="Many applicants find it easiest to apply through a Singapore-registered travel agent.",
    ),

    # -----------------------------------------------------------------------
    ("NG", "US"): VisaGuide(
        destination_code="US",
        destination_name="United States",
        requirement_type="embassy-visa",
        allowed_stay_days=180,
        processing_time_days=90,
        fee_usd=185,
        documents_required=[
            "Valid Nigerian passport (6+ months validity)",
            "Completed DS-160 online application form",
            "MRV fee payment receipt ($185)",
            "Appointment confirmation for consular interview",
            "Photograph meeting US visa photo requirements",
            "Bank statements (last 6–12 months)",
            "Proof of employment and salary (employer letter, payslips)",
            "Property documents or other proof of ties to Nigeria",
            "Travel itinerary and hotel bookings",
            "Previous US visa (if any)",
        ],
        step_by_step_guide="""
## US B-1/B-2 Tourist Visa — Step-by-step

1. **Complete DS-160** at ceac.state.gov — save your application ID as you go.
2. **Pay the MRV fee** ($185) at a designated bank (GT Bank or Access Bank in Nigeria) or online.
3. **Schedule your interview** at ustraveldocs.com/ng — select Lagos or Abuja consulate.
   > Note: Wait times are currently very long (months). Book as early as possible.
4. **Prepare documents** — emphasise ties to Nigeria (job, property, family).
5. **Attend your interview** at the US Consulate. Be concise and honest.
6. **If approved**, your passport will be returned within 5–7 business days with the visa stamped.

> The US interview process is highly dependent on demonstrating strong ties to Nigeria and intent to return. Financial strength alone is not sufficient.
""".strip(),
        official_links=[
            OfficialLink(label="US Embassy Nigeria — Nonimmigrant Visas", url="https://ng.usembassy.gov/visas/nonimmigrant-visas"),
            OfficialLink(label="DS-160 Application Form", url="https://ceac.state.gov/genniv"),
            OfficialLink(label="Schedule Visa Interview", url="https://www.ustraveldocs.com/ng"),
        ],
        last_verified_at="2026-02-28",
        notes="Interview wait times at Lagos and Abuja consulates fluctuate significantly — check current wait times at travel.state.gov and book as early as possible.",
    ),
}


# ---------------------------------------------------------------------------
# Name → code aliases for fuzzy lookup
# ---------------------------------------------------------------------------

_ALIASES: dict[str, str] = {
    # UK
    "uk": "GB", "united kingdom": "GB", "great britain": "GB", "britain": "GB",
    # UAE
    "uae": "AE", "dubai": "AE", "united arab emirates": "AE", "abu dhabi": "AE",
    # Rwanda
    "rwanda": "RW", "kigali": "RW",
    # Ghana
    "ghana": "GH", "accra": "GH",
    # Morocco
    "morocco": "MA", "marrakech": "MA", "casablanca": "MA",
    # Canada
    "canada": "CA", "toronto": "CA", "vancouver": "CA",
    # South Africa
    "south africa": "ZA", "cape town": "ZA", "johannesburg": "ZA", "sa": "ZA",
    # Schengen
    "schengen": "SCHENGEN", "europe": "SCHENGEN", "eu": "SCHENGEN",
    "france": "SCHENGEN", "germany": "SCHENGEN", "italy": "SCHENGEN",
    "spain": "SCHENGEN", "netherlands": "SCHENGEN", "portugal": "SCHENGEN",
    "greece": "SCHENGEN", "switzerland": "SCHENGEN",
    # Kenya
    "kenya": "KE", "nairobi": "KE",
    # Namibia
    "namibia": "NA", "windhoek": "NA",
    # Ivory Coast
    "ivory coast": "CI", "cote d'ivoire": "CI", "côte d'ivoire": "CI", "abidjan": "CI",
    # Egypt
    "egypt": "EG", "cairo": "EG",
    # Senegal
    "senegal": "SN", "dakar": "SN",
    # Mauritius
    "mauritius": "MU",
    # Uganda
    "uganda": "UG", "kampala": "UG",
    # Thailand
    "thailand": "TH", "bangkok": "TH",
    # Vietnam
    "vietnam": "VN", "hanoi": "VN", "ho chi minh": "VN",
    # Seychelles
    "seychelles": "SC",
    # Philippines
    "philippines": "PH", "manila": "PH",
    # Qatar
    "qatar": "QA", "doha": "QA",
    # Maldives
    "maldives": "MV", "male": "MV", "malé": "MV",
    # Japan
    "japan": "JP", "tokyo": "JP",
    # Singapore
    "singapore": "SG",
    # USA
    "us": "US", "usa": "US", "united states": "US", "america": "US",
}


def _resolve_code(raw: str) -> "str | None":
    """Normalise input to a destination code, or return None if unrecognised."""
    upper = raw.strip().upper()
    lower = raw.strip().lower()
    # Try direct code match first
    if any(k[1] == upper for k in _DATA):
        return upper
    # Try alias
    return _ALIASES.get(lower)


def get_visa_guide(passport_country: str, destination: str) -> VisaGuide | None:
    """
    Return a VisaGuide for the given passport + destination combination.
    Accepts ISO country codes or common names (case-insensitive).
    Returns None if no data is available.
    """
    passport = passport_country.strip().upper()
    dest_code = _resolve_code(destination)
    if dest_code is None:
        return None
    return _DATA.get((passport, dest_code))


def list_supported_destinations(passport_country: str) -> list[str]:
    """Return all destination codes available for a given passport."""
    passport = passport_country.strip().upper()
    return [dest for (p, dest) in _DATA if p == passport]
