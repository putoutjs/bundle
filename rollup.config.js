import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import process from 'node:process';

const {MINIFY} = process.env;

const createReplacement = (a) => ({
    find: `node:${a}`,
    replacement: a,
});

export default {
    input: 'lib/putout.js',
    output: {
        file: 'bundle/putout.js',
        format: 'es',
    },
    plugins: [
        MINIFY && terser(),
        alias({
            entries: [{
                find: './loader.mjs',
                replacement: new URL('./lib/loader.js', import.meta.url).pathname,
            }, {
                find: 'chalk',
                replacement: './lib/chalk.js',
            },
            ...[
                'path',
                'module',
                'process',
            ].map(createReplacement)],
        }),
        commonjs({
            defaultIsModuleExports: false,
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
        nodeResolve({
            preferBuiltins: false,
            browser: true,
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
