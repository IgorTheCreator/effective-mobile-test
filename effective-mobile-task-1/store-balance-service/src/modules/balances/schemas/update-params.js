export const updateParamsSchema = {
  $id: 'schema:balances:update:params',
  type: 'object',
  required: ['shopId', 'plu'],
  properties: {
    shopId: {
      type: 'integer'
    },
    plu: {
      type: 'string'
    }
  }
}
