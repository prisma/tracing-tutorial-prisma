## Prisma tracing tutorial

Reference code for ["Get Started With Tracing Using OpenTelemetry and Prisma Tracing"](https://prisma.io/blog/tracing-tutorial-prisma-pmkddgq1lm2).

This branch reflects the code at the _end of the tutorial_.

For reference express server used at the _beginning of the tutorial_ go to the [`tracing-begin`](https://github.com/TasinIshmam/tracing-tutorial-prisma/tree/tracing-begin) branch. 

### Installation

1. Clone this branch: `git clone git@github.com:TasinIshmam/tracing-tutorial-prisma.git`.
2. Navigate to the cloned directory: `cd tracing-tutorial-prisma`.
3. Install dependencies: `npm install`.
4. Run migrations: `npx prisma migrate dev`.
5. Start jaeger: `docker-compose up -d`
6. Start the server: `npm run dev`.
7. Test out the example endpoint: [http://localhost:4000/users/random](http://localhost:4000/users/random).
8. See the generated traces in Jaeger: [http://localhost:16686](http://localhost:16686). 
