import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from './Base.model';
import { Role } from 'src/enum/userEnum';
import { Product } from './Product';

@Entity({ name: 'user' })
export class User extends BaseModel {
  @OneToMany(() => Product, (product) => product.user)
  product: [Product];

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: string;
}
