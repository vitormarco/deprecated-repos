import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAppointmentIdToAppointmentsUsers1612475397710
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments_users',
      new TableColumn({
        name: 'appointment_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments_users',
      new TableForeignKey({
        name: 'AppointmentIdAppointmsUsers',
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments_users',
      'AppointmentIdAppointmsUsers',
    );

    await queryRunner.dropColumn('appointments_users', 'appointment_id');
  }
}
