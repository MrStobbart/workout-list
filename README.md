# Workout List App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run the app

### With docker-compose

```bash
docker-compose up
```

### Manually

```bash
docker-compose up postgres hasura
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development

#### Prepare

1. Install `npm i`
2. Prepare backend `docker-compose up postgres hasura`
3. Seed database `npm run seed`

#### Run Tests

* Run Test: `npm test`

#### Development mode

* Run `npm run dev`
