require('dotenv').config();

const models = require('../../models');
const multer = require('multer');
const fs = require('fs');

// upload settings
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname.replace('src/routes/file', '')+'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
})
var upload = multer({ storage: storage }).single('file');

// router functions
const uploadFile = async (req, res, next) => {
  await upload(req, res, async function (err) {
    if (err) {
      return res.send({ err });
    }
    if( req.file === undefined ){
      return res.send({ 
        err: 'file is required!'
      });
    }
    
    // user_toke is user id please CHANGE it and first find a user from user_token then create file.
    const file = await models.files.create({
      user_id: req.headers.user_token,
      name: req.file.originalname,
      path: req.file.filename,
      size: req.file.size
    })
    
    const url = `http://localhost:${process.env.APP_PORT}/files/${req.file.filename}`;

    res.writeHead(200,{ 'Content-Type': 'text/html' });
    res.write(`Click to get file <a href="${url}" title="File url">${url}</a>`);
    res.end();
  })
}

const getFile = async (req, res, next) => {
  
  const file = await models.files.findOne({
    where: {
      user_id: req.headers.user_token,
      path: req.params.path
    }
  });
  
  if(!file){
    return res.send({
      message: 'File not found or you don\'t have permition!'
    })
  }
  
  const path = `${__dirname.replace('src/routes/file', '')}uploads/${file.path}`;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      return res.send({
        message: 'File not found',
        err
      })
    }
  })
  res.sendFile(path);
}

module.exports = {
  prefix: '/files',
  inject: (router) => {
    router.post('/upload', uploadFile);
    router.get('/:path', getFile);
  }
}