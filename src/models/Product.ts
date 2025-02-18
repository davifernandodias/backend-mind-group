import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column("blob", { nullable: true }) 
  image: Buffer;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: "user_id" })
  user: User;
}
