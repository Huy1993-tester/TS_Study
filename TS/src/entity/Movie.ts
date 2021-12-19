import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Base } from "./../type/base";
import { Rap } from "./Rap";

@ObjectType()
@Entity()
export class Movie  extends Base{
  @Field()
  @Column({ unique: true })
  film: string;

  @Field()
  @Column({ length: 255 })
  derciption: string;

  @ManyToMany(() => Rap, rap => rap.movie)
  @JoinTable()
  rap:Promise<Rap[]>;
}
