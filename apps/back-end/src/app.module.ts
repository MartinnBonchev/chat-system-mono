import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from './identity/identity.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { ScreenShareModule } from './screen-share/screen-share.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    IdentityModule,
    ChatRoomModule,
    ScreenShareModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
