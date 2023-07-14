import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import externals from 'rollup-plugin-node-externals';

export default {
    input: 'plugins/putout.js',
    output: {
        file: 'bundle/plugin-putout.js',
        format: 'es',
    },
    plugins: [
        alias({
            entries: [{
                find: 'putout',
                replacement: '@putout/bundle',
            }],
        }),
        nodeResolve({
            preferBuiltins: false,
            browser: true,
            resolveOnly: (module) => module !== '@putout/bundle',
        }),
        externals({
            deps: false,
        }),
        commonjs({
            dynamicRequireTargets: [
                'node_modules/@putout/plugin-putout/lib/*',
                '!node_modules/@putout/plugin-putout/lib/index.js',
            ],
            exclude: [
                '@putout/bundle',
            ],
        }),
        json(),
    ],
};
