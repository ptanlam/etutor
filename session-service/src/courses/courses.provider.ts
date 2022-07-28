import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { coursesServiceToken } from './constants';

export const coursesProvider = [
  {
    provide: coursesServiceToken,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return ClientProxyFactory.create({
        transport: Transport.GRPC,
        options: {
          package: 'courses',
          protoPath: join(__dirname, 'courses.proto'),
          url: configService.get('COURSES_SERVICE'),
        },
      });
    },
  },
];
