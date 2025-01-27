import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Product } from "./Product"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}

