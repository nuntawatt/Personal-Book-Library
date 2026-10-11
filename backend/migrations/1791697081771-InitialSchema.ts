import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791697081771 implements MigrationInterface {
    name = 'InitialSchema1791697081771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorys" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "categorys" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "authors" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "authors" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "categorys" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categorys" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "authors" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "authors" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "books" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "books" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "authors" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "authors" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "categorys" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categorys" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "books" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "authors" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "authors" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categorys" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categorys" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
