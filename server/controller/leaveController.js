import Leave from "../models/Leave.js";



// GET ALL LEAVES

export const getLeaves = async (
  req,
  res
)=>{

  try{


    const leaves =
      await Leave.find()

      .populate(
        "employee",
        "name email department"
      )

      .sort({
        createdAt:-1
      });



    res.json(leaves);



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};





// GET SINGLE LEAVE


export const getLeave = async(
 req,
 res
)=>{


 try{


 const leave =
 await Leave.findById(
  req.params.id
 )

 .populate(
  "employee",
  "name email department"
 );



 if(!leave){

 return res.status(404).json({

 message:"Leave not found"

 });

 }



 res.json(leave);



 }catch(error){


 res.status(500).json({

 message:error.message

 });


 }


};





// CREATE LEAVE


export const createLeave = async(
 req,
 res
)=>{


try{


const leave =
await Leave.create({

 employee:req.body.employee,

 leaveType:req.body.leaveType,

 startDate:req.body.startDate,

 endDate:req.body.endDate,

 reason:req.body.reason,

});



const populatedLeave =
await Leave.findById(
 leave._id
)

.populate(
 "employee",
 "name email department"
);



res.status(201).json(
 populatedLeave
);



}catch(error){


res.status(400).json({

message:error.message

});


}


};






// UPDATE STATUS


export const updateLeaveStatus =
async(
req,
res
)=>{


try{


const leave =
await Leave.findByIdAndUpdate(

 req.params.id,

 {

 status:req.body.status,

 rejectionReason:
 req.body.rejectionReason || "",

 approvedDate:
 req.body.status === "Approved"
 ?
 new Date()
 :
 null

 },


 {
 new:true
 }


);



if(!leave){


return res.status(404).json({

message:"Leave not found"

});


}



res.json(leave);



}catch(error){


res.status(400).json({

message:error.message

});


}


};







// DELETE LEAVE


export const deleteLeave =
async(
req,
res
)=>{


try{


const leave =
await Leave.findByIdAndDelete(
 req.params.id
);



if(!leave){


return res.status(404).json({

message:"Leave not found"

});


}



res.json({

message:"Leave deleted"

});



}catch(error){


res.status(500).json({

message:error.message

});


}


};