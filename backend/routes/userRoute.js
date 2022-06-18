const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const multer = require("multer");

//where and how to save files by storage engine

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("hgdshsj");
    cb(null, "../images");
  },
  filename: (req, file, cb) => {
    cd(null, Date.now() + "--" + file.originalname);
    console.log(file);
  },
});

//run multer middleware function by using its properties
const upload = multer({ storage: fileStorageEngine });

const router = express.Router();
// upload.single('image'),

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/logout").get(logout);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

module.exports = router;
