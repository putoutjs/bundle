# @putout/bundle [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/bundle.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/bundle "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) bundle to get things working in [**Deno**](https://deno.land) and **Browsers** using amazing [esm.sh](https://esm.sh).

Usage:

```js
import {putout} from 'https://esm.sh/@putout/bundle';
import removeDebugger from 'https://esm.sh/@putout/plugin-remove-debugger?alias=putout:@putout/bundle';
import declare from 'https://esm.sh/@putout/plugin-declare-undefined-variables?alias=putout:@putout/bundle';

console.log(putout('isFn(fn, "hello"); debugger', {
    plugins: [
        ['remove-debugger', removeDebugger],
        ['declare-undefined-variables', declare],
    ],
}));

// returns
({
    code: `const isFn = a => typeof a === 'function';\nisFn(fn, "hello");`,
    places: [],
});
```

When you need to use `@putout/plugin-putout` use:

```js
import {putout} from 'https://esm.sh/@putout/bundle';
import pluginPutout from 'https://esm.sh/@putout/plugin-putout?alias=putout:@putout/bundle';

console.log(putout('compare(a, b)', {
    plugins: [
        ['putout', pluginPutout],
    ],
}));

// returns
({
    code: `const {operator} = require('putout');\nconst {compare} = operator;\ncompare(a, b)`,
    places: [],
});
```

## Slim

When you need super slim bundle without `debug` use:


```js
import {putout} from 'https://esm.sh/@putout/bundle/slim';
```

## License

MIT
