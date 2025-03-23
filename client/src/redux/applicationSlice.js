import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: { applications: [] }, // Ensure applicants is an object with an applications array
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        updateApplicationStatus: (state, action) => {
            const { id, status } = action.payload;
            const applicant = state.applicants?.applications?.find(app => app._id === id);
            if (applicant) {
                applicant.status = status; // Update status in Redux store
            }
        }
    }
});

export const { setAllApplicants, updateApplicationStatus } = applicationSlice.actions; // ✅ Export updateApplicationStatus
export default applicationSlice.reducer;
