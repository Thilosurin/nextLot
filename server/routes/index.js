const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 * AUTH ROUTES: /api/auth
 */
router.post(
  "/api/auth/signup",
  authController.validateSignup,
  catchErrors(authController.signup)
);
router.post("/api/auth/signin", authController.signin);
router.get("/api/auth/signout", authController.signout);

/**
 * USER ROUTES: /api/users
 */
router.param("userId", userController.getUserById);

// router.patch("/api/account/:userId",
//   authController.checkAuth,
//   catchErrors(userController.insertAccountUser)
// )

router
  .route("/api/users/:userId")
  .get(userController.getAuthUser)
  .put(
    authController.checkAuth,
    userController.uploadAvatar,
    catchErrors(userController.resizeAvatar),
    catchErrors(userController.updateUser),
    // catchErrors(userController.insertAccountUser)
  )
  .patch(
    authController.checkAuth,
    catchErrors(userController.insertAccountUser),
    catchErrors(userController.updateStatusUser)
  )
  .delete(authController.checkAuth, catchErrors(userController.deleteUser));

router.get("/api/users", userController.getUsers);
router.get(
  "/api/users/profile/:userId",
  (userController.getUserProfile)
);
router.get(
  "/api/users/feed/:userId",
  authController.checkAuth,
  catchErrors(userController.getUserFeed)
);

// router.get("/:address", "/show");
// router.get("/:address/transection", "/transection");
// router.get("/admin/period", "/admin/period");
// router.get("/admin/:address/reward", "/admin/reward");

module.exports = router;
