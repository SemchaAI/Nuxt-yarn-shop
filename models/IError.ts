export interface IError {
  message: string
  critical: boolean
  id: number
}

export interface IErrors {
  errors: IError[]
}
export type TError = Omit<IError, 'id'>
