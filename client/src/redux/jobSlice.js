// import { createSlice } from "@reduxjs/toolkit";

// const jobSlice = createSlice({
//     name: "job",
//     initialState: {
//         allJobs: [],
//         allAdminJobs: [],
//         singleJob: null,
//         searchJobByText: "",
//         allAppliedJobs: [],
//         searchedQuery: "",
//     },
//     reducers: {
//         // actions
//         setAllJobs: (state, action) => {
//             state.allJobs = action.payload;
//         },
//         setSingleJob: (state, action) => {
//             state.singleJob = action.payload;
//         },
//         setAllAdminJobs: (state, action) => {
//             state.allAdminJobs = action.payload;
//         },
//         setSearchJobByText: (state, action) => {
//             state.searchJobByText = action.payload;
//         },
//         setAllAppliedJobs: (state, action) => {
//             state.allAppliedJobs = action.payload;
//         },
//         setSearchedQuery: (state, action) => {
//             state.searchedQuery = action.payload;
//         }
//     }
// });
// export const {
//     setAllJobs,
//     setSingleJob,
//     setAllAdminJobs,
//     setSearchJobByText,
//     setAllAppliedJobs,
//     setSearchedQuery
// } = jobSlice.actions;



// export default jobSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: '',
        allAppliedJobs: [],
        searchedQuery: ''
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload ?? []; // Default to empty array if payload is undefined
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload ?? null; // Default to null if payload is undefined
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload ?? []; // Default to empty array if payload is undefined
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload ?? ''; // Default to empty string if payload is undefined
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload ?? []; // Default to empty array if payload is undefined
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload ?? ''; // Default to empty string if payload is undefined
        }
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;

export default jobSlice.reducer;