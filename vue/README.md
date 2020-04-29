# vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Issue
There seem to be a bug with Vue, loosing the parent element. To fix edit `runtime-dom.esm-bundler.js` with on line 11.
```
if(parent === null){
    location.reload();
}
```