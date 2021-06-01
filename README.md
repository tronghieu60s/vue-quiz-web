# Vue Quiz Web

A RealTime Quiz Application Using VueJS, SocketIO, Firebase.

## Installation

On **Client** Folder:

- Config environment variables on file `.env.local`:

```bash
  VUE_APP_SERVER_URL=http://localhost:4000
  VUE_APP_JWT_TOKEN=your-jwt-token
  VUE_APP_FIREBASE_API_KEY=your-firebase-apiKey
  VUE_APP_FIREBASE_DATABASE_URL=your-database-url
  VUE_APP_FIREBASE_PROJECT_ID=your-firebase-projectId
  VUE_APP_FIREBASE_SENDER_ID=your-firebase-senderId
  VUE_APP_FIREBASE_APP_ID=your-firebase-appId
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

On root directory:

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
