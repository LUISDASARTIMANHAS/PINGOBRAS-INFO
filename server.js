/**
 * This is the main server script that provides the API endpoints
 * The script uses the database helper in /src
 * The endpoints retrieve, update, and return data to the page handlebars files
 *
 * The API returns the front-end UI handlebars pages, or
 * Raw json if the client requests it with a query parameter ?raw=json
 */

// Utilities we need
const fs = require("fs");
const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, ""),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// We use a module for handling database operations in /src
const data = require("./src/data.json");
const db = require("./src/" + data.database);

/**
 * Home route for the app
 *
 * Return the poll options from the database helper script
 * The home route may be called on remix in which case the db needs setup
 *
 * Client can request raw data using a query parameter
 */
fastify.get("/", async (request, reply) => {
  /* 
  Params is the data we pass to the client
  - SEO values for front-end UI but not for raw data
  */
  let params = request.query.raw ? {} : { seo: seo };

  // Get the available choices from the database
  const options = await db.getOptions();
  if (options) {
    params.optionNames = options.map(choice => choice.language);
    params.optionCounts = options.map(choice => choice.picks);
  }
  // Let the user know if there was a db error
  else params.error = data.errorMessage;

  // Check in case the data is empty or not setup yet
  if (options && params.optionNames.length < 1)
    params.setup = data.setupMessage;

  // ADD PARAMS FROM TODO HERE

  // Send the page options or raw JSON data if the client requested it
  request.query.raw
    ? reply.send(params)
    : reply.view("index.html", params);
});

/**
 * Post route to process user vote
 *
 * Retrieve vote from body data
 * Send vote to database helper
 * Return updated list of votes
 */
fastify.post("/", async (request, reply) => { 
  // We only send seo if the client is requesting the front-end ui
  let params = request.query.raw ? {} : { seo: seo };

  // Flag to indicate we want to show the poll results instead of the poll form
  params.results = true;
  let options;

  // We have a vote - send to the db helper to process and return results
  if (request.body.language) {
    options = await db.processVote(request.body.language);
    if (options) {
      // We send the choices and numbers in parallel arrays
      params.optionNames = options.map(choice => choice.language);
      params.optionCounts = options.map(choice => choice.picks);
    }
  }
  params.error = options ? null : data.errorMessage;

  // Return the info to the client
  request.query.raw
    ? reply.send(params)
    : reply.view("pingobras.glitch.me", params);
});

/**
 * O endpoint do administrador retorna o registro de votos
  * Envie json bruto ou a página do guiador de administração
 */
fastify.get("/logs", async (request, reply) => {
  let params = request.query.raw ? {} : { seo: seo };

  // Obtenha o histórico de log do banco de dados
  params.optionHistory = await db.getLogs();

  // Informe o usuário se houver um erro
  params.error = params.optionHistory ? null : data.errorMessage;

  // Send the log list
  request.query.raw
    ? reply.send(params)
    : reply.view("index.html", params);
});

/**
 * Endpoint de administrador para esvaziar todos os logs
  * Requer autorização (consulte as instruções de configuração em README)
  * Se a autenticação falhar, retorne um 401 e a lista de logs
  * Se a autenticação for bem sucedida, esvazie o histórico
 */
fastify.post("/reset", async (request, reply) => {
  let params = request.query.raw ? {} : { seo: seo };

  /* 
  Autentique a solicitação do usuário verificando a variável de chave env
   - certifique-se de que temos uma chave no env e no corpo e que eles correspondem
  */
  if (
    !request.body.key ||
    request.body.key.length < 4 ||
    !process.env.ADMIN_KEY ||
    request.body.key !== process.env.ADMIN_KEY) 
  {
    console.error("auth fail");

    // Falha na autenticação, retorne os dados de log mais um sinalizador com falha
    params.failed = "senha invalida ou incorreta";

    // Obtenha a lista de registros
    params.optionHistory = await db.getLogs();
     } 
  else {
    // Temos uma chave válida e podemos limpar o log
    params.optionHistory = await db.clearHistory();
    params.true = "senha correta";
     window.location.href = ("https://google.com");
    // Verifique se há erros - o método retornaria um valor falso
    params.error = params.optionHistory ? null : data.errorMessage;
  }

  // Envie um 401 se a autenticação falhou, 200 caso contrário
  const status = params.failed ? 401 : 200;
  // Envie um código de status não autorizado se as credenciais do usuário falharem
  request.query.raw
    ? reply.status(status).send(params)
    : reply.status(status).view("index.html", params);
});

// Execute o servidor e relate para os logs
fastify.listen(process.env.PORT, '0.0.0.0', function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`IP do servidor ${address}`);
  fastify.log.info(`Servidor ligado a ${address}`);
});
