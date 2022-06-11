# is.t

Runtime typecheck library.

## what it's for?

In some rare occasions you don't want or can't involve into static type checking. This library is for runtime type checking. Being runtime library allows it to use more dynamic style in JS with a lot of polymorphic code, dynamic typing and late binding, while still have guarantees at specific points.

* Can be used at the edge of typed code, like user or api inputs.
* Does not require additional translation step (but has inherent overhead).
* Allows more native, dynamic JS style while still having type guarantees.

## design

It is designed to be composable. The main api is `Contract` which is a typecheck function. It can be used as an assert. It does nothing if check was successful or throws if any errors. `Wrong` object is used as a base error object. It has detailed info on error occurence. It is a `TypeError` subtype. `match` and `handle`. Special `check` helper can be used to apply Contract to value with some useful default behaviors for specific Contract-like objects (default JS constructors, predicate functions and literal values).

## todo

This is a sketch of mine, it still requires a lot of work to be a mature package. Use it only if you're an enthusiast. I will help with guidance and pull request assistance.

## inspiration

This field is not popular theese days, but there was a lot of them. To name my favorites is: [sanctuary-def](https://github.com/sanctuary-js/sanctuary-def), [tcomb](https://github.com/gcanti/tcomb), [shapely](https://github.com/AriaMinaei/shapely).

[A lot of them](https://github.com/StreetStrider?after=Y3Vyc29yOjMw&direction=&q=type&sort=&tab=stars&type=).

## no overhead

It is possible to eliminate overhead completely and remove typechecks in production. You'll need code eliminating engine, like Rollup and specific transform, similar to [@rollup/plugin-strip](https://www.npmjs.com/package/@rollup/plugin-strip). Prepend your typechecks with some label (like `dev`), then apply label removing transformation for prod build.

## license

ISC. © Strider, 2022.
