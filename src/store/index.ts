import {configureStore} from '@reduxjs/toolkit';
import {valuablesReducer} from './features';

export const store = configureStore({
    reducer: {
        valuables: valuablesReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;