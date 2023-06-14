import { MigrationInterface, QueryRunner } from "typeorm";

export class Book1686659728523 implements MigrationInterface {
    name = 'Book1686659728523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "book_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "writer" character varying NOT NULL, "image" character varying NOT NULL, "price" integer NOT NULL, "tags" character varying array NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sessions_through_enum" AS ENUM('EMAIL', 'GOOGLE')`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "through" "public"."sessions_through_enum" NOT NULL DEFAULT 'EMAIL'`);
        await queryRunner.query(`CREATE TYPE "public"."media_storage_type_enum" AS ENUM('LOCAL', 'S3')`);
        await queryRunner.query(`ALTER TABLE "media" ADD "storage_type" "public"."media_storage_type_enum" NOT NULL DEFAULT 'LOCAL'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "points" integer NOT NULL DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_720a656fd4fb901de360cbabe05" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_720a656fd4fb901de360cbabe05"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "points"`);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "storage_type"`);
        await queryRunner.query(`DROP TYPE "public"."media_storage_type_enum"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "through"`);
        await queryRunner.query(`DROP TYPE "public"."sessions_through_enum"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
