import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { TablePage } from './components/TablePage';
import GuardedRoute from './components/GuardedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<GuardedRoute />}>
        <Route path="/dashboard" element={<TablePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
