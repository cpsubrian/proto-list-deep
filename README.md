proto-list-deep
===============

An extension of isaacs' [proto-list](https://github.com/isaacs/proto-list) that
exposes a `deepSnapshot`. This returns a different result than `snapshot`.
Whereas `snapshot` is implicitly merging all keys at the top level due to the
prototype chain, `deepSnapshot` first flattens each 'level' of the proto-list,
grabs all the values, then unflattens the result back to its original depth.

Proto-list-deep does not disturb any of proto-list's functionality (and passes
all of proto-list's tests), so you can use it in place of proto-list if you
wish.

### Important Caveat
Proto-list-deep flattens the objects by concatenating keys together with a
delimeter. By default it uses ` : `. So, your object keys CANNOT contain this
delimeter, else the unflattening will fail. You can change this delimeter
in the `ProtoListDeep()` constructor.

Example
-------
```js
var ProtoListDeep = require('proto-list-deep');
var p = new ProtoListDeep();

p.push({
  fruit: { green: 'apple' }
});
p.push({
  fruit: { green: 'lime', yellow: 'lemon' }
});

console.log(p.snapshot);
// { fruit: { green: 'apple' } }

console.log(p.deepSnapshot);
// { fruit: { green: 'apple', yellow: 'lemon' } }

```
