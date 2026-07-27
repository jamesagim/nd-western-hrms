import mongoose from "mongoose";


const jobSchema = new mongoose.Schema(

{
  title:{
    type:String,
    required:true,
  },


  department:{
    type:String,
    required:true,
  },


  location:{
    type:String,
    default:"Remote",
  },


  employmentType:{
    type:String,
    enum:[
      "Full Time",
      "Part Time",
      "Contract",
      "Internship"
    ],
    default:"Full Time",
  },


  description:{
    type:String,
    required:true,
  },


  requirements:[
    {
      type:String,
    }
  ],


  status:{
    type:String,
    enum:[
      "Open",
      "Closed"
    ],
    default:"Open",
  },


},

{
 timestamps:true
}

);


export default mongoose.model(
"Job",
jobSchema
);