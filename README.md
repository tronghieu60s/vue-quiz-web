# Vue Quiz Web

A RealTime Quiz Application Using VueJS, SocketIO, Firebase.


## Installation

Config environment variables on file `/client/.env.local`:

```bash
VUE_APP_SERVER_URL=http://localhost:4000
VUE_APP_JWT_TOKEN=your-jwt-token
VUE_APP_FIREBASE_API_KEY=your-firebase-apiKey
VUE_APP_FIREBASE_DATABASE_URL=your-database-url
VUE_APP_FIREBASE_PROJECT_ID=your-firebase-projectId
VUE_APP_FIREBASE_SENDER_ID=your-firebase-senderId
VUE_APP_FIREBASE_APP_ID=your-firebase-appId
```


## Run Docker Compose

### 1. Development

```bash
$ docker-compose up --build
```

### 2. Production

```bash
$ docker-compose -f docker-compose.prod.yml up --build
```


## Run Without Docker Compose

### 1. Development

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

### 2. Production

**Run Client:**

```bash
$ cd client
$ npm install
$ npm run production
```

**Run Server:**

```bash
$ cd server
$ npm install
$ npm start
```


## Deploy

### 1. Server

1. Create a new branch with `server` folder:

```bash 
$ git subtree push --prefix server origin <name-branch>
```

2. Deploy server with branch `<name-branch>`.

### 2. Client

For learning to deploy: https://cli.vuejs.org/guide/deployment.html

Deploy Basic:

1. Re config environment variables.

2. Build production (static file) run:

```bash
$ cd client
$ npm install
$ npm run build
$ npm start
```

**+ Deploy to a Static Website Hosting:**

Upload content of `dist` folder to your hosting and enjoy.

**+ Deploy to Github Pages:**
https://cli.vuejs.org/guide/deployment.html#github-pages

**+ Deploy to Netlify:**
https://cli.vuejs.org/guide/deployment.html#netlify

**+ Deploy to Firebase Hosting:**

1. Config Firebase Hosting in `/client/.firebaserc`:

```js
{ "projects": { "default": "<your-firebase-hosting>" } }
```

2. Open terminal and run command ```firebase deploy```.


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please create an issue.
