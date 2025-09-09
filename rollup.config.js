import process from 'node:process';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';

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
                find: 'esprima',
                replacement: new URL('./lib/esprima.js', import.meta.url).pathname,
            }, {
                find: 'espree',
                replacement: new URL('./lib/esprima.js', import.meta.url).pathname,
            }, {
                find: 'acorn',
                replacement: new URL('./lib/esprima.js', import.meta.url).pathname,
            }, {
                find: 'hermes-parser',
                replacement: new URL('./lib/esprima.js', import.meta.url).pathname,
            },
            ...[
                'events',
                'module',
                'path',
                'process',
            ].map(createReplacement)],
        }),
        commonjs({
            defaultIsModuleExports: false,
            strictRequires: 'auto',
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
                'process',
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
                [`const {isBuiltin} = require('node:module')`]: `import builtinModules from 'builtin-modules';const isBuiltin = (a) => bultins.includes(a)`,
            },
        }),
    ],
};
