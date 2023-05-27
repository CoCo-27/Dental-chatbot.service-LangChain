# Project Title

Dental_Assistant_Client

## Description

As a full service provider with state-of-the-art technology, we help you achieve your personal dream smile!

## Getting Started

### Installing

Make sure you have [nvm] installed (prefer: node >= 16)

Just run the following command at the root of your project

```sh
npm install
```

```sh
yarn install
```

### Executing program

Before executing the program, you have to add backend server url in following directory of your project

```json
// /src/config/index.tsx
const backend_api = 'Your current backend server url'
```

If you run server on your local machine, default server url is as following

```json
const backend_api = 'http://localhost:8080/api/';
```

After going through this process, you can run the project with the following command.

```sh
npm start
```
