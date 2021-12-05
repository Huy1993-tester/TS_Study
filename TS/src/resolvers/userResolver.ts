import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { Encoding, VerifyEncoding } from "./../middlewares/encoding";
import { CreateToken } from "./../middlewares/auth";
import { Messages } from "../messages/mess";
@Resolver()
export class UserResolver {
  @Query(() => User)
  helloUser() {
    return "Hello All Guys";
  }

  @Mutation(() => User, { nullable: false })
  async createUser(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | string> {
    try {
      const exists = await User.findOne({ email });
      if (exists) throw new Error("User tồn tại");
      else {
        const encoding = await new Encoding(password);
        const hash = await encoding.encoding();
        const newUser = User.create({
          username,
          email,
          password: hash,
        });
        return User.save(newUser);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => String, { nullable: false })
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String> {
    try {
      const findUser: any = await User.findOne({ where: { email } });
      if (findUser !== undefined) {
        const verifyEncoding = await new VerifyEncoding(
          password,
          findUser.password
        );
        const isCheck: boolean = await verifyEncoding.verifyEncoding();
        if (isCheck == true) {
          const auth = await new CreateToken(findUser.email, findUser.id);
          const token = await auth.token().then((t) => {
            return t;
          });
          return token;
        } else {
          throw new Error("Pass not matching!");
        }
      } else {
        throw new Error("Email not matching!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => User, { nullable: false })
  async updateUser(
    @Arg("id") id: number,
    @Arg("username") username: string,
    @Arg("email") email: string
  ): Promise<User> {
    try {
      const findUser = await User.findOne({ where: { id } });
      if (findUser !== undefined) {
        findUser.username = username;
        findUser.email = email;
        await User.save(findUser);
        return findUser;
      } else {
        throw new Error("User not exits!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => String, { nullable: false })
  async removeUser(@Arg("id") id: number): Promise<string> {
    try {
      const findUser = await User.findOne({ where: { id } });
      if (findUser !== undefined) {
        await User.remove(findUser);
        const mess = await new Messages("User delete successfuly!");
        return mess.showMess();
      } else {
        throw new Error("User not exits!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
