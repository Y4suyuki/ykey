const tagClassName = "xxxx";

// TODO: make it a real generator (it should be simpler)
export function tagNameGenerator(i: number) {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const base = alphabets.length;
  let radix = 1;
  while (i >= Math.pow(base, radix)) {
    radix++;
  }
  console.log(`%cradix is ${radix}`, "color: green;");
  console.log(`%ci is ${i}`, "color:green;");
  const res = [];
  let _i = i;
  for (let j = radix; j > 0; j--) {
    console.log(`[${i}]j is ${j}`);
    const _tmp = Math.floor(_i / Math.pow(base, j - 1));
    res.push(alphabets[_tmp]);
    _i = _i - _tmp * Math.pow(base, j - 1);
  }

  return res.join("");
}
export const searchAndTagClickables = () => {
  console.log("searchAndTabClickables");

  // add tooltips for all clickable element
  const clickables = document.querySelectorAll("a,button");
  clickables.forEach((c, i) => {
    const tag = document.createElement("span");
    const tagName = tagNameGenerator(i);
    tag.textContent = tagName;
    tag.className = `${tagClassName} ${tagName}`;
    tag.style.cssText =
      "color: red; font-size: 20px; position: absolute; background: yellow;";
    (c as HTMLElement).style.cssText =
      "posision: relative; display: inline-block;";
    c.appendChild(tag);
  });

  return true;
};

export const detachTags = () => {
  console.log("detachTags");

  const clickables = document.querySelectorAll(`a,button .${tagClassName}`);
  clickables.forEach((c) => {
    const tag = c.querySelector("span");
    tag.remove();
  });
};
