import { model, Schema } from "mongoose";
import { EMPLOYEE_STATUS, IEmployee } from "./employee.interface";

const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String },
    employeeId: { type: Number, unique: true, required: true },
    idNumber: { type: Number, unique: true, required: true },
    jobTitle: { type: String },
    workLocation: { type: String },
    nationality: { type: String },
    status: {
      type: String,
      enum: Object.values(EMPLOYEE_STATUS),
      default: EMPLOYEE_STATUS.ACTIVE,
    },
    images: { type: [String], default: [] },
    joiningDate: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Employee = model<IEmployee>(
  "Employee",
  employeeSchema,
  "employees"
);
