import express from 'express';
import { changeUserPassword, deleteUserProfile, getUserDetails, loginUser, logout, registerUser, updateUserProfile, updateUserRole } from '../controllers/userControllers.js';
import { AuthorizeRole, IsAuthenticated } from '../middlewares/IsAuthenticated.js';

const router = express.Router();

router.route('/registerUser').post(registerUser);
router.route('/loginUser').post(loginUser);
router.route('/getUserDetials').get(IsAuthenticated,getUserDetails);
router.route('/updateProfile').patch(IsAuthenticated,updateUserProfile);
router.route('/changePassword').patch(IsAuthenticated,changeUserPassword);
router.route('/deleteUserProfile').delete(IsAuthenticated,deleteUserProfile);
router.route('/logout').get(IsAuthenticated,logout);



router.route('/updateUserRole/:id').patch(IsAuthenticated,AuthorizeRole('admin') ,updateUserRole);

//By Users  
// router.route("/registerUser").post(registerUser)

// router.route("/loginUser").post(loginUser) 

// router.route("/getUserDetails").get(IsAuthenticated,getSingleUserDetails)

// router.route("/updatePassword").put(IsAuthenticated,updatePassword)

// router.route("/forgotPassword").post(forgotPassword)

// router.route("/resetPassword/:token").post(resetPassword)

// router.route("/updateUserProfile").put(IsAuthenticated,updateUserProfile)

// router.route("/deleteUserProfile").delete(IsAuthenticated,deleteUserProfile)

// router.route("/logout").get(IsAuthenticated,logout)


// //By Admin
// router.route("/admin/getSingleUser/:id").get(IsAuthenticated,AuthorizeRole('admin'),getSingleUserById)

// router.route("/admin/updateUserRole/:id").put(IsAuthenticated,AuthorizeRole('admin'),updateUserRole)

// router.route("/admin/getAllUsers").get(IsAuthenticated,AuthorizeRole('admin'),getAllUsers)

// router.route("/admin/deleteSingleUser/:id").delete(IsAuthenticated,AuthorizeRole('admin'),deleteSingleUser)

export default router;




























































































