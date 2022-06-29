import putout from 'https://esm.sh/@putout/bundle';
import removeDebugger from 'https://esm.sh/@putout/plugin-remove-debugger?alias=putout:@putout/bundle';
import declare from 'https://esm.sh/@putout/plugin-declare-undefined-variables?alias=putout:@putout/bundle';

console.log(putout('isFn(fn, "hello"); debugger', {
    plugins: [
        ['remove-debugger', removeDebugger],
        ['declare-undefined-variables', declare],
    ]
}));
