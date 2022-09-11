import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ModifyPaidForNullableTrue1612566397607
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments_users',
      'paid',
      new TableColumn({
        name: 'paid',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments_users',
      'paid',
      new TableColumn({
        name: 'paid',
        type: 'decimal',
        precision: 10,
        scale: 2,
      }),
    );
  }
}
