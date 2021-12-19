import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany } from "typeorm";
import { BaseET } from "../type/base";
import { Movie } from "./Movie";

@ObjectType()
@Entity()
export class Rap extends BaseET {
  @Field()
  @Column()
  cinema: string;

  @Field()
  @Column()
  address: string;

  @ManyToMany(() => Movie, (movie) => movie.rap)
  movie: Promise<Movie[]>;
}
