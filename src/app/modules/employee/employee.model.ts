// import { model, Schema } from "mongoose";
// import { EMPLOYEE_STATUS, IEmployee } from "./employee.interface";

// const employeeSchema = new Schema<IEmployee>(
//   {
//     name: { type: String },
//     employeeId: { type: Number, unique: true, required: true },
//     SAPNumber: { type: String, unique: true, required: true },
//     phoneNumber: {},
//     email: {},
//     gender: {
//       type: String,
//       enum: ["male", "female"],
//       required: true,
//     },
//     jobTitle: { type: String },
//     workLocation: { type: String },
//     nationality: { type: String },
//     status: {
//       type: String,
//       enum: Object.values(EMPLOYEE_STATUS),
//       default: EMPLOYEE_STATUS.ACTIVE,
//     },
//     images: { type: [String], default: [] },
//     joiningDate: { type: Date },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );

// export const Employee = model<IEmployee>("Employee", employeeSchema);
import { model, Schema } from "mongoose";
import { EMPLOYEE_STATUS, IEmployee } from "./employee.interface";

const employeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    employeeId: {
      type: Schema.Types.Mixed, // Allows both Number and String safely
      unique: true,
      required: true,
    },
    idNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    }, // Added: Iqama / ID number
    dacoId: {
      type: String,
      default: "",
    }, // Added: DACO ID
    group: {
      type: String,
      required: true,
      trim: true,
    }, // Added: Group / Department
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    }, // Added: Nabatat / Safari tracking
    status: {
      type: String,
      enum: Object.values(EMPLOYEE_STATUS),
      default: EMPLOYEE_STATUS.ACTIVE,
    },
    remark: {
      type: String,
      default: "",
    }, // Added: Progress or transfer flags
    joiningDate: {
      type: Date,
      required: true,
    },

    // Original properties kept optional (removed constraints to avoid insert failures)
    SAPNumber: {
      type: String,
      sparse: true, // Sparse allows multiple null/missing records without unique collisions
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    workLocation: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Employee = model<IEmployee>("Employee", employeeSchema);
