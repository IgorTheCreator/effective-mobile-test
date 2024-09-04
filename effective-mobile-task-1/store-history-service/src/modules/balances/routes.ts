import fp from 'fastify-plugin'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ICreateBody, IFindAllQuery } from './interfaces'

async function balancesRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        tags: ['balances history'],
        body: server.getSchema('schema:balances-history:create:body'),
        response: {
          201: server.getSchema('schema:balances-history:create:response')
        }
      }
    },
    async function createHistoryNote(
      request: FastifyRequest<{ Body: ICreateBody }>,
      reply: FastifyReply
    ) {
      try {
        const balancetHistoryNote = await server.balancesHistory.createNote(request.body)

        reply.code(201)
        return { note: balancetHistoryNote }
      } catch (err) {
        request.log.info(err, 'Failed to create new balances history note')

        throw new Error('Failed to create new balances history note')
      }
    }
  )

  server.get(
    '/',
    {
      schema: {
        tags: ['balances history'],
        querystring: server.getSchema('schema:balances-history:find-all:query'),
        response: {
          200: server.getSchema('schema:balances-history:find-all:response')
        }
      }
    },
    async function getHistoryNote(
      request: FastifyRequest<{ Querystring: IFindAllQuery }>,
      reply: FastifyReply
    ) {
      try {
        const notes = await server.balancesHistory.findNotes(request.query)

        reply.code(200)
        return { notes }
      } catch (err) {
        request.log.info(err, 'Failed to find notes')

        throw new Error('Failed to find notes')
      }
    }
  )
}

export default fp(balancesRoutes, { name: 'balances-routes', encapsulate: true })
