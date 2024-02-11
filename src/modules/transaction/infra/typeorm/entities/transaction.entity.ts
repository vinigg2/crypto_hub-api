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
import { Profile } from '@src/modules/profile/infra/typeorm/entities/profile.entity';
import { Wallet } from '@src/modules/wallet/infra/typeorm/entities/wallet.entity';
import { TypeTransaction } from '@src/modules/transaction/dtos/transaction.dtos';

@Entity({ name: 'transaction' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: TypeTransaction,
  })
  type: TypeTransaction;

  @Column()
  transaction_date: Date;

  @Column()
  earned_value: number;

  @Column()
  earned_quantity: number;

  @Column()
  status: string;

  @Column()
  order_id: string;

  @Column()
  client_order_id: string;

  @Column({ type: 'json' })
  request;

  @Column()
  count: number;

  @OneToOne(() => Profile, (profile) => profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile' })
  profile: Profile;

  @OneToOne(() => Wallet, (wallet) => wallet, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'wallet' })
  wallet: Wallet;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;

  constructor() {
    this.id ||= uuid();
  }
}
