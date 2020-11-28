import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated, OneToOne, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
@Entity('users_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  // @OneToOne(() => User)
  // @JoinColumn({ name: 'user_id' })
  // provider: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default UserToken;

//KISS - keep it simple & stupid
