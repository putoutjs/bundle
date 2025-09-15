import putout from '@putout/bundle';
import * as removeDebugger from '@putout/plugin-remove-debugger';
import * as declare from '@putout/plugin-declare';

console.log(declare);

console.log(putout('isFn(fn, "hello"); debugger', {
    plugins: [
        ['remove-debugger', removeDebugger],
        ['declare-undefined-variables', declare],
    ],
}));
