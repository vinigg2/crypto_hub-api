import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';
import { Brokerage } from '@src/modules/brokerage/infra/typeorm/entities/brokerage.entity';

@Entity({ name: 'wallet_config' })
export class WalletConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  available_value: number;

  @Column()
  quantity: number;

  @Column()
  active: boolean;

  @Column()
  lever: number;

  @Column()
  apiKey: string;

  @Column()
  apiSecret: string;

  @OneToOne(() => Brokerage, (broker) => broker, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'broker' })
  brokerage: Brokerage;

  @OneToOne(() => Profile, (profile) => profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile' })
  profile: Profile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;

  constructor() {
    this.id ||= uuid();
  }
}
