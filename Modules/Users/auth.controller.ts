import { Router
 } from "express";
 
 import AuthService from "./auth.service.js"
 const authController=Router()
authController.post('/signUp',AuthService.signUp)
authController.post('/signIn',AuthService.SignIn)
authController.post('/confirmEmail',AuthService.confirmMail)

 export {authController}
