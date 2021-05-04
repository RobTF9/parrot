import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth';

const SignIn: React.FC = () => {
  const { signIn } = useAuthContext();
  const [details, setDetails] = useState({ email: '', password: '' });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDetails({ ...details, [event.target.name]: event.target.value });

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(details);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">
        <p>Email</p>
        <input
          onChange={onChange}
          type="text"
          name="email"
          id="email"
          value={details.email}
        />
      </label>
      <label htmlFor="password">
        <p>Password</p>
        <input
          onChange={onChange}
          type="password"
          name="password"
          id="password"
          value={details.password}
        />
      </label>
      <button type="submit">Sign in</button>
      <p>
        Not got an account? <Link to="/create-account">Create an account</Link>
      </p>
    </form>
  );
};

export default SignIn;
