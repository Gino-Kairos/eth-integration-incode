module.exports = {
  /* Swagger configuration */
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "KairosDS: POC etherum API example",
      version: "1.0.0",
      description: "RestAPI with smart contracts integration",
    },
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server - POC",
    },
  ],
};
