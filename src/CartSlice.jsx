import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    total: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });
            }
            
            // Update total
            state.total = state.items.reduce((total, item) => {
                const price = parseFloat(item.cost.replace('$', ''));
                return total + (price * item.quantity);
            }, 0);
        },
        
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload);
            
            // Update total
            state.total = state.items.reduce((total, item) => {
                const price = parseFloat(item.cost.replace('$', ''));
                return total + (price * item.quantity);
            }, 0);
        },
        
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            
            if (item) {
                item.quantity = quantity;
                
                // Update total
                state.total = state.items.reduce((total, item) => {
                    const price = parseFloat(item.cost.replace('$', ''));
                    return total + (price * item.quantity);
                }, 0);
            }
        }
    }
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
