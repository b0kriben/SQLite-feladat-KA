import swaggerAutogen from 'swagger-autogen';
const doc = {
  info: {
    title: 'Users API',
    version: "1.0.0",
    description: 'Users API'
  },
  host: 'localhost:3000',
  basePath: "/api/users"
};
const outputFile = './swagger-output.json';
const routes = ['./routes/users.js'];
swaggerAutogen()(outputFile, routes, doc);