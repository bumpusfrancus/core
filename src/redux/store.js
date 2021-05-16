import { configureStore } from '@reduxjs/toolkit';
import toolbarReducer from './toolbarSlice';
import dataReducer from './dataSlice';

const getStore = () =>
  configureStore({
    reducer: {
      toolbar: toolbarReducer,
      data: dataReducer
    }
  });
export default getStore;
/*
type IStore = ReturnType<typeof store.getState>;

export { IStore };
*/
