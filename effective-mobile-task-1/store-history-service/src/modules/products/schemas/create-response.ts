export const createResponseSchema = {
  $id: 'schema:products-history:create:response',
  type: 'object',
  properties: {
    note: {
      type: 'object',
      properties: {
        id: {
          type: 'integer'
        },
        plu: {
          type: 'string'
        },
        date: {
          type: 'string',
          format: 'date-time'
        },
        action: {
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
