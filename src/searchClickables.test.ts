import { gen } from "./searchClickables";

it("gen", () => {
  let x = gen(3);

  expect(x.next().value).toBe("a");
  expect(x.next().value).toBe("b");

  x = gen(26);
  expect(x.next().value).toBe("aa");
  expect(x.next().value).toBe("ab");
  expect(x.next().value).toBe("ac");

  x = gen(52);
  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  for (let y of alphabets) {
    expect(x.next().value).toBe(`a${y}`);
  }

  for (let y of alphabets) {
    expect(x.next().value).toBe(`b${y}`);
  }
});
