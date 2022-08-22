## Prisma tracing tutorial

Reference code for ["Get Started With Tracing Using OpenTelemetry and Prisma Tracing"](http://prisma.io/blog/tracing-tutorial-prisma-pmkddgq1lm2).

### Installation

1. Clone this branch: `git clone -b tracing-end git@github.com:TasinIshmam/tracing-tutorial-prisma.git`.
2. Install dependencies: `npm install`.
3. Run migrations: `npx prisma migrate dev`.
4. Start jaeger: `docker-compose up -d`
5. Start the server: `npm run dev`.
6. Test out the example endpoint: [http://localhost:4000/users/random](http://localhost:4000/users/random).
