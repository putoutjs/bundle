import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';

export default {
    input: 'lib/putout.js',
    output: {
        file: 'bundle/putout.js',
        format: 'es',
    },
    plugins: [
        alias({
            entries: [{find: './loader.mjs', replacement: './lib/loader.js'}],
        }),
        nodeResolve({
            preferBuiltins: false,
            browser: true,
        }),
        commonjs({
            exclude: [
                '**/lib/loader.*',
                '**/parse-options/**',
                'acorn',
                'tenko*',
                'hermes-parser/*',
                'acorn-stage-3',
                'caniuse',
                'esprima',
                'hermes*',
                'espree',
                'electron*',
                'node-releases',
                'os',
                'path',
                'fs',
                'module',
                'buffer',
            ],
        }),
        nodePolyfills(),
        json(),
        replace({
            preventAssignment: true,
            values: {
                'process.env.BABEL_TYPES_8_BREAKING': true,
                'Buffer.isBuffer': 'Array.isArray',
                'process.platform': '"unix"',
                'process.env.BABEL_TYPES_8_BREAKING = true': '',
                'process.env': '{}',
                'export {load} from "./loader.mjs"': '',
            },
        }),
    ],
};
