import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class TypeORMClientManager implements OnModuleDestroy {
  // the client instances cache object
  private clients: { [key: string]: DataSource } = {};

  getTenantId(request: Request): string {
      return  (request.query.q).toString()
  }

  async getClient(request: Request): Promise<DataSource> {
    const tenantId = this.getTenantId(request);
    let client = this.clients[tenantId];

    // create and cache a new client when needed
    if (!client) {
    //   const databaseUrl = process.env.DATABASE_URL!.replace('public', tenantId);

    if( tenantId === '1')
    {
      client = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'abc',
        database: 'postgres',
        entities: ['**/*.entity.js'],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        synchronize: true
      })
    }
    else{
      client = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'abc',
        database: 'db2',
        entities: ['**/*.entity.js'],
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        synchronize: true
      })
    }
      await client.initialize();
      this.clients[tenantId] = client;
    }
    return client;
  }

  async onModuleDestroy() {
    // wait for every cached instance to be disposed
    await Promise.all(
      Object.values(this.clients).map((client) => client.destroy()),
    );
  }
}
