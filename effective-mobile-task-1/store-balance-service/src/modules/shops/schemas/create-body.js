export const createBodySchema = {
  $id: 'schema:shops:create:body',
  type: 'object',
  additionalProperties: false,
  required: ['title'],
  properties: {
    title: {
      type: 'string',
      nullable: false
    }
  }
}
