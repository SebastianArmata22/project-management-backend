<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Project setup

```bash
$ npm install
```

## Create .env file
Create a .env file in the root of the project and add the following variables
```bash
DB_URL=mongodb://mongodb0:40001,mongodb1:40002,mongodb2:40003
DB_OPTIONS=replicaSet=rs0
DB_NAME=project-management
```

## Run MongoDB

```bash
# run mongodb containers
$ docker-compose -p project-management up -d --remove-orphans

# stop mongodb containers
$ docker-compose -p project-management down
```

## Compile and run the project
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

