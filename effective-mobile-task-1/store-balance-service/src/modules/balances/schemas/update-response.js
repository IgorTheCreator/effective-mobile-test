export const updateResponseSchema = {
  $id: 'schema:balances:update:response',
  type: 'object',
  properties: {
    balance: {
      type: 'object',
      properties: {
        shelfQuantity: {
          type: 'integer'
        },
        orderQuantity: {
          type: 'integer'
        },
        plu: {
          type: 'string'
        },
        shopId: {
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
