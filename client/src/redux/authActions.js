import axios from "axios";
import { setLoading, setUser, setsavedJobs } from "./authSlice";


export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await axios.post("/api/auth/login", userData);

        dispatch(setUser(response.data.user)); // <-- This will now also update savedJobs
        dispatch(setsavedJobs(response.data.savedJobs || [])); // <-- Ensure savedJobs is updated

        dispatch(setLoading(false));
    } catch (error) {
        console.error("Login Error:", error);
        dispatch(setLoading(false));
    }
};

export default loginUser;
