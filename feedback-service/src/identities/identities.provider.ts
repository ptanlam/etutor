import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { identitiesServiceToken } from './constants';

export const identitiesProvider = [
  {
    provide: identitiesServiceToken,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return ClientProxyFactory.create({
        transport: Transport.GRPC,
        options: {
          package: 'identities',
          protoPath: join(__dirname, 'identities.proto'),
          url: configService.get('IDENTITIES_SERVICE'),
        },
      });
    },
  },
];
