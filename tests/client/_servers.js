import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../server/utils/constants';

const users = [
  {
    email: 'email@email.com',
    password: 'password',
  },
];

export const authServer = setupServer(
  rest.get('/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        auth: false,
      })
    );
  }),

  rest.post('/auth/signup', (req, res, ctx) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
      return res(
        ctx.json({
          message: ERROR_MESSAGE.NEED_EMAIL_AND_PASSWORD,
          auth: false,
        })
      );
    }

    users.push(req.body);

    return res(
      ctx.json({ auth: true, message: SUCCESS_MESSAGE.SIGN_UP_SUCCESSFUL })
    );
  }),

  rest.post('/auth/signin', (req, res, ctx) => {
    if (!req.body.email || !req.body.password) {
      return res(
        ctx.json({
          message: ERROR_MESSAGE.NEED_EMAIL_AND_PASSWORD,
          auth: false,
        })
      );
    }

    if (!users.find(({ email }) => email === req.body.email)) {
      return res(
        ctx.json({
          message: ERROR_MESSAGE.INVALID_EMAIL_AND_PASSWORD,
          auth: false,
        })
      );
    }

    return res(
      ctx.json({ auth: true, message: SUCCESS_MESSAGE.SIGN_IN_SUCCESSFUL })
    );
  })
);

export const lexiconServer = '';
