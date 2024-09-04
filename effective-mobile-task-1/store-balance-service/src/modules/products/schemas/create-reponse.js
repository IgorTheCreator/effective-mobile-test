export const createResponseSchema = {
  $id: 'schema:products:create:response',
  type: 'object',
  properties: {
    product: {
      type: 'object',
      properties: {
        plu: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  }
}
