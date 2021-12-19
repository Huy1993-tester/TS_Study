import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { getConnection, getManager, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Authorticator, CreateToken } from "./../middlewares/auth";
import { Messages } from "../messages/mess";
import { CreateUserBody, SignInResponse } from "../type/user";
import { Encoding, VerifyEncoding } from "../middlewares/encoding";
import { UpdateUserBody } from "./../type/user";
import { Like } from "../entity/Like";
// import { Movie } from "../entity/Movie";

@Resolver()
export class UserResolver {
  @Query(() => User)
  public async findUser(@Arg("userId") userId: number): Promise<User> {
    const a: any = await getRepository(User)
      .createQueryBuilder("user")
      .select("user")
      .where("user.id = :id", { id: userId })
      .getOne();
    return a;
  }

  @Query(() => String)
  public async findUsernameHaveLikeByTrue(
    @Arg("isLike") isLike: boolean,
    @Arg("username") username: string
  ): Promise<String> {
    const repository = getRepository(Like);
    const a = repository.find({
      join: { alias: "like", innerJoin: { user: "like.user" } },
      where: {
        like: isLike,
        user: {
          username: username,
        },
      },
    });

    console.log(a.then((r) => console.log(r)));

    return "OK";
  }

  @Query(() => String)
  public async findUserAndCommentAndLike(
    @Arg("like") like:boolean,
    @Arg("userId") userId:number
  ):Promise<String>{
    const a = await getConnection()
      .createQueryBuilder(User, "user")
      .leftJoinAndSelect("user.like", "like")
      .leftJoinAndSelect("user.comment","comment")
      .where('like.like=:like',{like})
      .andWhere('user.id =:userId',{userId})
      .getMany();
    console.log(a);
    return "Ok"
  }

  @Mutation(() => User)
  public async createUser(
    @Args() createUserBody: CreateUserBody,
    @Arg("token") token: string
  ): Promise<User | string> {
    const { username, email, password, role } = createUserBody;
    try {
      const promise = await new Authorticator(token);
      const user = await promise.verifyAuthorCreateUser().then((t) => {
        return t;
      });
      console.log(user);
      const isCheck = await promise.verifyAuthenticator().then((t) => {
        return t;
      });
      if (isCheck) {
        const repository = getRepository(User);
        const exists = await repository.findOne({ email });
        if (exists) throw new Error("User tồn tại");
        else {
          const encoding = await new Encoding(password);
          const hash = await encoding.encoding();
          const newUser = new User();
          newUser.username = username;
          newUser.email = email;
          newUser.password = hash;
          newUser.role = role;
          return repository.save(newUser);
        }
      } else {
        throw new Error("User not authortion create user!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => User)
  public async createAdmin(
    @Args() createUserBody: CreateUserBody
  ): Promise<User | string> {
    const { username, email, password, role } = createUserBody;
    try {
      const repository = getRepository(User);
      const exists = await repository.findOne({ email });
      if (exists) throw new Error("User tồn tại");
      else {
        const encoding = await new Encoding(password);
        const hash = await encoding.encoding();
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = hash;
        newUser.role = role;
        return repository.save(newUser);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => SignInResponse)
  public async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<SignInResponse> {
    try {
      const repository = getRepository(User);
      const findUser: any = await repository.findOne({ email });
      if (findUser !== undefined) {
        const verifyEncoding = await new VerifyEncoding(
          password,
          findUser.password
        );
        const isCheck: boolean = await verifyEncoding.verifyEncoding();
        if (isCheck) {
          const auth = new CreateToken(
            findUser.email,
            findUser.id,
            findUser.role
          );
          const token = await auth.token().then((t) => {
            return t;
          });
          console.log(token);
          return { token };
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
  public async updateUser(@Args() updateBody: UpdateUserBody): Promise<User> {
    const { id, username, email } = updateBody;
    try {
      const manager = getManager();
      const findUser = await manager.findOne(User, id);
      if (findUser) {
        findUser.username = username;
        findUser.email = email;
        await manager.save(User, findUser);
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
      const findUser = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.id = :id", { id })
        .getOne();
      console.log(findUser);

      if (findUser !== undefined) {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(User, "user")
          .where("user.id = :id", { id })
          .execute();
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
