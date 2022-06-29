import putout from 'https://esm.sh/@putout/bundle';
import removeDebugger from 'https://esm.sh/@putout/plugin-remove-debugger';

import removeUnusedVariables from 'https://esm.sh/@putout/plugin-remove-unused-variables?alias=putout:putout/bundle';

console.log(putout('const a = 5;debugger', {
    plugins: [
        ['remove-debugger', removeDebugger],
        ['remove-unused-variables', remove-unused-variables],
    ]
}));
