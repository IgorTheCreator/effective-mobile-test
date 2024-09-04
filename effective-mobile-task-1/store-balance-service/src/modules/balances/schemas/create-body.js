export const createBodySchema = {
  $id: 'schema:balances:create:body',
  type: 'object',
  additionalProperties: false,
  required: ['shelfQuantity', 'orderQuantity', 'shopId', 'plu'],
  properties: {
    shelfQuantity: {
      type: 'integer',
      minimum: 0
    },
    orderQuantity: {
      type: 'integer',
      minimum: 0
    },
    shopId: {
      type: 'integer'
    },
    plu: {
      type: 'string'
    }
  }
}
