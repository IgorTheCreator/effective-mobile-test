export const findAllQuerySchema = {
  $id: 'schema:balances-history:find-all:query',
  type: 'object',
  properties: {
    shop_id: {
      type: 'integer'
    },
    plu: {
      type: 'string'
    },
    action: {
      type: 'string'
    },
    from_date: {
      type: 'string',
      format: 'date-time'
    },
    to_date: {
      type: 'string',
      format: 'date-time'
    },
    page: {
      type: 'number',
      minimum: 1,
      default: 1
    },
    limit: {
      type: 'number',
      default: 10
    }
  }
}
