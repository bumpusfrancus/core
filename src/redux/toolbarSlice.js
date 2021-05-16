import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchText } from './toolbarSelector';

export const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState: {
    searchText: ''
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearSearchText: (state) => {
      state.searchText = '';
    }
  }
});

function useToolbar() {
  const { setSearchText: setText, clearText } = toolbarSlice.actions;
  const searchText = useSelector(getSearchText);
  const dispatch = useDispatch();
  const setSearchText = (text) => dispatch(setText(text));
  const clearSearchText = () => dispatch(clearText());
  return {
    searchText,
    setSearchText,
    clearSearchText
  };
}
export { useToolbar };

export default toolbarSlice.reducer;
