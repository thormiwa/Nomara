from fastapi import APIRouter, Query, HTTPException
from datetime import datetime, timezone

from app.models.visa import VisaCheckResponse
from app.services.visa_service import get_visa_guide, list_supported_destinations, ADVISORY

router = APIRouter()

SUPPORTED_PASSPORTS = {"NG"}  # expand in Week 3-4 when live API replaces mock


@router.get("/visa-check", response_model=VisaCheckResponse)
def visa_check(
    passport: str = Query(..., description="Passport country code (e.g. NG)"),
    destination: str = Query(..., description="Destination country code or name (e.g. GB or 'United Kingdom')"),
):
    """
    Check visa requirements for a given passport + destination combination.

    - Data is static mock data for Week 1-2. Live API replaces this in Week 3-4.
    - Visa data is never AI-generated.
    - Always returns a last_verified_at timestamp and the standard advisory disclaimer.
    """
    ts = datetime.now(timezone.utc).isoformat()

    passport_upper = passport.strip().upper()
    if passport_upper not in SUPPORTED_PASSPORTS:
        raise HTTPException(
            status_code=400,
            detail={
                "status": "error",
                "message": f"Passport '{passport}' is not supported in this version. Supported: {sorted(SUPPORTED_PASSPORTS)}",
                "timestamp": ts,
            },
        )

    guide = get_visa_guide(passport_upper, destination)

    if guide is None:
        supported = list_supported_destinations(passport_upper)
        raise HTTPException(
            status_code=404,
            detail={
                "status": "error",
                "message": (
                    f"No visa data found for '{destination}' with a {passport_upper} passport. "
                    f"Supported destinations: {sorted(supported)}"
                ),
                "timestamp": ts,
            },
        )

    return VisaCheckResponse(
        status="success",
        data=guide,
        timestamp=ts,
    )
