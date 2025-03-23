import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob , updateJob } from "../controllers/job.controller.js";
import { singleUpload } from "../middlewares/mutler.js";
const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route('/delete').post(deleteJob);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateJob);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);


export default router;