import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/rides/live',
  cors: {
    origin: '*',
  },
})
export class RidesGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('joinRide')
  handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() rideId: string,
  ) {
    client.join(rideId);
    return { joined: rideId };
  }

  @SubscribeMessage('driverLocation')
  handleDriverLocation(
    @MessageBody()
    payload: {
      rideId: string;
      latitude: number;
      longitude: number;
    },
  ) {
    this.server.to(payload.rideId).emit('location', payload);
  }
}
