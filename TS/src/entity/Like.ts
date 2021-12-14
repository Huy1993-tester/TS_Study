import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseET } from "./../type/base";
import { User } from "./User";

@ObjectType()
@Entity()
export class Like extends BaseET {
  @Field()
  @Column()
  like: boolean;

  @ManyToOne(() => User,user => user.like)
  user: number;
}
