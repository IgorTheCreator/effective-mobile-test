export const createBodySchema = {
  $id: 'schema:balances-history:create:body',
  type: 'object',
  additionalProperties: false,
  required: ['shopId', 'plu', 'date', 'action'],
  properties: {
    shopId: {
      type: 'integer'
    },
    plu: {
      type: 'string',
      nullable: false
    },
    date: {
      type: 'string',
      format: 'date-time',
      nullable: false
    },
    action: {
      type: 'string',
      nullable: false
    }
  }
}
