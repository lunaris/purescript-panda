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

To build and serve test content (e.g. using `python3`'s `http.server`):

```
$ npx pulp build --include test -m Test.Main --to test/dist.js
$ python3 -m http.server 4949
```

[Module
documentation](https://pursuit.purescript.org/packages/purescript-panda/) is
published on Pursuit.

![Panda](https://raw.githubusercontent.com/i-am-tom/purescript-panda/master/panda.png)
