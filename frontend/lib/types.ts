export interface OfficialLink {
  label: string;
  url: string;
}

export type RequirementType =
  | "visa-free"
  | "evisa"
  | "visa-on-arrival"
  | "embassy-visa";

export interface VisaGuide {
  destination_code: string;
  destination_name: string;
  requirement_type: RequirementType;
  allowed_stay_days: number | null;
  processing_time_days: number | null;
  fee_usd: number | null;
  documents_required: string[];
  step_by_step_guide: string;
  official_links: OfficialLink[];
  last_verified_at: string;
  notes: string | null;
}

export interface VisaCheckResponse {
  status: "success" | "error";
  data: VisaGuide | null;
  message: string | null;
  timestamp: string;
}
