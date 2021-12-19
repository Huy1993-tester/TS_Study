import { findMax } from "./basic";

test("findMax", () => {
  const ex = async () =>
    await findMax().then((r) => {
      return r;
    });

  expect(ex()).toBe("OK");
});

// describe("findMax", () => {
//   it("findMovieRap", async () => {
//     expect(findMax()).toEqual("OK");
//   });
// });
