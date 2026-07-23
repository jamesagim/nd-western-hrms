import mongoose from "mongoose";


const leaveSchema = new mongoose.Schema(

  {

    employee: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Employee",

      required: true,

    },


    leaveType: {

      type: String,

      enum: [
        "Annual",
        "Sick",
        "Casual",
        "Maternity",
        "Paternity",
      ],

      required: true,

    },


    startDate: {

      type: Date,

      required: true,

    },


    endDate: {

      type: Date,

      required: true,

    },


    totalDays: {

      type: Number,

      default: 0,

    },


    reason: {

      type: String,

      required: true,

    },


    status: {

      type: String,

      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],

      default: "Pending",

    },


    rejectionReason: {

      type: String,

      default: "",

    },


    approvedDate: {

      type: Date,

      default: null,

    },


  },


  {

    timestamps: true,

  }

);



export default mongoose.model(
  "Leave",
  leaveSchema
);