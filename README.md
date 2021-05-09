# Vue Quiz Web

A RealTime Quiz Application Using VueJS, SocketIO, Firebase.


## Installation

On **Client** Folder:
- Config `firebase.config.json` on root directory.
```js
{
    "apiKey": "",
    "authDomain": "",
    "databaseURL": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": ""
}
```
- Config environment variables on file `.env.local`:
```bash
  VUE_APP_SERVER_URL=http://localhost:4000
  VUE_APP_JWT_TOKEN=your-jwt-token
```
On **Server** Folder:
- Config environment variables on file `.env.local`:
```bash
  APP_CUSTOM_CLIENT_URL=http://localhost:8080
```

## Run Docker Compose

```bash
docker-compose up --build
docker-compose -f docker-compose.prod.yml up --build
```

## Run Without Docker Compose

On root dicrectory:

**Run Client:**

```bash
$ cd client
$ npm install
$ npm run serve
```

**Run Server:**

```bash
$ npm install
$ npm run dev
```

## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please create an issue.
