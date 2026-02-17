export enum EMPLOYEE_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  VACATION = "VACATION",
  TRANSFER = "TRANSFER",
  TERMINATED = "TERMINATED",
  FINAL_EXIT = "FINAL_EXIT",
}

export interface IEmployee {
  name: string;
  employeeId: number;
  SAPNumber: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  workLocation: string;
  nationality: string;
  status: EMPLOYEE_STATUS;
  images?: string[];
  joiningDate: Date;
}
