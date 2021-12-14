import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
 class MovieBody {

  @Field()
 public  film: string;

  @Field()
  public derciption: string;

  @Field()
  public cinema: string;

  @Field()
  public address: string;
}


export class MB extends MovieBody{}