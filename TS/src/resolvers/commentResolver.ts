import { CreateCommentBody } from "../type/user";
import { Resolver, Mutation, Args } from "type-graphql";
import { Comment } from "../entity/Comment";

@Resolver()
export class CommentResolver {
  @Mutation(() => Comment)
  public async CreateComment(@Args() createCommentBody: CreateCommentBody) {
    try {
      const { comments, userID } = createCommentBody;      
      if (userID) {
        const cmt = new Comment();
        cmt.comments = comments;
        cmt.users = userID;
        Comment.save(cmt);
        return cmt;
      } else {
        throw new Error("User not exists!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
