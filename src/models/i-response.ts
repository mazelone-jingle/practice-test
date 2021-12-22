export interface IResponse<TResult> {
  code: string;
  message: string;
  result: TResult;
}
