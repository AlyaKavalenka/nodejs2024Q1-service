# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Set environments

Rename `.env.example` to `.env`

## Migration

Before generate migration file run `npm run build`. Then run `npm run migration:generate`. After run `npm run migration:run`.

> I'm already create migration file, so you can just run `npm run migration:run`.

> If you got error when running `npm run migration:generate` try run `npm run docker:up`.


## Running application

```
npm start
```
### Docker

```
npm run docker:up
```
#### Watch mode
*Synchronize code in `src/` folder and containers*
```
npm run docker:watch
```

## Swagger
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
