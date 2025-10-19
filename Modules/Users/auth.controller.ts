import { Router
 } from "express";
 
 import AuthService from "./auth.service.js"
import { authentication } from "../../MiddleWares/authentication.middleware.js";
import { validationMiddleware } from "../../MiddleWares/validation.middleware.js";
import { signUpValidator } from "../../Validators/User/auth.validator.js";
 const authController=Router()
authController.post('/signUp',validationMiddleware(signUpValidator),AuthService.signUp)
authController.post('/signIn',AuthService.SignIn)
authController.post('/confirmEmail',AuthService.confirmMail)
authController.post('/logout',authentication,AuthService.logout)
 export {authController}
