const Joi = require('joi');
const models = require('../../models');

const schema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(25)
    .required(),
  password: Joi.string()
    .min(4)
    .max(25)
    .required(),
});

const register = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ error });
  }
  const { username, password } = req.body;
  let user = await models.users.findOne({
    where: {
      username,
    },
  });

  if (user) {
    return res.status(400).send({
      err: 'Username already used!',
    });
  }

  user = await models.users.create({
    username,
    password,
  });

  return res.send({
    user,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const { error } = schema.validate({ username, password });
  if (error) {
    return res.status(400).send({ error });
  }
  const user = await models.users.findOne({
    where: {
      username,
      password,
    },
  });
  if (!user) {
    return res.send({ message: 'User not found!' });
  }

  return res.send({
    user,
    user_token: user.id,
  });
};

module.exports = {
  prefix: '/authentications',
  inject: (router) => {
    router.post('/register', register);
    router.post('/login', login);
  },
};
