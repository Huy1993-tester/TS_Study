import { Field, ObjectType } from "type-graphql";
import { Entity, Column, OneToMany} from "typeorm";
import { Base } from "../type/base";
import { Like } from "./Like";
import { Comment } from "./Comment";
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

  @OneToMany(() => Comment, (comment) => comment.users)
  comment: Comment;

  @OneToMany(() => Like, (like) => like.user)
  like: Like;
}
