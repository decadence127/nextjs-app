import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(9119, { namespace: 'chat' })
export class ChatGateway {}
