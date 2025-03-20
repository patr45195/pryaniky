import { GridColDef } from '@mui/x-data-grid';

export const API_URL = import.meta.env.VITE_API_URL;

export const columns: GridColDef[] = [
  { field: 'companySigDate', headerName: 'Дата подписи компании', width: 200, editable: true },
  { field: 'companySignatureName', headerName: 'Подпись компании', width: 200, editable: true },
  { field: 'documentName', headerName: 'Название', width: 200, editable: true },
  { field: 'documentStatus', headerName: 'Статус', width: 150, editable: true },
  { field: 'documentType', headerName: 'Тип документа', width: 200, editable: true },
  { field: 'employeeNumber', headerName: 'Табельный номер', width: 150, editable: true },
  { field: 'employeeSigDate', headerName: 'Дата подписи сотрудника', width: 200, editable: true },
  { field: 'employeeSignatureName', headerName: 'Подпись сотрудника', width: 200, editable: true },
];
