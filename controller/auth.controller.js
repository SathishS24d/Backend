import e from "express";
import userModel from "../model/user.js";
import jwt from "jsonwebtoken"

const auth = {

    //for creating a account
    signup: async (req, res) => {
        const { email, password } = req.body;
        try {
            
            //check user already exist
            const userExist = await userModel.findOne({ email: email });
            if (userExist) {
                //if yes send message
                return res.status(401).json({
                    message: "User already exist"
                })
            }

            //create a model
            const data = userModel({
                email,
                password
            })
            //add in database
            await data.save();


            //send successfully message
            return res.json({
                message: "Registration Successfully"
            });


        } catch (error) {
            //send internal server message
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }

    },


    //for login with account
    login: async (req, res) => {
        const { email, password } = req.body
        try {

            //check all require field are exist
            if (!email) {
                return res.json({
                    message: "Email is required"
                })
            } else if (!password) {
                return res.json({
                    message: "password is required"
                })
            }

            //check user existence
            const checkUserExist = await userModel.findOne({ email });

            //if not exist send 404 message
            if (!checkUserExist) return res.json({ status: 404, message: "You are not found register now if not have any account" });

            //create jwt token 
            const token =  jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' })

            //give the access token and successfully message
            return (checkUserExist.comparePassword(password)) ? res.json({ message: "Login successfully", status: 200, token: token }) : res.json({ status: 203, message: "wrong password" })

        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}




export default auth;