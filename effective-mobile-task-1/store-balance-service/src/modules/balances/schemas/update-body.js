export const updateBodySchema = {
  $id: 'schema:balances:update:body',
  type: 'object',
  additionalProperties: false,
  properties: {
    shelfQuantity: {
      type: 'integer',
      minimum: 0
    },
    orderQuantity: {
      type: 'integer',
      minimum: 0
    }
  }
}
