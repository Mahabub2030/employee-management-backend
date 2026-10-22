export enum EMPLOYEE_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  VACATION = "VACATION",
  TRANSFER = "TRANSFER",
  TERMINATED = "TERMINATED",
  FINAL_EXIT = "FINAL_EXIT",
}

export interface IEmployee {
  _id: string;
  name: string;
  jobTitle: string;
  idNumber: string;
  employeeId: string | number;
  dacoId?: string;
  group: string;
  joiningDate: Date | string;
  nationality: string;
  companyName: string;
  status: EMPLOYEE_STATUS;
  email?: string;
  phoneNumber?: string;
  gender?: "male" | "female";
  workLocation?: string;
  images?: string[];
  remark: string;
}
