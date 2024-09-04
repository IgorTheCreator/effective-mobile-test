import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

async function corsPlugin(server: FastifyInstance) {
  server.register(cors, {
    origin: `${process.env.BALANCES_SERVICE_UR}`,
    methods: ['POST', 'GET']
  })
}

export default fp(corsPlugin, { name: 'cors-plugin' })
