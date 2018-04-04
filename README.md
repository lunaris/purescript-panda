# Panda 🐼

Panda is a PureScript UI library for building declarative front-ends without a
virtual DOM. To achieve this, dynamic events are specifically labelled and
configured to produce specific event listeners, and updates are localised to
the tree underneath.

To build, try:

```
$ npm i
$ npx bower i
$ npx pulp build
```

To run tests:

```
$ npx pulp build --include test -m Test.Main --to test/dist.js
```

For a full example, see the `examples` directory. I'll try to add more
documentation in the coming days, but this is very much alpha software right
now.

[Module
documentation](https://pursuit.purescript.org/packages/purescript-panda/) is
published on Pursuit.

![Panda](https://raw.githubusercontent.com/i-am-tom/purescript-panda/master/panda.png)
