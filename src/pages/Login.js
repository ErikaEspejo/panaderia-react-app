import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../api';
import { setSession } from '../utils/auth';
import { useStore } from '../store/Store';
import Alert from '../components/Alert';
import './styles/Login.scss';

export default function Login() {
  const history = useHistory();
  const {
    actions: { login },
  } = useStore();
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    try {
      setError('');
      const data = await API.login({
        username: username.value,
        password: password.value,
      });

      const { token, position } = data;
      setSession({ data: token, position });
      login({
        id: data.id,
        name: data.name,
        lastname: data.lastName,
        username: data.username,
        email: data.email,
      });

      position === 'admin' ? history.push('/accesos') : history.push('/sales');
    } catch (error) {
      setError('Incorrect username or password');
    }
  }

  return (
    <div className="auth">
      <div className="wrapper">
        <div className="auth-container">
          <h4>Login</h4>
          <form onSubmit={onSubmit}>
            {error && <Alert severity="error" message={error} />}
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
