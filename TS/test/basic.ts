import movieResolver from "../src/resolvers/movieResolver";

export async function findMax() {
  const a = await movieResolver.findMovieRap();
  return a;
}
