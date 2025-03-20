import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HOST from '../../api/axiosInstance';
import { v4 as uuidv4 } from 'uuid';

export type Document = {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
};

type DocumentsState = {
  items: Document[];
  isLoading: boolean;
  selectedIds: string[];
};

const initialState: DocumentsState = {
  items: [],
  isLoading: false,
  selectedIds: [],
};

export const fetchDocuments = createAsyncThunk('documents/fetch', async () => {
  const response = await HOST.get('/ru/data/v3/testmethods/docs/userdocs/get');
  return response.data.data;
});

export const addDocument = createAsyncThunk('documents/add', async () => {
  const newRow: Document = {
    id: uuidv4(),
    companySigDate: '2025-12-23T11:19:27.017Z',
    companySignatureName: 'test',
    documentName: 'test',
    documentStatus: 'test',
    documentType: 'test',
    employeeNumber: 'test',
    employeeSigDate: '2025-12-23T11:19:27.017Z',
    employeeSignatureName: 'test',
  };

  await HOST.post('/ru/data/v3/testmethods/docs/userdocs/create', newRow);
  return newRow;
});

export const deleteDocuments = createAsyncThunk('documents/delete', async (ids: string[]) => {
  await Promise.all(
    ids.map((id) => HOST.delete(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`)),
  );
  return ids;
});

export const updateDocument = createAsyncThunk('documents/update', async (updatedDoc: Document) => {
  const response = await HOST.post(
    `/ru/data/v3/testmethods/docs/userdocs/set/${updatedDoc.id}`,
    updatedDoc,
  );

  if (response.data.error_code === 0) {
    return response.data.data;
  }
  throw new Error('Ошибка обновления');
});

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setSelectedIds: (state, action) => {
      state.selectedIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(addDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.selectedIds = [];
      })
      .addCase(addDocument.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((doc) => !action.payload.includes(doc.id));
        state.selectedIds = [];
      })
      .addCase(deleteDocuments.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(updateDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.map((doc) =>
          doc.id === action.payload.id ? action.payload : doc,
        );
      })
      .addCase(updateDocument.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSelectedIds } = documentSlice.actions;
export default documentSlice.reducer;
