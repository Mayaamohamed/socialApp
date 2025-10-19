import {Router} from "express"
import {  ProfileService } from "./profile.service.js";
const profileController=Router();
const profileService=new ProfileService(); // access methods of class by object
// update profile
profileController.put('/update-profile/:_id',profileService.updateProfile)

// get profile data
profileController.get('/get-profile/:_id',profileService.getProfile)