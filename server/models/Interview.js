import mongoose from "mongoose";


const interviewSchema = new mongoose.Schema(

{
  candidate:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Candidate",
    required:true,
  },


  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job",
    required:true,
  },


  interviewer:{
    type:String,
    required:true,
  },


  interviewDate:{
    type:Date,
    required:true,
  },


  interviewTime:{
    type:String,
    required:true,
  },


  mode:{
    type:String,
    enum:[
      "Online",
      "Physical"
    ],
    default:"Online",
  },


  status:{
    type:String,
    enum:[
      "Scheduled",
      "Completed",
      "Cancelled"
    ],
    default:"Scheduled",
  },


  notes:{
    type:String,
    default:"",
  },


},

{
 timestamps:true
}

);


export default mongoose.model(
"Interview",
interviewSchema
);