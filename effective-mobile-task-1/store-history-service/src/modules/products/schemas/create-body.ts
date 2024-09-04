export const createBodySchema = {
  $id: 'schema:products-history:create:body',
  type: 'object',
  additionalProperties: false,
  required: ['plu', 'date', 'action'],
  properties: {
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
