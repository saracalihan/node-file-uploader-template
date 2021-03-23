require('dotenv').config();

const multer = require('multer');
const fs = require('fs');
const models = require('../../models');

// upload settings
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname.replace('src/routes/file', '')}uploads`);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage }).single('file');

// router functions
const uploadFile = async (req, res) => {
  await upload(req, res, async (err) => {
    if (err) {
      return res.send({ err });
    }
    if (req.file === undefined) {
      return res.send({
        err: 'file is required!',
      });
    }

    // user_toke is user id please CHANGE it and first find a user from user_token then create file.
    const file = await models.files.create({
      user_id: req.headers.user_token,
      name: req.file.originalname,
      path: req.file.filename,
      size: req.file.size,
    });

    const url = `http://localhost:${process.env.APP_PORT}/files/${req.file.filename}`;

    return res.send({
      file,
      url,
    });
  });
};

const getFile = async (req, res) => {
  const file = await models.files.findOne({
    where: {
      user_id: req.headers.user_token,
      path: req.params.path,
    },
  });

  if (!file) {
    return res.send({
      message: 'File not found or you don\'t have permition!',
    });
  }

  const path = `${__dirname.replace('src/routes/file', '')}uploads/${file.path}`;
  fs.readFile(path, 'utf8', (err) => res.send({
    message: 'File not found',
    err,
  }));
  return res.sendFile(path);
};

module.exports = {
  prefix: '/files',
  inject: (router) => {
    router.post('/upload', uploadFile);
    router.get('/:path', getFile);
  },
};
