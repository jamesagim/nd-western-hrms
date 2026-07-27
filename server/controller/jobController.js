import Job from "../models/Job.js";


// GET ALL JOBS

export const getJobs = async(req,res)=>{

try{

const jobs =
await Job.find()
.sort({
createdAt:-1
});


res.json(jobs);


}catch(error){

res.status(500).json({
message:error.message
});

}

};




// GET SINGLE JOB

export const getJob = async(req,res)=>{

try{


const job =
await Job.findById(
req.params.id
);


if(!job){

return res.status(404).json({
message:"Job not found"
});

}


res.json(job);



}catch(error){

res.status(500).json({
message:error.message
});

}

};






// CREATE JOB

export const createJob = async(req,res)=>{

try{


const job =
await Job.create(req.body);


res.status(201).json(job);



}catch(error){

res.status(400).json({
message:error.message
});

}

};






// UPDATE JOB

export const updateJob = async(req,res)=>{

try{


const job =
await Job.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true,
runValidators:true
}

);



if(!job){

return res.status(404).json({
message:"Job not found"
});

}


res.json(job);



}catch(error){

res.status(400).json({
message:error.message
});

}

};








// DELETE JOB

export const deleteJob = async(req,res)=>{


try{


const job =
await Job.findByIdAndDelete(
req.params.id
);



if(!job){

return res.status(404).json({
message:"Job not found"
});

}



res.json({
message:"Job deleted"
});



}catch(error){

res.status(500).json({
message:error.message
});

}


};