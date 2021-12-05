import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";

import { User } from "../entity/User";
import { CreateToken } from "./../middlewares/auth";
import { Messages } from "../messages/mess";
import { CreateUserBody, SignInResponse, UpdateUserBody, } from "../type/user";
import { Encoding, VerifyEncoding } from "../middlewares/encoding";
@Resolver()
export class UserResolver {
  @Query()
  helloUser(): string {
    return "Hello All Guys";
  }

  @Mutation(() => User)
  public async createUser(
    @Args() createUserBody: CreateUserBody
  ): Promise<User | string> {
    const { username, email, password } = createUserBody
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

  @Mutation(()=>SignInResponse)
  public async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<SignInResponse> {
    try {
      const findUser: any = await User.findOne({ where: { email } });
      if (findUser !== undefined) {
        const verifyEncoding = new VerifyEncoding(
          password,
          findUser.password
        );
        const isCheck: boolean = await verifyEncoding.verifyEncoding();
        if (isCheck) {
          const auth = new CreateToken(findUser.email, findUser.id);
          const token = await auth.token().then((t) => {
            return t;
          });
          return {token};
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

  @Mutation(() => User)
  public async updateUser(
    @Args() updateBody: UpdateUserBody
  ): Promise<User> {
    const { id, username, email } = updateBody
    try {
      const findUser = await User.findOne({ where: { id } });
      if (findUser) {
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

  @Mutation(() => String)
  public async removeUser(@Arg("id") id: number): Promise<string> {
    try {
      const findUser = await User.findOne({ where: { id } });
      if (findUser !== undefined) {
        await User.remove(findUser);
        const mess = new Messages("User delete successfuly!");
        return mess.showMess();
      } else {
        throw new Error("User not exits!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
