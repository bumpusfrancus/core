import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useMTContext } from './useMTContext';
import { getRows } from './dataSelector';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    rows: []
  },
  reducers: {}
});

function useRowData() {
  const { data, columns, options } = useMTContext();
  const rows = useSelector((state) => getRows(state, data, columns, options));

  return {
    rows
  };
}

export default dataSlice.reducer;
export { useRowData };
