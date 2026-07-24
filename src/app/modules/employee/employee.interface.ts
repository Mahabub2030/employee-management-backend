export enum EMPLOYEE_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  VACATION = "VACATION",
  TRANSFER = "TRANSFER",
  TERMINATED = "TERMINATED",
  FINAL_EXIT = "FINAL_EXIT",
}

export interface IEmployee {
  // Required fields from your new data structure
  name: string;
  jobTitle: string;
  idNumber: string; // Added: Iqama / ID Number (e.g., "2254394725")
  employeeId: string | number; // Updated: Changed to string | number to handle values like "67621" safely
  dacoId?: string; // Added: Optional field for DACO ID (e.g., "DMM-011-0198")
  group: string; // Added: Division/Group (e.g., "Administrative / Management")
  joiningDate: Date | string; // Updated: Accepts Date or ISO string
  nationality: string;
  companyName: string; // Added: Tracking company (e.g., "Nabatat", "Safari")
  status: EMPLOYEE_STATUS;
  remark?: string; // Added: Optional field for tracking steps like "Transfer Pending" or "Completed"

  // Kept from your original interface (marked as optional if missing from spreadsheet)
  SAPNumber?: string;
  email?: string;
  phoneNumber?: string;
  gender?: "male" | "female";
  workLocation?: string; // Made optional since it's inferred by Group/DACO, or can be filled later
  images?: string[];
}
