import { FactoryProvider, Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm'
import { Request as req } from 'express'
import { TypeORMClientManager } from './database.provider';

const typeormClientProvider: FactoryProvider<Promise<DataSource>> = {
  provide: DataSource,
  scope: Scope.REQUEST,
  inject: [REQUEST, TypeORMClientManager],
  useFactory: async (request: req, manager: TypeORMClientManager) => {
    return await manager.getClient(request)
  },
};

@Module({
  providers: [TypeORMClientManager, typeormClientProvider],
  exports: [DataSource],
})
export class DatabaseModule {


}
