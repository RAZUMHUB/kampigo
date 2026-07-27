import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({
  namespace: '/rides/chat',
  cors: {
    origin: '*',
  },
})
export class RidesChatGateway {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('joinChat')
  async joinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() rideId: string,
  ) {
    client.join(rideId);

    const history =
      await this.prisma.rideMessage.findMany({
        where: {
          rideId,
        },
        include: {
          sender: {
            select: {
              id: true,
              displayName: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: 50,
      });

    client.emit('chatHistory', history);

    return {
      joined: rideId,
    };
  }

  @SubscribeMessage('message')
  async sendMessage(
    @MessageBody()
    payload: {
      rideId: string;
      senderId: string;
      message: string;
    },
  ) {
    const saved =
      await this.prisma.rideMessage.create({
        data: {
          rideId: payload.rideId,
          senderId: payload.senderId,
          message: payload.message,
        },
        include: {
          sender: {
            select: {
              id: true,
              displayName: true,
            },
          },
        },
      });

    this.server
      .to(payload.rideId)
      .emit('message', saved);

    return saved;
  }
}
