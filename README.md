# phantom-backend
Elevate the public transport experience  


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

### Adding a new environment variable

This is so simple

1. To add a new environment variable, you will add it in the 3 different env files `.env.production`, `env.development` & in `.env.staging`.

2. Export the environment in the `src/config/dotenv` directory.

3. Add it to the `.env.example` without a value because `.env.example` is the only file to be pushed to github. This will aid others to updated their env files accordingly.

4. Import the variable where you want to use it from `src/config/dotenv`

4. Finally talk to the team to update them about it. 

**example** Refer to how `PORT` was set
