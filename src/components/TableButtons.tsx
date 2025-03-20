import { Button } from '@mui/material';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';

interface TableButtonsProps {
  handleAddRow: () => void;
  handleDelete: () => void;
}

export const TableButtons = ({ handleAddRow, handleDelete }: TableButtonsProps) => {
  const navigate = useNavigate();

  const { isLoading, selectedIds } = useAppSelector((state) => state.documents);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddRow} disabled={isLoading}>
        Добавить запись
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        disabled={selectedIds.length === 0 || isLoading}
      >
        Удалить выбранные
      </Button>
      <Button variant="outlined" color="error" onClick={handleLogout}>
        Выйти
      </Button>
    </>
  );
};
