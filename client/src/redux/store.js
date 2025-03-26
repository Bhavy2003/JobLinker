// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
// import jobSlice from "./jobSlice";
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import companySlice from "./companySlice";
// import applicationSlice from "./applicationSlice";

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// };


// const appReducer = combineReducers({
//     auth: authSlice,
//     job: jobSlice,
//     company: companySlice,
//     application: applicationSlice,
// });

// const rootReducer = (state, action) => {
//     if (action.type === 'LOGOUT') {
       
//         storage.removeItem('persist:root');
//         state = undefined;
//     }
//     return appReducer(state, action);
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });

// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // Use session storage
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storageSession,  // 🔥 Use sessionStorage instead of localStorage
};

// Root reducer with reset logic
const appReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice,
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        // Clear the persisted state on logout
        sessionStorage.removeItem('persist:root');
        state = undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;

