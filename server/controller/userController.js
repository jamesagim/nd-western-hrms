import User from "../models/User.js";
import bcrypt from "bcryptjs";


// =====================================
// GET ALL USERS
// =====================================

export const getUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });


    res.json(users);


  } catch(error) {

    res.status(500).json({
      message:error.message,
    });

  }

};




// =====================================
// GET SINGLE USER
// =====================================

export const getSingleUser = async(req,res)=>{

  try{

    const user =
    await User.findById(
      req.params.id
    )
    .select("-password");


    if(!user){

      return res.status(404).json({
        message:"User not found",
      });

    }


    res.json(user);


  }catch(error){

    res.status(500).json({
      message:error.message,
    });

  }

};




// =====================================
// CREATE USER
// =====================================

export const createUser = async(req,res)=>{

  try{


    const {
      name,
      email,
      password,
      role,
    } = req.body;



    const existingUser =
    await User.findOne({
      email,
    });


    if(existingUser){

      return res.status(400).json({
        message:"Email already exists",
      });

    }



    const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );



    const user =
    await User.create({

      name,

      email,

      password:hashedPassword,

      role,

    });



    res.status(201).json({

      message:"User created successfully",

      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
      }

    });



  }catch(error){

    res.status(400).json({
      message:error.message,
    });

  }

};





// =====================================
// UPDATE USER
// =====================================

export const updateUser = async(req,res)=>{

try{


const user =
await User.findById(
req.params.id
);



if(!user){

return res.status(404).json({
message:"User not found",
});

}




user.name =
req.body.name || user.name;


user.email =
req.body.email || user.email;


user.role =
req.body.role || user.role;



if(req.body.password){

user.password =
await bcrypt.hash(
req.body.password,
10
);

}



await user.save();



res.json({

message:"User updated successfully",

user:{
_id:user._id,
name:user.name,
email:user.email,
role:user.role,
}

});



}catch(error){

res.status(400).json({
message:error.message,
});

}


};






// =====================================
// DELETE USER
// =====================================

export const deleteUser = async(req,res)=>{

try{


const user =
await User.findByIdAndDelete(
req.params.id
);



if(!user){

return res.status(404).json({
message:"User not found",
});

}



res.json({

message:"User deleted successfully",

});



}catch(error){

res.status(500).json({
message:error.message,
});

}


};