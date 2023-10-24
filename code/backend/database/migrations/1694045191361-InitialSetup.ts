import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup1694045191361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `  CREATE TABLE IF NOT EXISTS "user" (
                    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                    name varchar(255) NOT NULL,
                    password varchar(255) NOT NULL,
                    email varchar(255) NOT NULL UNIQUE,
                    role varchar(255) NOT NULL,
                    cpf_cnpj varchar(11) NOT NULL,
                    address varchar(255),
                    course varchar(255),
                    university varchar(255),
                    coins INTEGER DEFAULT 0
                );
                  `,
    );

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "transfer" (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        student_id UUID,
        teacher_id UUID,
        value integer DEFAULT 0,
        FOREIGN KEY (student_id) REFERENCES "user" (id),
        FOREIGN KEY (teacher_id) REFERENCES "user" (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS user');
    await queryRunner.query('DROP TABLE IF EXISTS transfer');
  }
}
