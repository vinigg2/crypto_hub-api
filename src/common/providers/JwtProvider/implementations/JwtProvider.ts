import { JwtService } from '@nestjs/jwt';
import IJwtProvider from '../models/IJwtProvider';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class JwtProvider implements IJwtProvider {
  constructor(private jwtService: JwtService) {}

  public async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  public async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
