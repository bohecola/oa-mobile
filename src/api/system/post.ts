export interface PostVO extends BaseEntity {
  postId: number | string
  postCode: string
  postName: string
  postSort: number
  status: string
  remark: string
}
