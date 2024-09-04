export const findResponseSchema = {
  $id: 'schema:products:find:response',
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
