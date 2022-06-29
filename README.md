# @putout/bundle [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-debugger "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) bundle to get things working in **Deno** and **Browsers**

Usage

```js
import putout from 'https://esm.sh/@putout/bundle';
import removeDebugger from 'https://esm.sh/@putout/plugin-remove-debugger?alias=putout:@putout/bundle';
import declare from 'https://esm.sh/@putout/plugin-declare-undefined-variables?alias=putout:@putout/bundle';

console.log(putout('isFn(fn, "hello"); debugger', {
    plugins: [
        ['remove-debugger', removeDebugger],
        ['declare-undefined-variables', declare],
    ]
}));

// returns
({
  code: `const isFn = a => typeof a === 'function';\nisFn(fn, "hello");`,
  places: []
});
```

## License

MIT
