export const findPluSchema = {
  $id: 'schema:products:find:plu',
  type: 'object',
  additionalProperties: false,
  required: ['plu'],
  properties: {
    plu: {
      type: 'string'
    }
  }
}
