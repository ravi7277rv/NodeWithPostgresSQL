import client from "../db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { tokenBlacklist } from "../middlewares/IsAuthenticated.js";

dotenv.config();




//Register user Controller
export const registerUser = async (req, res) => {

    try {

        const { name, username, email, password, phone } = req.body;

        if (!name || !username || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: 'One or more fields are empty'
            });
        }

        let query;
        query = `SELECT * FROM users WHERE email = '${email}'`;
        const result = await client.query(query);

        if (result.rowCount === 1) {
            return res.status(400).json({
                success: false,
                message: 'User already exist'
            })
        }

        function generateId() {
            let arr = [];
            for (let i = 1; i <= 15; i++) {
                let ranNum = Math.floor(Math.random() * 9 + 1);
                arr.push(ranNum);
            }
            let firstdigit = Math.floor(Math.random() * 9 + 1)
            arr.unshift(firstdigit);
            let genId = arr.join('');
            return genId;
        }
        let strId = generateId();
        let id = "UID" + strId;

        let query1;
        query1 = `INSERT INTO users VALUES ('${id}','${name}','${username}','${email}','${password}','${phone}')`

        const result1 = await client.query(query1);

        if (result1.rowCount !== 1) {
            return res.status(400).json({
                success: false,
                message: 'User creation failed'
            });
        }


        return res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            data: result1.rowCount
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Login user Controller
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password is required'
            });
        }

        let query;
        query = `SELECT * FROM users WHERE email = '${email}'`;

        const result = await client.query(query);

        if (result.rowCount !== 1) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist with this Email-Id'
            });
        }
        let userEmail = result.rows[0].email;
        let userPassword = result.rows[0].password;
        console.log(`before the checking ${userEmail} ${userPassword}`)


        if (email !== userEmail) {
            console.log(`inside the if condition`)
            return res.status(400).json({
                success: true,
                message: 'Invalid Credentials',
                data: result.rows
            })
        }

        if (password !== userPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        let token = jwt.sign({ user: result }, process.env.SECRET_KEY, { expiresIn: '7h' })


        return res.status(200).json({
            success: true,
            message: 'User loggedIn successfully',
            data: result.rows,
            token
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//Get Single User Details
export const getUserDetails = async (req, res) => {

    try {

        const id = req.user.id;

        let query;
        query = `SELECT * FROM users WHERE id = '${id}'`;

        const result = await client.query(query);

        return res.status(200).json({
            success: true,
            message: 'User details fetched',
            data: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Updating the user Profile
export const updateUserProfile = async (req, res) => {

    try {

        const id = req.user.id;

        const { name, username, email, phone } = req.body;
        if (!name || !username || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'One or more filed is required for the updation'
            });
        }


        let query = `UPDATE users SET name = '${name}', username = '${username}', email = '${email}', phone = '${phone}' WHERE id = '${id}'`;

        const result = await client.query(query);


        return res.status(201).json({
            success: true,
            message: 'User profile has been updated',
            data: result
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Change User profile password
export const changeUserPassword = async (req, res) => {

    try {

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Both Password are required'
            });
        }

        const id = req.user.id;

        let query = `SELECT password FROM users WHERE id = '${id}'`;
        const result = await client.query(query);

        let pass = result.rows[0].password;

        if (oldPassword !== pass) {
            return res.status(400).json({
                success: false,
                message: `Old password doesn't matched`
            });
        }

        let query1 = `UPDATE users SET password = '${newPassword}' WHERE id = '${id}'`;

        const result1 = await client.query(query1);

        if (result1.rowCount === 1) {
            return res.status(201).json({
                success: true,
                message: 'Password has been Updated Successfully',
                data: result1.rowCount
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//Delete User Profile
export const deleteUserProfile = async (req, res) => {

    try {

        const id = req.user.id;

        let query =`DELETE FROM users WHERE id = '${id}'`;

        const result = await client.query(query);

        if(result.rowCount === 1){
            return res.status(200).json({
                success:true,
                message:'User profile has been deleted'
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


//Updating the user role
export const updateUserRole = async ( req, res ) => {

    try {

        const { id } = req.params;
        const { role } = req.body;
        if(!id){
            return res.status(400).json({
                success:false,
                message:'Id is required for updating the role'
            });
        }

        if(!role){
            return res.status(400).json({
                success:false,
                message:'Role is required for updation'
            });
        }

        let query = `UPDATE users SET role = '${role}' WHERE id ='${id}'`;
        const result = await client.query(query);

        if(result.rowCount !== 1){
            return res.status(400).json({
                success:true,
                message:'Role has not been updated'
            });
        }

        return res.status(201).json({
            success:true,
            message:'Role has been updated Successfully',
            data:result.rowCount
        });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//User LogOut
export const  logout = async ( req, res ) =>{

    try {

        const token = req.headers.authorization;

        tokenBlacklist.push(token)

        return res.status(200).json({
            success:true,
            message:'User logged out successfully'
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}





























































































































