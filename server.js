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

    // Verifique se há erros - o método retornaria um valor falso
    params.error = params.optionHistory ? null : data.errorMessage;
  }

  // Envie um 401 se a autenticação falhou, 200 caso contrário
  const status = params.failed ? 401 : 200;
  // Envie um código de status não autorizado se as credenciais do usuário falharem
  request.query.raw
    ? reply.status(status).send(params)
    : reply.status(status).view("/src/pages/admin.hbs", params);
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
