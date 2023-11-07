import { MigrationInterface, QueryRunner } from 'typeorm';

export class Advantage1699370703543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "advantage" (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255),
        description varchar(255),
        value integer
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "advantage_user" (
        advantage_id UUID,
        user_id UUID,
        FOREIGN KEY (advantage_id) REFERENCES "advantage" (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS "advantage_user"');
    await queryRunner.query('DROP TABLE IF EXISTS "advantage"');
  }
}
