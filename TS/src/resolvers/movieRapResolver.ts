import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Movie } from "./../entity/Movie";
import { Rap } from "../entity/Rap";
import { MovieBody } from "../type/movie";

@Resolver()
export class MovieRapResolver {
  @Query(() => String)
  public async findRelations(): Promise<String> {
    const repo = await getConnection()
      .createQueryBuilder(Movie, "movie")
      .leftJoinAndSelect("movie.rap", "rap")
      .getMany();
    console.log(repo[0].rap);
    // const repo = await getRepository(Movie);
    // const r = await repo.find({ relations: ["rap"] });
    // console.log(r);
    return "OK";
  }

  @Mutation(() => MovieBody)
  public async createMovieRap(
    @Arg("rapId") rapId: number,
    @Arg("movieId") movieId: number
  ): Promise<MovieBody> {
    try {
      const req = await getConnection().transaction(
        async (transactionalEntityManager) => {
          const cine: any = await Rap.findOne({ id: rapId });
          const movie: any = await getConnection()
            .createQueryBuilder(Movie, "movie")
            .select()
            .where({ id: movieId })
            .getOne();
          movie.rap = [cine];

          return await transactionalEntityManager.save(movie);
        }
      );
      console.log(req);

      return req;
    } catch (error) {
      throw new Error(error);
    }
  }
}
