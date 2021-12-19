import { Arg } from "type-graphql";
import { Mutation } from "type-graphql";
import { Resolver } from "type-graphql";
import { Like } from "./../entity/Like";

@Resolver()
export class LikeResolver {
  @Mutation(() => Like)
  public async createLike(
    @Arg("like") like: boolean,
    @Arg("user") user: number
  ) {
    const click = new Like();
    click.like = like;
    click.user = user;
    await Like.save(click);
  }
}
