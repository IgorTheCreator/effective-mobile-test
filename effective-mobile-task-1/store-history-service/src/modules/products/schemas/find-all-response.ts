export const findAllResponseSchema = {
  $id: 'schema:products-history:find-all:response',
  type: 'object',
  properties: {
    notes: {
      type: 'array',
      items: {
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
}
