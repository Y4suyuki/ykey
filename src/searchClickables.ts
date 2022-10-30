const tagClassName = "xxxx";

// TODO: make it a real generator (it should be simpler)
// TODO: align radix for all tagNames
export function* gen(l: number) {
  const alphabets = "abcdefghijklmnopqrstuvwxyz";
  const base = alphabets.length;

  let radix = 1;
  while (l >= Math.pow(base, radix)) {
    radix++;
  }
  let res: string[] = [];
  for (let r = radix; r > 0; r--) {
    res.push("a");
  }
  for (let i = 0; i < l; i++) {
    let tmp = i;
    for (let r = radix; r > 0; r--) {
      const k = Math.floor(tmp / Math.pow(base, r - 1));
      const _res = alphabets[k];
      console.log(`i = ${i}; r = ${r}; res = ${_res}`);
      res[res.length - 1 - (r - 1)] = _res;
      tmp = tmp - k * Math.pow(base, r - 1);
    }
    yield res.join("");
  }
}

export const searchAndTagClickables = () => {
  console.log("searchAndTabClickables");

  // add tooltips for all clickable element
  const clickables = document.querySelectorAll("a,button");
  const x = gen(clickables.length);

  console.log(`%cclickables: `, "color: green;");
  console.log(clickables);
  clickables.forEach((c, i) => {
    const tag = document.createElement("span");
    const tagName = x.next().value;
    tag.textContent = tagName ? tagName : "wat???";
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

  const clickables = document.querySelectorAll(`a,button`);
  clickables.forEach((c) => {
    const tag = c.querySelector(`span.${tagClassName}`);
    tag.remove();
  });
};
