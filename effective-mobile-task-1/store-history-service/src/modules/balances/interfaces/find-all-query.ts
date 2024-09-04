export interface IFindAllQuery {
  shop_id?: number
  plu?: string
  action?: string
  from_date?: Date
  to_date?: Date
  page: number
  limit: number
}
