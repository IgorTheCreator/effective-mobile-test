export const findAllQuerySchema = {
  $id: 'schema:balances:find-all:query',
  type: 'object',
  properties: {
    plu: {
      type: 'string'
    },
    shop_id: {
      type: 'number'
    },
    shelf_min: {
      type: 'number'
    },
    shelf_max: {
      type: 'number'
    },
    order_min: {
      type: 'number'
    },
    oreder_max: {
      type: 'number'
    }
  }
}
