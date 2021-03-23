# NodeJS File Uploader Template
NodeJS, ExpressJS, MySQL, Multer file upload app template.

```
.
├── .env //Enviroment Variables
├── .gitignore
├── migrations 
│   ├── 23032021192430-create-user.js
│   └── 23032021201055-create-files.js
├── package.json
├── package-lock.json
├── README.md
├── sample.env // Sample Enviroment Variables
├── .sequelizerc //Sequelize config
├── src
│   ├── configs
│   │   └── sequelize.js // Database config
│   ├── models
│   │   ├── files.js
│   │   ├── index.js
│   │   └── users.js
│   ├── router.js
│   ├── routes
│   │   ├── authentications
│   │   │   └── index.js
│   │   ├── file
│   │   │   └── index.js
│   │   └── index.js
│   ├── sequelize.js // Sequelize Connection Instance
│   └── server.js // Server start point
└── uploads
    └── ...
```

## Clone
```bash
git clone https://github.com/saracalihan/node-file-uploader-template.git
cd node-file-uploader-template
```

## Install
```bash
npm install
```

## Set Enviroment Variables
Copy `sample.env` file then change values
```bash
cp sample.env .env
```

## Migrate
Create database then
```bash
npm run migrate
```

## Run Server
```bash
npm start
```

## User Story
İn my story the server listen to `http://localhost:3000`
### Create User
```bash
curl --header "Content-Type: application/json" --request POST  --data '{"username":"saracalihan","password":"123456"}' http://localhost:3000/authentications/register
```
Output:
```
{
  "user":{
    "id":1,
    "username":"saracalihan",
    "password":"123456",
    "updatedAt":"2021-03-23T19:01:43.101Z",
    "createdAt":"2021-03-23T19:01:43.101Z"
  }
}
```

### Login User
```bash
curl --header "Content-Type: application/json" --request POST  --data '{"username":"saracalihan","password":"123456"}' http://localhost:3000/authentications/login
```
Output: 
```
{
  "user":{
    "id":1,
    "username":"saracalihan",
    "password":"123456",
    "createdAt":"2021-03-23T19:01:43.000Z",
    "updatedAt":"2021-03-23T19:01:43.000Z",
    "deletedAt":null
  },
  "user_token":1
}
```

### Upload File
`avatar.png` is file name.
```bash
curl --header "user_token: 1" --form file=@resmi.png http://localhost:3000/files/upload
```
Output: 
```
http://localhost:3000/files/1616526652422-105337387-avatar.png
```

### Get File
```bash
curl -X GET --header "user_token: 1" -O http://localhost:3000/files/1616526652422-105337387-avatar.png
```
Output: 
```
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                               Dload  Upload   Total   Spent    Left  Speed
100  187k  100  187k    0     0  13.0M      0 --:--:-- --:--:-- --:--:-- 13.0M

```

## LICENSE
[GPL-3.0 License](LICENSE)
