# Vue Quiz Web

A RealTime Quiz Application Using VueJS, SocketIO, Firebase.


## Installation

1. On Root Directory:

```bash
$ cd client
```

2. Config Environment Variables on File `.env.local`:

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

**Build Production (Static File)**
```bash
$ cd client
$ npm install
$ npm run build
$ npm start
```

**Run Server:**

```bash
$ cd server
$ npm install
$ npm start
```


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please create an issue.
