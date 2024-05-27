import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private jwtService: JwtService) {}

  handleConnection(client: Socket, ...args: any[]) {
    // A lógica de conexão pode ser adicionada aqui, se necessário
  }

  handleDisconnect(client: Socket) {
    // A lógica de desconexão pode ser adicionada aqui, se necessário
  }

  @SubscribeMessage('authenticate')
  async handleAuthenticate(
    @MessageBody() token: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      this.jwtService.verify(token);
      client.join('authenticated');
    } catch (error) {
      console.error('Erro na autenticação WebSocket:', error);
    }
  }

  sendToAll(payload: { message: string; data?: any }) {
    const message = payload.message;
    const data = payload.data;
    this.server.emit(message, data);
  }

  sendToUser(payload: { to: string; message: string; data?: any }) {
    const to = payload.to;
    const message = payload.message;
    const data = payload.data;
    this.server.to(to).emit(message, data);
  }
  afterInit() {
    console.log('Gateway initialized');
  }
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() payload: { to?: string; message: string; data?: any },
    @ConnectedSocket() client: Socket,
  ) {
    const to = payload.to || 'authenticated';
    const message = payload.message;
    const data = payload.data;

    client.to(to).emit('newMessage', { message, data });
  }
}
