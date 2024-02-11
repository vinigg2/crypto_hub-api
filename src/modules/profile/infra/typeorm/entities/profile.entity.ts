import { v4 as uuid } from 'uuid';
import { GenderProfileDTO } from '@src/modules/profile/dtos/create-profile.dto';
import { User } from '@src/modules/users/infra/typeorm/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({
    type: 'enum',
    enum: GenderProfileDTO,
  })
  gender: GenderProfileDTO;

  @Column()
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => User, (user) => user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;

  constructor() {
    this.id ||= uuid();
  }
}
