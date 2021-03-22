export interface User {
  id: number
  username: string
  account: string
  password: string
  gender: '0' | '1'
  age: number
  habits: string | string[]
}