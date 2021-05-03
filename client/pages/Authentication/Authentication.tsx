import React, { useState } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
// import { Loading } from '../../styles/Animations.styles';
import { Button } from '../../styles/Buttons.styles';
import { Container, Modal } from '../../styles/Layout.styles';

const Authentication: React.FunctionComponent = () => {
  const signIn = (d: { email: string; password: string }) => console.log(d);

  const [details, setDetails] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(details);
  };

  return (
    <Container>
      <PageHeader title="Sign in" />
      <Modal>
        {/* {loading && <Loading bg />} */}
        <form onSubmit={submitHandler}>
          <Input
            label="Email"
            onChange={changeHandler}
            name="email"
            value={details.email}
          />
          <Input
            label="Password"
            onChange={changeHandler}
            name="password"
            value={details.password}
            type="password"
          />
          <Button type="submit">Login</Button>
        </form>
      </Modal>
    </Container>
  );
};

export default Authentication;
