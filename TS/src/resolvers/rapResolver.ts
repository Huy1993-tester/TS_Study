import { Arg, Mutation, Resolver } from "type-graphql";
import { Rap } from "../entity/Rap";

@Resolver()
export class RapResolver {
  @Mutation(() => Rap)
  public async createRap(
    @Arg("cinema") cinema: string,
    @Arg("address") address: string
  ) {
    const rap = new Rap();
    rap.cinema = cinema;
    rap.address = address;
    await Rap.save(rap);
    return rap;
  }
}
