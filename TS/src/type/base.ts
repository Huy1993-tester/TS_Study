import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from "typeorm";

@ObjectType()
@Entity()
export class Base {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createDate: Date;

  @Field()
  @UpdateDateColumn()
  updateDate: Date;
}

@ObjectType()
@Entity()
export class BaseET extends BaseEntity{
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn()
  createDate: Date;

  @Field()
  @UpdateDateColumn()
  updateDate: Date;
}
