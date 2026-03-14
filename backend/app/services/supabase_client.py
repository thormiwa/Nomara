import os
from supabase import create_client, Client

_client: Client | None = None


def get_supabase() -> Client:
    """
    Returns a singleton Supabase client using the service role key.
    The service role key bypasses RLS — use only in backend routes, never expose to frontend.
    """
    global _client
    if _client is None:
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_KEY")
        if not url or not key:
            raise RuntimeError(
                "SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment"
            )
        _client = create_client(url, key)
    return _client
