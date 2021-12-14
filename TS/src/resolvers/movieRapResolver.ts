import { Arg, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Movie } from "./../entity/Movie";
import { Rap } from "../entity/Rap";
import { User } from "../entity/User";

@Resolver()
export class MovieRapResolver {
  @Mutation(() => String)
  public async createMovieRap(
    @Arg("rapId") rapId: number,
    @Arg("movieId") movieId: number
  ): Promise<String> {
    try {
      const connect = getConnection();
      const a = await connect.transaction(
        async (transactionalEntityManager) => {
          const cine: any = await Rap.findOne({ id: rapId });
          const movie: any = await Movie.findOne({ id: movieId });
          movie.cine = [cine];
          movie.cine = [cine];

          const user = await new User();
          user.username = "Huy Dep Trai";
          user.email = "huy@gmail.com";
          user.password = "1234";
          user.role = "CLIENT";
          await transactionalEntityManager.save(movie);
          await transactionalEntityManager.save(user);

          return "OK";
        }
      );

      return a;
    } catch (error) {
      throw new Error(error);
    }
  }
}
