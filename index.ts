type Rest<A extends Array<any>> = A extends [any, ...infer R] ? R : never;
type Func<X, R extends Array<any>, V> = (...args: [X, ...R]) => V;
type Curry<F> = F extends Func<infer X, infer R, infer V> ?
  (R extends [] ? F : (x: X) => Curry<(...r: R) => V>)
  : never;

function curry<X, R extends Array<any>, V>(fn: Func<X, R, V>, n: number = fn.length)
  : Curry<typeof fn> {
  if (n === 1) {
    return fn as unknown as Curry<typeof fn>;
  } else {
    return ((x: X) => curry<R[0], Rest<R>, V>(
      (...r: [R[0], ...Rest<R>]) => fn(x, ...(r as unknown as R)), n - 1)
    ) as unknown as Curry<typeof fn>;
  }
}

const f = (a: number, b: string, c: number) => a + b + c;
const f_c = curry(f, 3);
console.log(f_c(3)('')(4))


