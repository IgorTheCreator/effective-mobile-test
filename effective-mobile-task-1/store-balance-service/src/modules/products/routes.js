import fp from 'fastify-plugin'

async function productsRoutes(server) {
  server.post(
    '/',
    {
      preSerialization: server.sendHistory,
      schema: {
        tags: ['products'],
        body: server.getSchema('schema:products:create:body'),
        response: {
          201: server.getSchema('schema:products:create:response')
        }
      }
    },
    async function createProductHandler(request, reply) {
      const product = request.body
      try {
        // Check if product with such plu already exists
        const existingProduct = await server.productsDataSource.findProductByPlu(product.plu)
        if (existingProduct) {
          reply.code(400)
          throw new Error('Product with such plu already exists')
        }

        // Create new product
        const newProduct = await server.productsDataSource.createProduct(product)

        reply.code(201)
        return { product: newProduct }
      } catch (err) {
        request.log.info(err, 'Failed to create product')
        throw err
      }
    }
  )

  server.get(
    '/:plu',
    {
      schema: {
        tags: ['products'],
        params: server.getSchema('schema:products:find:plu'),
        response: {
          200: server.getSchema('schema:products:find:response')
        }
      }
    },
    async function findProductByPluHandler(request, reply) {
      const { plu } = request.params
      try {
        const product = await server.productsDataSource.findProductByPlu(plu)

        if (!product) {
          reply.callNotFound()
        }

        reply.code(200)
        return { product }
      } catch (err) {
        request.log.info(err, 'Failed to find product')

        throw new Error('Failed to find product')
      }
    }
  )

  server.get(
    '/',
    {
      schema: {
        tags: ['products'],
        querystring: server.getSchema('schema:products:find-all:query'),
        response: {
          200: server.getSchema('schema:products:find-all:response')
        }
      }
    },
    async function findAllProductsHandler(request, reply) {
      const { name } = request.query
      try {
        const products = await server.productsDataSource.findProducts(name)

        reply.code(200)
        return { products }
      } catch (err) {
        request.log.info(err, 'Failed to find products')

        throw new Error('Failed to find products')
      }
    }
  )
}

export default fp(productsRoutes, {
  name: 'products-routes',
  encapsulate: true,
  decorators: ['productsDataSource']
})
