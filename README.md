# phantom-backend
Elevate the public transport experience  
[![ci-cd](https://github.com/atlp-rwanda/rca-phantom-team1-bn/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/atlp-rwanda/rca-phantom-team1-bn/actions/workflows/ci-cd.yml) 


## Environment variables

The app defines three different environment namely.

### Getting started with env 

After cloning or rebasing on main, just create three files named: **.env.development** , **.env.production** and **.env.staging**. 

Copy all the environment variables shared in **.env.example** file to each of the three files. Assign values to each variable. eg: 
`PORT=5500` in  `.env.development`
`PORT=5000` in `.env.production`
`PORT=6000` in `.env.staging`

> You can assign ports as you wish.

- **development environment**  : is the default development env that runs the app on port 5500. To be able to switch to **dev env** run. The dev environment watches changes and automatically recompile the app with new changes.

```sh
 $ npm run dev
 # yarn dev or pnpm dev
```

- **staging environment** : is the environment for testing (Running tests basically) the app before it goes into production. It runs on port 6000. To run the staging environment, use the following command:

```sh
$ npm run test
 # yarn stage or pnpm stage
```

- **production environment** : is the environment for running the app in production. It runs on port 5000. To run the production environment, use the following command:

```sh
 $ npm run start
 # yarn start or pnpm start
```

