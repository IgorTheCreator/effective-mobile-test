import fp from 'fastify-plugin'

async function balancesRoutes(server) {
  server.get(
    '/',
    {
      schema: {
        tags: ['balances'],
        querystring: server.getSchema('schema:balances:find-all:query'),
        response: {
          200: server.getSchema('schema:balances:find-all:response')
        }
      }
    },
    async function getAllBalancesHandler(request) {
      try {
        const balances = await server.balancesDataSource.findBalances(request.query)
        return { balances }
      } catch (err) {
        request.log.info(err, 'Failed to find balances')

        throw new Error('Failed to find balances')
      }
    }
  )

  server.post(
    '/',
    {
      preSerialization: server.sendHistory,
      schema: {
        tags: ['balances'],
        body: server.getSchema('schema:balances:create:body'),
        response: {
          201: server.getSchema('schema:balances:create:response')
        }
      }
    },
    async function createBalanceHandler(request, reply) {
      const balance = request.body

      try {
        const newBalance = await server.balancesDataSource.createBalance(balance)

        reply.code(201)
        return { balance: newBalance }
      } catch (err) {
        request.log.info(err, 'Failed to create balance')

        if (err.type === 'PrismaClientKnownRequestError') {
          reply.code(400)
          throw new Error('Wrong data')
        }

        throw new Error('Failed to create balance')
      }
    }
  )

  server.patch(
    '/shop/:shopId/plu/:plu',
    {
      preSerialization: server.sendHistory,
      schema: {
        tags: ['balances'],
        params: server.getSchema('schema:balances:update:params'),
        body: server.getSchema('schema:balances:update:body'),
        response: {
          200: server.getSchema('schema:balances:update:response')
        }
      }
    },
    async function updateBalances(request, reply) {
      const { shopId, plu } = request.params

      const updatedBalance = await server.balancesDataSource.updateBalances(
        shopId,
        plu,
        request.body
      )

      reply.code(200)
      return { balance: updatedBalance }
    }
  )
}

export default fp(balancesRoutes, {
  encapsulate: true,
  name: 'balances-routes',
  decorators: ['balancesDataSource']
})
