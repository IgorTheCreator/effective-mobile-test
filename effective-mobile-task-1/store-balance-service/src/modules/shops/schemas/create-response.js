export const createResponseSchema = {
  $id: 'schema:shops:create:response',
  type: 'object',
  properties: {
    shop: {
      type: 'object',
      properties: {
        id: {
          type: 'integer'
        },
        title: {
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
