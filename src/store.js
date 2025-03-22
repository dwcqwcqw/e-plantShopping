import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Configure the Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    // Add middleware and other configuration options if needed
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST'],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

// Export the store
export default store;
