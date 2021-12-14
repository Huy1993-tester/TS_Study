import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseET } from "./../type/base";
import { Rap } from "./Rap";

@ObjectType()
@Entity()
export class Movie extends BaseET {
  @Field()
  @Column({ unique: true })
  film: string;

  @Field()
  @Column({ length: 255 })
  derciption: string;

  @ManyToMany(() => Rap, { nullable: true })
  @JoinTable()
  cine: Rap[];
}
