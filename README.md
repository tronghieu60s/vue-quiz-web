# Vue Quiz Web

A RealTime Quiz Application Using VueJS, SocketIO, Firebase.


## Installation

On **Client** Folder:

- Create a file with name `firebase.config.json` on root directory:
```js
{
    "apiKey": "your-api-key",
    "authDomain": "your-auth-domain",
    "databaseURL": "your-database-url",
    "projectId": "your-project-id",
    "storageBucket": "your-storage-bucket",
    "messagingSenderId": "your-messaging-sender-id",
    "appId": "your-app-id"
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
$ cd server
$ npm install
$ npm run dev
```


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please create an issue.
