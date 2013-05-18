# Agile Australia game

---

## Getting set up

Install Node.js version `0.8.x`, then run

```
npm install -g grunt-cli
npm install
```

## Build time!

We use [grunt](http://gruntjs.com):
```
grunt
```

In watch mode, it continuously rebuilds assets & runs tests when needed:
```
grunt watch
```

To run the tests on their own:
```
grunt test
```

## Running the game

```
npm start
```

This also restarts the server

- if something goes wrong
- when any server-side code changes
