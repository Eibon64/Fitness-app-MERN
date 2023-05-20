import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  const [login, { error }] = useMutation(LOGIN);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    login({
      variables: {
        email,
        password,
      },
    })
      .then((response) => {
        const { token } = response.data.login;
        localStorage.setItem('token', token);
        onLogin();
      })
      .catch((error) => {
        console.error('Error occurred logging in:', error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {error && <p>Error occurred while logging in: {error.message}</p>}
    </div>
  );
};

export default LoginPage;
