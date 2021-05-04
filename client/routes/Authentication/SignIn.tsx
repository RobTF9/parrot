import React, { useState } from 'react';

const SignIn: React.FC = () => {
  const [details, setDetails] = useState({ email: '', password: '' });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDetails({ ...details, [event.target.name]: event.target.value });

  return (
    <form>
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
    </form>
  );
};

export default SignIn;
