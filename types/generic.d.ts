export {};

declare global {
  type Email = { email: string };
  type Password = { password: string };
  type Username = { username: string };
  type Token = { token: string };
  type Id = { _id: string };

  type Message = {
    type: string;
    visible: boolean;
    message: string;
  };
}
