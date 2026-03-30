export interface IJWTProvider {
  sign(payload: object, expiresIn?: string): string;
  verify(token: string): any;
}
