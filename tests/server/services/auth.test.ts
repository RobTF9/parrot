import request from 'supertest';
import session from 'supertest-session';
import User from '../../../server/resources/user/user.model';
import { app } from '../../../server/server';
import { ERROR_MESSAGE } from '../../../server/utils/constants';

const createUser = async () => {
  await User.create({
    username: 'user',
    email: 'email@email.com',
    password: 'password',
  });
};

describe('Auth service...', () => {
  test('can sign up new user', async () => {
    const response = await request(app).post('/auth/signup').send({
      username: 'user',
      email: 'email@email.com',
      password: 'password',
    });

    expect(response.body.auth).toBe(true);
    expect(response.statusCode).toBe(201);

    const createdUser = await User.findOne({ username: 'user' });
    expect(createdUser).toBeTruthy();
  });

  test('error on sign up if no username, email or password', async () => {
    const response = await request(app).post('/auth/signup').send({
      username: '',
      email: '',
      password: '',
    });

    expect(response.body.auth).toBe(false);
    expect(response.body.message).toBe(
      ERROR_MESSAGE.NEED_EMAIL_PASSWORD_USERNAME
    );
    expect(response.statusCode).toBe(400);
  });

  test('can sign in as existing user', async () => {
    await createUser();

    const response = await request(app).post('/auth/signin').send({
      email: 'email@email.com',
      password: 'password',
    });

    expect(response.body.auth).toBe(true);
    expect(response.statusCode).toBe(201);
  });

  test('error message if no password or email on sign in', async () => {
    const response = await request(app).post('/auth/signin').send({
      email: '',
      password: '',
    });

    expect(response.body.auth).toBe(false);
    expect(response.body.message).toBe(ERROR_MESSAGE.NEED_EMAIL_AND_PASSWORD);
    expect(response.statusCode).toBe(400);
  });

  test('error message if user does not exist on sign in', async () => {
    const response = await request(app).post('/auth/signin').send({
      email: 'hi@email.com',
      password: 'password',
    });

    expect(response.body.auth).toBe(false);
    expect(response.body.message).toBe(
      ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD
    );
    expect(response.statusCode).toBe(401);
  });

  test('error message if password invalid on sign in', async () => {
    await createUser();

    const response = await request(app).post('/auth/signin').send({
      email: 'email@email.com',
      password: 'wrong',
    });

    expect(response.body.auth).toBe(false);
    expect(response.body.message).toBe(
      ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD
    );
    expect(response.statusCode).toBe(401);
  });

  test('auth returns false if no session active', async () => {
    const authSession = session(app);
    const response = await authSession.get('/auth');

    expect(response.body.auth).toBe(false);
    expect(response.body.message).toBe(ERROR_MESSAGE.NOT_AUTHORIZED);
    expect(response.statusCode).toBe(401);
  });

  test('session persists after log in', async () => {
    const authSession = session(app);

    await createUser();

    await authSession.post('/auth/signin').send({
      email: 'email@email.com',
      password: 'password',
    });

    const response = await authSession.get('/auth');
    expect(response.statusCode).toBe(200);
    expect(response.body.auth).toBe(true);
  });

  test('can remove session on sign out', async () => {
    const authSession = session(app);

    await createUser();

    await authSession.post('/auth/signin').send({
      email: 'email@email.com',
      password: 'password',
    });

    const response = await authSession.get('/auth/signout');
    expect(response.statusCode).toBe(200);
    expect(response.body.auth).toBe(false);
  });

  test('protects routes if not signed in', async () => {
    const response = await request(app).get('/api/user');

    expect(response.body.message).toBe(ERROR_MESSAGE.NOT_AUTHORIZED);
    expect(response.statusCode).toBe(401);
  });
});
