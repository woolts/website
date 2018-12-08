# Core – A Standard Library

There is much debate over whether languages should have a standard library, but with [lodash](#) being the most downloaded package on npm it seems, for javascript, that question has been answered with an emphatic yes.

Wool provides a standard library as its `wool/core` package. This is installed by default for projects created with `wool init`, but can be added as normal with:

```
wool add wool/core
```

Given Wool's functional ethos, this package exposes many functions designed to be used in a functional style.


## API

Read the [API docs](#) for a comprehensive look at all the functions. A brief overview of each of the concepts are below.


## Basics

```ts
import { compose, not, partial } from 'wool/core';
```

```ts
const isEven = (a: number) => a % 2 === 0;

const sqrtIsOdd = compose(Math.sqrt, isEven, not);

sqrtIsOdd(9);
// true
```

```ts
const multiply = (a, b) => a * b;
const double = partial(multiply, 2);

double(3);
// 6
```

> **Note:** Once typescript supports currying, all `wool/core` functions will be curried by default and the `partial()` function will be obsolete.


## List

A `List` is an array of values of the same type.

```ts
import { List } from 'wool/core';

const numbers: List<number> = [1, 2, 3];
```



## Maybe

Perhaps the most common runtime bug in javascript is `undefined is not an object`. The `Maybe` provides a clean way to protect against this.

A `Maybe<A>` is a type that can have a value of `Just<A>` or `Nothing`, it lets us represent values that may or may not exist.

```ts
import { Maybe } from 'wool/core';

interface User {
  name: string;
  age: Maybe<number>;
}

const tom = { name: "Tom", age: Maybe.just(42) };
const sue = { name: "Sue", age: Maybe.nothing() };
```

We could just use an optional prop on our interface, e.g. `age?: number`, but using a maybe lets us perform operations safely on the value.

```ts
const birthday = (user: User) => ({
  ...user,
  age: Maybe.map((age) => age + 1, user.age),
});
```

If we want to start applying multiple operations to the value, this saves us from having to keep checking for `null` values.

> TODO `Maybe.andThen()`


## Dict

A dictionary is a mapping of unique keys to values.

For example, we can create a dict of users with the type `Dict<string, User>`:

```ts
import { Dict } from 'wool/core';

interface User {
  name: string;
  age: Maybe<number>;
}

let users: Dict<string, User> = Dict.fromList([
  ['tom', { name: 'Tom', age: Maybe.just(42) } ],
  ['sue', { name: 'Sue', age: Maybe.nothing() } ],
]);
```

We can then look up the users by their associated username:

```ts
const maybeTom: Maybe<User> = Dict.get('tom', users);
```

Or update them:

```ts
users = Dict.update('tom', partial(Maybe.map, birthday), users);
```

It's worth noting, this is where the `Maybe` type really begins to shine. Since the user identified by `'tom'` may not exist, we would normally have to start filling our functions with `if` statements.

But here we can re-use our same `birthday(user: User): User` function and map our `Maybe<User>` onto it through `Maybe.map()`.

```ts
users = Dict.map((id, user) => birthday(user), users);
```


## Tuple

A tuple is way to represent two associated values. We've already seen tuples being used above, when creating a `Dict` with `Dict.fromList()`.

We can create tuples with `Tuple.pair()`.

```ts
import { Tuple } from 'wool/core';

type Position = Tuple<number, number>;

const pos: Position = Tuple.pair(3, 4);
// [3, 4]
```

```ts
const moveX = (amount, tuple) => Tuple.mapFirst(
  x => x + amount,
  tuple
);

moveX(2, pos);
// [5, 4]
```

```ts
const zip = <A, B>(xs: List<A>, ys: List<B>): List<A, B> =>
  List.map2(Tuple.pair, xs, ys);

zip(['a', 'b', 'c'], [1, 2, 3]);
// [['a', 1], ['b', 2], ['c', 3]]
```
