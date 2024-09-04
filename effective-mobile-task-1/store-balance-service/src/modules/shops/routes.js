import fp from 'fastify-plugin'

async function shopRoutes(server) {
  server.post(
    '/',
    {
      schema: {
        tags: ['shops'],
        body: server.getSchema('schema:shops:create:body'),
        response: {
          201: server.getSchema('schema:shops:create:response')
        }
      }
    },
    async function createShopHandler(request, reply) {
      const shop = request.body
      const existingShop = await server.shopsDataSource.findShop({ title: shop.title })

      if (existingShop) {
        reply.code(400)
        throw new Error('Shop already exists')
      }

      try {
        const newShop = await server.shopsDataSource.createShop(request.body)

        reply.code(201)
        return { shop: newShop }
      } catch (err) {
        request.log.info(err, 'Failed to create shop')

        throw new Error('Failed to create shop')
      }
    }
  )
}

export default fp(shopRoutes, {
  encapsulate: true,
  name: 'shops-routes',
  decorators: ['shopsDataSource']
})
