import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import HOST from '../api/axiosInstance';

const schema = z.object({
  username: z.string().min(5, 'Логин обязателен'),
  password: z.string().min(1, 'Введите пароль'),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await HOST.post('/ru/data/v3/testmethods/docs/login', data);
      localStorage.setItem('token', response.data.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setError('Ошибка авторизации. Проверьте данные.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Вход в систему
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Логин"
          fullWidth
          margin="normal"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
          Войти
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
