import { createSelector } from 'reselect';
import { getSearchText } from './toolbarSelector';
import { byString } from '../utils';

const getAllRows = (state, rows) => (typeof rows === 'object' ? rows : []); // Need to implement async data fetching

const getOptions = (state, rows, columns, options) => options;
const getColumns = (state, rows, columns, options) => columns;

const getRows = createSelector(
  [getAllRows, getColumns, getSearchText, getOptions],
  (rows, columns, searchText, { sorting = true } = {}) => {
    return rows.filter((row) => sorting && search(columns, row, searchText))
      .sort;
  }
);

function search(columns, row, searchText) {
  return columns
    .filter((columnDef) =>
      columnDef.searchable === undefined
        ? !columnDef.hidden
        : columnDef.searchable
    )
    .some((columnDef) => {
      if (columnDef.customFilterAndSearch) {
        return !!columnDef.customFilterAndSearch(searchText, row, columnDef);
      } else if (columnDef.field) {
        const value = getFieldValue(row, columnDef);
        if (value) {
          return value
            .toString()
            .toUpperCase()
            .includes(searchText.toUpperCase());
        }
      }
      return false;
    });
}

function getFieldValue(rowData, columnDef, lookup = true) {
  let value =
    typeof rowData[columnDef.field] !== 'undefined'
      ? rowData[columnDef.field]
      : byString(rowData, columnDef.field);
  if (columnDef.lookup && lookup) {
    value = columnDef.lookup[value];
  }

  return value;
}

export { getRows };
