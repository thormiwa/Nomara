from pydantic import BaseModel
from typing import List, Literal, Optional


class OfficialLink(BaseModel):
    label: str
    url: str


class VisaGuide(BaseModel):
    destination_code: str
    destination_name: str
    requirement_type: Literal["visa-free", "evisa", "visa-on-arrival", "embassy-visa"]
    allowed_stay_days: Optional[int]
    processing_time_days: Optional[int]  # None = granted on arrival or instant
    fee_usd: Optional[float]             # None = free
    documents_required: List[str]
    step_by_step_guide: str              # Markdown
    official_links: List[OfficialLink]
    last_verified_at: str                # ISO 8601 date
    notes: Optional[str] = None


class VisaCheckResponse(BaseModel):
    status: Literal["success", "error"]
    data: Optional[VisaGuide] = None
    message: Optional[str] = None
    timestamp: str
