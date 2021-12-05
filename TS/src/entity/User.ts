import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
} from "typeorm";

import { Base } from "../type/base";

@ObjectType()
@Entity()
export class User extends Base {
  @Field()
  @Column({ length: 20 })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ default: "CLIENT" })
  role!: string;
}
