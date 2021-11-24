const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

/**********LOGIN-LOGOUT**********/
router.post("/login",authController.signIn);
router.get("/logout",authController.logout);

//*********CRUD-API********/
//enregistrer en bdd un user{POST}
router.post("/register",authController.signUp);

// afficher tout les user{GET}
router.get('/', userController.getAllusers);

// afficher un user{GET}
router.get("/:id", userController.userInfo);

//modifier un user{PUT}
router.put('/:id',userController.updateUser);

//supp un user {DELETE}
router.delete('/:id',userController.deleteUser);



//***********MAJ-DATA{PATCH}***********/

router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);






module.exports= router ;