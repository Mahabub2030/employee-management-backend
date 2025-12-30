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
  idNumber: number;
  jobTitle: string;
  workLocation: string;
  nationality: string;
  status: EMPLOYEE_STATUS;
  images?: string[];
  joiningDate: Date;
}
