# is.t

Runtime typecheck library.

## what it's for?

In some rare occasions you don't want or can't involve static type checking. This library is for runtime type checking. Being a runtime library allows it to be used in a more dynamic manner with a lot of polymorphic code, dynamic typing and late binding, while still have as much guarantees as you need.

* Can be used at the edge of typed code, like user or api inputs.
* Does not require additional translation step (but has inherent overhead).
* Allows more native, dynamic JS style while still having type guarantees.

## design

* It is designed to be composable. The main api is `Contract` constructor which produces a typecheck function. This function can be used as an assert. It does nothing if check was successful or throws otherwise.
* `Wrong` objects are used as a base error object. They subtype `TypeError` themselves, so they are of a proper `Error` type. `Wrong` type has detailed info on error occurence.`match` and `handle`.
* Special `check` helper can be used to apply contracts to value with some useful default behaviors for specific Contract-like objects (default JS constructors, predicate functions and literal values).

```js
import check from 'is.t/check'
import Iterable from 'is.t/type/Iterable'

function find (sequence, predicate) {
	check.unit({ sequence }, Iterable)
	check.unit({ predicate }, Function)

	for (const item of sequence) {
		const bool = predicate(item)
		check.as('predicate return value', Boolean, bool)
		if (bool) {
			return item
		}
	}
}
```

* Wrong type is built such way, so it can be pattern matched in a cascade way. You can match and handle very specific errors first, then match more generic ones. `match` & `handle` are used for that, they can be used both in try-catch and promises.

## todo

This is a sketch of mine, it still requires a lot of work to be a mature package. Use it only if you're an enthusiast. I will help with guidance and pull request assistance.

## inspiration

This field is not popular theese days, but there was a lot of them. To name my favorites is: [sanctuary-def](https://github.com/sanctuary-js/sanctuary-def), [tcomb](https://github.com/gcanti/tcomb), [shapely](https://github.com/AriaMinaei/shapely).

[A lot of them](https://github.com/StreetStrider?after=Y3Vyc29yOjMw&direction=&q=type&sort=&tab=stars&type=).

## no overhead

It is possible to eliminate overhead completely and remove typechecks in production. You'll need code eliminating engine, like Rollup and specific transform, similar to [@rollup/plugin-strip](https://www.npmjs.com/package/@rollup/plugin-strip). Prepend your typechecks with some label (like `dev`), then apply label removing transformation for prod build.

## license

ISC. © Strider, 2022.
