import User from "../model/usermodel.js"

//  create users

export const create = async (req,res) => {
    try {

        const newUser = new User(req.body);
        const {email}= newUser;

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({
                Message:"User already Exists"
            })

        }
        const SavedData= await newUser.save(); 
        res.status(200).json(SavedData);
        
    } catch (error) {
        res.status(500).json({Message:error.errorMessage})
        
    }
    
}


//get all users 

export const getAllUsers = async (req,res)=>{

    try {
        const userData= await User.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({
                Message:"user data not found."
            })
        }
        res.status(200).json(userData);
        
    } catch (error) {
           res.status(500).json({Message:error.errorMessage})
    }
}

//get user by id 

export const getUserById = async(req,res)=>{

    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist){
             return res.status(404).json({
                Message:"user not found."
            })
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({Message:error.errorMessage})
    }
}

//update user by id 

export const update = async(req,res)=>{

    try {

         const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist){
             return res.status(404).json({
                Message:"user not found."
            })
        }
      const updatedData= await User.findByIdAndUpdate(id,req.body,{
            new:true
        })
      res.status(200).json(updatedData);
        
    } catch (error) {
        res.status(500).json({Message:error.errorMessage})
    }
}

//delete user by id

export const deleteUser = async(req,res)=>{

    try {
         const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist){
             return res.status(404).json({
                Message:"user not found."
            })
        }
     await User.findByIdAndDelete(id)
        res.status(200).json({Message:
            "User Deleted Successfully."
        })
        
    } catch (error) {

         res.status(500).json({Message:error.errorMessage})
        
    }
}




