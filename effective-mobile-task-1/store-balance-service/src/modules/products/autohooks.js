import 'dotenv/config'
import got from 'got'
import fp from 'fastify-plugin'
import productsLoader from './schemas/loader.js'

async function productsAutoHooks(server) {
  server.register(productsLoader)

  const products = server.dataSource.product

  server.decorate('productsDataSource', {
    async createProduct(product) {
      const newProduct = await products.create({
        data: {
          ...product
        }
      })

      return newProduct
    },

    async findProductByPlu(plu) {
      const product = await products.findFirst({
        where: {
          plu
        }
      })

      return product
    },

    async findProducts(name) {
      const searchedProducts = await products.findMany({
        where: {
          name: {
            contains: name
          }
        }
      })

      return searchedProducts
    }
  })

  server.decorate('sendHistory', async function sendHistoryOnSendHook(request, reply, payload) {
    let action
    switch (request.method) {
      case 'POST':
        action = 'create'
        break
      case 'PATCH':
        action = 'update'
        break
      case 'DELETE':
        action = 'delete'
    }

    try {
      console.log(payload)
      await got.post(`${process.env.HISTORY_SERVICE_URL}/products`, {
        json: {
          plu: payload.product.plu,
          date: payload.product.createdAt,
          action
        }
      })

      return payload
    } catch (err) {
      request.log.info(err, 'Failed to send note to history service')

      throw new Error('Failed to send note to history service')
    }
  })
}

export default fp(productsAutoHooks, { encapsulate: true, dependencies: ['data-source'] })
