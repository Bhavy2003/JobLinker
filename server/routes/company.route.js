import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany, deleteCompany } from "../controllers/company.controller.js";
import { singleUpload,companyLogoUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,companyLogoUpload, updateCompany);
router.delete('/delete/:companyId',isAuthenticated,singleUpload, deleteCompany);


export default router;





