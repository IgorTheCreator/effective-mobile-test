import fp from 'fastify-plugin'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ICreateBody, IFindAllQuery } from './interfaces'

async function productsRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        tags: ['products history'],
        body: server.getSchema('schema:products-history:create:body'),
        response: {
          201: server.getSchema('schema:products-history:create:response')
        }
      }
    },
    async function createHistoryNote(
      request: FastifyRequest<{ Body: ICreateBody }>,
      reply: FastifyReply
    ) {
      try {
        const productHistoryNote = await server.productsHistory.createNote(request.body)

        reply.code(201)
        return { note: productHistoryNote }
      } catch (err) {
        request.log.info(err, 'Failed to create new products history note')

        throw new Error('Failed to create new products history note')
      }
    }
  )

  server.get(
    '/',
    {
      schema: {
        tags: ['products history'],
        querystring: server.getSchema('schema:products-history:find-all:query'),
        response: {
          200: server.getSchema('schema:products-history:find-all:response')
        }
      }
    },
    async function getHistoryNote(
      request: FastifyRequest<{ Querystring: IFindAllQuery }>,
      reply: FastifyReply
    ) {
      try {
        const notes = await server.productsHistory.findNotes(request.query)

        reply.code(200)
        return { notes }
      } catch (err) {
        request.log.info(err, 'Failed to find notes')

        throw new Error('Failed to find notes')
      }
    }
  )
}

export default fp(productsRoutes, { name: 'products-router', encapsulate: true })
