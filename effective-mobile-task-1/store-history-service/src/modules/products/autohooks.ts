import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { ICreateBody, IFindAllQuery, IProductHistory } from './interfaces'
import productsHistoryLoader from './schemas/loader'

declare module 'fastify' {
  interface FastifyInstance {
    productsHistory: {
      createNote: (data: ICreateBody) => Promise<IProductHistory>
      findNotes: (query: IFindAllQuery) => Promise<IProductHistory[]>
    }
  }
}

async function productsAutoHooks(server: FastifyInstance) {
  // Add schemas
  server.register(productsHistoryLoader)

  const productHistory = server.dataSource.productHistory

  // Products history service
  server.decorate('productsHistory', {
    async createNote(data) {
      const productHistoryNote = await productHistory.create({
        data: {
          ...data
        }
      })

      return productHistoryNote
    },

    async findNotes(query) {
      type Filter = {
        plu?: string
        action?: string
        date?: {
          gte?: Date
          lte?: Date
        }
      }

      // Filter for searching in database
      const filters: Filter = {}

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

      const notes = await productHistory.findMany({ take, skip, where: filters })

      return notes
    }
  })
}

export default fp(productsAutoHooks, { encapsulate: true, dependencies: ['data-source'] })
