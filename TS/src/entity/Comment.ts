import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, } from "typeorm";
import { BaseET } from "./../type/base";
import { User } from "./User";

@ObjectType()
@Entity()
export class Comment extends BaseET {
  @Field()
  @Column({ length: 255 })
  comments: string;

  @ManyToOne(() => User,user => user.comment) 
  users: number;
}
