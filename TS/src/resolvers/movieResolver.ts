import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from 'typeorm';
import { Movie } from "./../entity/Movie";

@Resolver()
export class MovieResolver {
  @Query(() => String)
  public async findMovieRap(): Promise<String> {
    const connect = getRepository(Movie);
    const a: any = await connect.query(
      "SELECT m.film , m.derciption , r.cinema,r.address FROM movie_cine_rap as mr JOIN movie as m on mr.movieId = m.id JOIN rap as r on mr.rapId = r.id"
    );
    console.log(a[0]);
    return "OK";
  }
  @Mutation(() => Movie)
  public async createMovie(
    @Arg("film") film: string,
    @Arg("derciption") derciption: string
  ): Promise<Movie> {
    try {
      const movie = new Movie();
      movie.film = film;
      movie.derciption = derciption;
      return getRepository(Movie).save(movie);
    } catch (error) {
      throw new Error(error);
    }
  }
}

const movieResolver = new MovieResolver();

export default movieResolver;