import Interview from "../models/Interview.js";




// GET ALL INTERVIEWS

export const getInterviews = async(req,res)=>{

try{


const interviews =
await Interview.find()

.populate(
"candidate",
"name email"
)

.populate(
"job",
"title department"
)

.sort({
createdAt:-1
});


res.json(interviews);


}catch(error){

res.status(500).json({
message:error.message
});

}

};







// GET SINGLE INTERVIEW

export const getInterview = async(req,res)=>{

try{


const interview =
await Interview.findById(
req.params.id
)

.populate("candidate")

.populate("job");



if(!interview){

return res.status(404).json({
message:"Interview not found"
});

}


res.json(interview);



}catch(error){

res.status(500).json({
message:error.message
});

}

};







// CREATE INTERVIEW

export const createInterview = async(req,res)=>{

try{


const interview =
await Interview.create(
req.body
);


res.status(201).json(
interview
);



}catch(error){

res.status(400).json({
message:error.message
});

}

};








// UPDATE INTERVIEW

export const updateInterview = async(req,res)=>{

try{


const interview =
await Interview.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true,
runValidators:true
}

);



if(!interview){

return res.status(404).json({
message:"Interview not found"
});

}


res.json(interview);



}catch(error){

res.status(400).json({
message:error.message
});

}

};








// DELETE INTERVIEW

export const deleteInterview = async(req,res)=>{

try{


const interview =
await Interview.findByIdAndDelete(
req.params.id
);



if(!interview){

return res.status(404).json({
message:"Interview not found"
});

}



res.json({
message:"Interview deleted"
});



}catch(error){

res.status(500).json({
message:error.message
});

}

};