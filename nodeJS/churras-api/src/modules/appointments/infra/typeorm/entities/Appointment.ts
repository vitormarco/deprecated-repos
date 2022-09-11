import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import AppointmentUser from './AppointmentsUsers';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('timestamp with time zone')
  date: Date;

  @OneToMany(
    () => AppointmentUser,
    appointment_user => appointment_user.appointment,
    {
      cascade: true,
    },
  )
  appointment_users: AppointmentUser[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
