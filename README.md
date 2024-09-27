# Debounce

This is a basic module for allowing for decorators for either debouncing or throttling the running of it so it isn't ran too often. This is especially useful for REST APIs or intense functionality but can be used for whatever wanted.

It should work fine in most frameworks as well.

# How to install:

Run the following in a node instance:

- npm i @strbjun/debounce

# How to use:

## Debounce

```
@debounce(1000, (data) => { /* handle the returned data */ })
function APIGet( .... )
```

Or, can:

```
@debounce({
  delay: 1000
  fn: (data) => {}
  name: "API Get" /* This will allow for multiple debounces */
  chaining: false, /* set to true for function chaining when done */
})
```

## Throttling

```
@throttling("API Get", (data) => {})
function APIGet( .... )
```

Or, can:

```
@throttling({
  delay: 5000
  fn: (data) => {}
  name: "API Get" /* This will allow for multiple throttling and it will return the last set data as well if one is set */
})
```

Note you can also use generics to set the data type for the data that is received back with `<T = data type>`.
