export const createBodySchema = {
  $id: 'schema:products:create:body',
  type: 'object',
  additionalProperties: false,
  required: ['plu', 'name'],
  properties: {
    plu: {
      type: 'string',
      nullable: false,
      minLength: 1
    },
    name: {
      type: 'string',
      nullable: false,
      minLength: 1
    }
  }
}
