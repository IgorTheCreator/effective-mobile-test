import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { IBalanceHistory, ICreateBody, IFindAllQuery } from './interfaces'
import balancesHistoryLoader from './schemas/loader'

declare module 'fastify' {
  interface FastifyInstance {
    balancesHistory: {
      createNote: (data: ICreateBody) => Promise<IBalanceHistory>
      findNotes: (query: IFindAllQuery) => Promise<IBalanceHistory[]>
    }
  }
}

async function productsAutoHooks(server: FastifyInstance) {
  // Add schemas
  server.register(balancesHistoryLoader)

  const balanceHistory = server.dataSource.balanceHistory

  // Balances history service
  server.decorate('balancesHistory', {
    async createNote(data) {
      const balanceHistoryNote = await balanceHistory.create({
        data: {
          ...data
        }
      })

      return balanceHistoryNote
    },

    async findNotes(query) {
      type Filter = {
        shopId?: number
        plu?: string
        action?: string
        date?: {
          gte?: Date
          lte?: Date
        }
      }

      // Filter for searching in database
      const filters: Filter = {}

      if (query.shop_id) {
        filters.shopId = query.shop_id
      }

      if (query.plu) {
        filters.plu = query.plu
      }

      if (query.action) {
        filters.action = query.action
      }

      if (query.from_date || query.to_date) {
        filters.date = {}
        if (query.from_date) filters.date.gte = query.from_date
        if (query.to_date) filters.date.lte = query.to_date
      }

      // Pagination
      const take = query.limit
      const skip = (query.page - 1) * query.limit

      const notes = await balanceHistory.findMany({ take, skip, where: filters })

      return notes
    }
  })
}

export default fp(productsAutoHooks, { encapsulate: true, dependencies: ['data-source'] })
