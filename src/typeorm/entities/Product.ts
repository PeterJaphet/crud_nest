import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './Base.model';
import { User } from './User';

@Entity({ name: 'product' })
export class Product extends BaseModel {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.product)
  user: User;
}
