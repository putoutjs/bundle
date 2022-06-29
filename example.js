import putout from './bundle/putout.js';
import removeDebugger from 'https://esm.sh/@putout/plugin-remove-debugger';

console.log(putout('const a = 5;debugger', {
    plugins: [
        ['remove-debugger', removeDebugger],
    ]
}));

