import * as dotenv from 'dotenv';
import { User } from '../src/modules/user/entities';
import dataSource from '../ormconfig';
import { Book } from '../src/modules/book/entities/book.entity';
import { faker } from '@faker-js/faker';

dotenv.config();

void (async () => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.manager.insert(
    Book,
    Array.from(Array(100)).map(() => ({
      title: faker.lorem.words(),
      image: faker.image.food(),
      price: Math.round(Math.random() * 20),
      writer: faker.internet.userName(),
      tags: Array.from(Array(5)).map(() => faker.lorem.word()),
    })),
  );
  console.info('Books created');
  await queryRunner.release();

  process.exit();
})();
