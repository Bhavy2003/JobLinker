// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         loading: false,
//         user: null,
//         savedJobs: []  // <-- Initialize as an empty array
//     },
//     reducers: {
//         // actions
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setUser: (state, action) => {
//             state.user = action.payload;
//             state.savedJobs = action.payload?.profile?.savedJobs || []; // <-- Ensure savedJobs is set
//         },
//         setsavedJobs: (state, action) => {
//             state.savedJobs = action.payload;
//         }
//     }
// });

// export const { setLoading, setUser, setsavedJobs } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        savedJobs: [] // Initialized as an empty array
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload ?? false;
        },
        setUser: (state, action) => {
            state.user = action.payload ?? null;
            // Do not overwrite savedJobs here; let setsavedJobs handle it
            state.savedJobs = action.payload?.profile?.savedJobs ?? [];
        },

        setsavedJobs: (state, action) => {
            state.savedJobs = action.payload ?? [];
        }
    }
});

export const { setLoading, setUser, setsavedJobs } = authSlice.actions;
export default authSlice.reducer;