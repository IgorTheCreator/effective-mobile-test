import 'dotenv/config'
import fp from 'fastify-plugin'
import got from 'got'
import balancesLoader from './schemas/loader.js'

async function balancesAutoHooks(server) {
  server.register(balancesLoader)

  const balances = server.dataSource.balance

  server.decorate('balancesDataSource', {
    async createBalance(balance) {
      const newBalance = await balances.create({ data: { ...balance } })

      return newBalance
    },

    async findBalances(query) {
      const filters = {}
      if (query.plu) {
        filters.plu = query.plu
      }

      if (query.shop_id) {
        filters.shopId = query.shop_id
      }

      if (query.shelf_min || query.shelf_max) {
        filters.shelfQuantity = {}
        if (query.shelf_min) filters.shelfQuantity.gte = query.shelf_min
        if (query.shelf_max) filters.shelfQuantity.lte = parseInt(query.shelf_max)
      }

      if (query.order_min || query.order_max) {
        filters.orderQuantity = {}
        if (query.order_min) filters.orderQuantity.gte = query.order_min
        if (query.order_max) filters.orderQuantity.lte = parseInt(query.order_max)
      }

      const searchedBalances = await balances.findMany({ where: filters })

      return searchedBalances
    },

    async updateBalances(shopId, plu, data) {
      const updatedBalance = await balances.update({ data, where: { balanceId: { shopId, plu } } })

      return updatedBalance
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
      await got.post(`${process.env.HISTORY_SERVICE_URL}/balances`, {
        json: {
          shopId: payload.balance.shopId,
          plu: payload.balance.plu,
          date: payload.balance.createdAt,
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

export default fp(balancesAutoHooks, { encapsulate: true, dependencies: ['data-source'] })
