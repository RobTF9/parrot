import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/Auth';

const CreateAccount: React.FC = () => {
  const { signUp } = useAuthContext();

  const [details, setDetails] = useState({
    email: '',
    password: '',
    username: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDetails({ ...details, [event.target.name]: event.target.value });

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp(details);
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
      <label htmlFor="username">
        <p>Username</p>
        <input
          onChange={onChange}
          type="text"
          name="username"
          id="username"
          value={details.username}
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
      <button type="submit">Create account</button>
      <p>
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>
    </form>
  );
};

export default CreateAccount;
