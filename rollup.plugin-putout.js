import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import externals from 'rollup-plugin-node-externals';
import replace from '@rollup/plugin-replace';

export default {
    input: 'plugins/putout.js',
    output: {
        file: 'bundle/plugin-putout.js',
        format: 'es',
    },
    plugins: [
        alias({
            entries: [{find: 'putout', replacement: '@putout/bundle'}],
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
                'node_modules/@putout/plugin-putout/lib/*/*.js',
            ],
            exclude: [
                '@putout/bundle',
            ],
        }),
        json(),
        replace({
            preventAssignment: true,
            values: {
                '[a]: require(`./${a}`)': '[a]: require(`./${a}/index.js`)'
            },
        }),
    ],
};
