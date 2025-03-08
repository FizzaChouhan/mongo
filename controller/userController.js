import userSchema from "../Schema/userSchema.js"
import User from "../Models/User.js"
import chalk from "chalk"

//get all user
const getAllUsers = async (req, res) => {
    try {
        const userCollection = await User.find()
        res.status(200).json({
            message:"All user fetch sucessfully",
            users:userCollection
        })
        } catch (error) {
            res.status(500).json({
                message: "Error fetching user",
                error: error.message
                })
                }
                }

  //create a user
  const createUser = async (req, res) => {
    try {
        const user = await userSchema.validateAsync(req.body);
        const newUser = new User(user);
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: savedUser
            });
            } catch (error) {
                if (error?.code===11000){
                    res.status(409).json({
                        message: "User already exists",
                        error: error.message
                        })
                        }
                        res.status(500).json({
                            message:"Internal server error",
                            error:error.message
                        })
                }
                }
   //delete user
   const deleteUser = async (req, res) => {
    try {
        const {id} = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
         return   res.status(404).json({
            message: "User not found",
            error: "User not found"
            })
            }
            console.log(chalk.bgRed(deleteUser))
            res.send({
                message:"User deleted  sucessfully",
                deletedId:{id,deletedUser},
            })


            
        }catch(error){
            res.status(500).json({
                message:"Internal server error"
            })
        }

        }

        //update a user
        const updateUser = async (req, res) => {
            try {
                const { id } = req.params.id;
                const { name, email, password } = req.body;
                const updatedUser = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
                if (!updatedUser) {
                    return res.status(404).json({
                        message: "User not found",
                        error: "User not found"
                        })
                        }
                        res.send({
                            message: "User updated successfully",
                            updatedUser:{id,updatedUser}
                            })
                            }
                            catch (error) {
                                res.status(500).json({
                                    message: "Internal server error"
                                    })
                                    }
                                    }
      //get a specificuser
      const getUser = async (req, res) => {
        try {
            const { id } = req.params.id;
            const userFound = await User.findOne({ _id: id });
            if (!userFound) {
                return res.status(404).json({
                    message: "User not found",
                    error: "User not found"
                    })
                    }
                    res.send({
                        message: "User found successfully",
                        userFound:{id,userFound}
                        })
                        }
                        catch (error) {
                            res.status(500).json({
                                message: "Internal server error"
                                })
                                }
                                }
     export{getAllUsers,createUser,deleteUser,updateUser,getUser}                           









     
    


