export const findAllResponseSchema = {
  $id: 'schema:products:find-all:response',
  type: 'object',
  properties: {
    products: {
      type: 'array',
      items: {
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
}
