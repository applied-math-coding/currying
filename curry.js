function curry(fn, n) {
  n = n ?? fn.length;
  if (n === 1) {
    return fn;
  } else {
    return x => curry((...y) => fn(x, ...y), n - 1);
  }
}

const f = (a, b, c) => a + b + c;
const f_c = curry(f);
console.log(f_c(1)('')(3));
console.log(f(1, '', 3));

// x => (y=> (z => f(x,y,z)))