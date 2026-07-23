import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema(

{
  employee:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Employee",
    required:true,
  },


  date:{
    type:Date,
    default:Date.now,
  },


  checkIn:{
    type:Date,
    default:null,
  },


  checkOut:{
    type:Date,
    default:null,
  },


  status:{
    type:String,
    enum:[
      "Present",
      "Absent",
      "Late",
      "Half Day"
    ],
    default:"Present",
  },


  hoursWorked:{
    type:Number,
    default:0,
  },


},

{
 timestamps:true
}

);


export default mongoose.model(
"Attendance",
attendanceSchema
);