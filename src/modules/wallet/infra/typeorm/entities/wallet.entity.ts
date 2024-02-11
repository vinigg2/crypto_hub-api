import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { WalletConfig } from './wallet-config.entity';
import { Profile } from '@src/modules/profile/infra/typeorm/entities/profile.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'wallet' })
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => WalletConfig, (wallet) => wallet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'wallet_config' })
  wallet_config: WalletConfig;

  @OneToOne(() => Profile, (profile) => profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile' })
  @Exclude()
  profile: Profile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;

  constructor() {
    this.id ||= uuid();
  }
}
