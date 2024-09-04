import fp from 'fastify-plugin'
import shopsLoader from './schemas/loader.js'

async function shopsAutoHooks(server) {
  server.register(shopsLoader)

  const shops = server.dataSource.shop

  server.decorate('shopsDataSource', {
    async createShop(shop) {
      const newShop = await shops.create({ data: { ...shop } })

      return newShop
    },

    async findShop(query) {
      const searchedShop = await shops.findFirst({ where: { ...query } })

      return searchedShop
    }
  })
}

export default fp(shopsAutoHooks, { encapsulate: true, dependencies: ['data-source'] })
