# @putout/bundle [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-debugger "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) bundle to get things working in **Deno** and **Browsers**

Usage

```js
import putout from 'https://esm.sh/@putout/bundle';
import removeDebugger from 'https://esm.sh/plugin-remove-debugger';
import removeUnusedVariables from 'https://esm.sh/@putout/plugin-remove-unused-variables?alias=putout:@putout/bundle';

putout('const a = 5;debugger', {
    plugins: [
        ['remove-debugger', removeDebugger],
        ['remove-unused-variables', remove-unused-variables],
    ]
});

// returns
['', []]
```

## License

MIT
