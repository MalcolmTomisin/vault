import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export type Valuable = {
    id: number;
    name: string;
    purchasePrice: number;
    type: string;
	description?: string;
    photo: string;
}

const initialState: Array<Valuable> = [];

export const addValuableSlice = createSlice({
    name: 'valuable',
    initialState,
    reducers: {
        addNewValuable: (state, action: PayloadAction<Valuable>) => {
            state.push(action.payload);
        }
    }
})

export const {addNewValuable} = addValuableSlice.actions;

export default addValuableSlice.reducer;
