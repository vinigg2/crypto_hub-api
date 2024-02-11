export default interface IJwtProvider {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
}
