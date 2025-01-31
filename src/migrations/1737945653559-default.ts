import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1737945653559 implements MigrationInterface {
    name = 'Default1737945653559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cria a tabela de usuários com ID UUID
        await queryRunner.query(`CREATE TABLE \`users\` (
            \`id\` varchar(36) NOT NULL PRIMARY KEY, 
            \`email\` text NOT NULL, 
            \`firstName\` text NOT NULL, 
            \`lastName\` text NOT NULL, 
            \`password\` text NOT NULL
        ) ENGINE=InnoDB`);

        await queryRunner.query(`CREATE TABLE \`products\` (
            \`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            \`name\` varchar(255) NOT NULL, 
            \`description\` varchar(255) NOT NULL, 
            \`price\` int NOT NULL, 
            \`image\` blob NULL, 
            \`user_id\` varchar(36) NULL,
            FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        ) ENGINE=InnoDB`);

        

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_176b502c5ebd6e72cafbd9d6f70\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}