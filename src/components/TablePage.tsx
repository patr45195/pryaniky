import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { columns } from '../constants';
import {
  addDocument,
  deleteDocuments,
  Document,
  fetchDocuments,
  setSelectedIds,
  updateDocument,
} from '../store/features/documentsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { TableButtons } from './TableButtons';
import { AdditionalInformation } from './AdditionalInformation';

export const TablePage = () => {
  const dispatch = useAppDispatch();
  const { items: rows, isLoading, selectedIds } = useAppSelector((state) => state.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleAddRow = () => {
    dispatch(addDocument());
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteDocuments(selectedIds));
    }
  };

  const handleProcessRowUpdate = (newRow: Document) => {
    dispatch(updateDocument(newRow));
    return newRow;
  };

  return (
    <div>
      <TableButtons handleAddRow={handleAddRow} handleDelete={handleDelete} />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        processRowUpdate={handleProcessRowUpdate}
        onRowSelectionModelChange={(newSelection) =>
          dispatch(setSelectedIds(newSelection as string[]))
        }
        loading={isLoading}
      />
      <AdditionalInformation />
    </div>
  );
};
