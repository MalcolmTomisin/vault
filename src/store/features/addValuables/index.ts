import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export type Valuable = {
    id: number;
    name: string;
    purchasePrice: number;
    type: string;
	description?: string;
    photo: string;
}

const initialState: Array<Valuable> = [{
    id: 1,
    name: "Cartier ring",
      purchasePrice: 5780,
      type: "JEWELRY",
      description: "Gift from my grandfather",
      "photo": "https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg",
},
{
    id: 2,
    name: "Guitar",
    purchasePrice: 850,
    type: "MUSIC_INSTRUMENT",
    photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
}];

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
