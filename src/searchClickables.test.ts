import { tagNameGenerator } from "./searchClickables";

it.each([
  [0, "a"],
  [1, "b"],
  [2, "c"],
  [25, "z"],
  [26, "ba"],
  [27, "bb"],
  [51, "bz"],
  [52, "ca"],
])("tagNameGenerator(%p) == %p", (n: number, expected: string) => {
  expect(tagNameGenerator(n)).toBe(expected);
});
