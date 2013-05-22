# Agile Australia game

---

## Getting set up

Install Node.js version `0.8.x`, then run

```
npm install -g grunt-cli
npm install
```

## Build time!

We use [grunt](http://gruntjs.com).
This builds all assets into `build`, and watches for any changes:

```
grunt
```

To run the unit tests:
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
