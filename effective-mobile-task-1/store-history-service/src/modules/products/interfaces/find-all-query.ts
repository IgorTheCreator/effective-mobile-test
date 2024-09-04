export interface IFindAllQuery {
  plu?: string
  action?: string
  from_date?: Date
  to_date?: Date
  page: number
  limit: number
}
