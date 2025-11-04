import process from 'node:process';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import {visualizer} from 'rollup-plugin-visualizer';

const {MINIFY, SLIM} = process.env;

const createReplacement = (a) => ({
    find: `node:${a}`,
    replacement: a,
});

const createEmpty = (find) => ({
    find,
    replacement: new URL('./lib/empty.js', import.meta.url).pathname,
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
            }, 
            ...[
                'esprima',
                'espree',
                'acorn',
                'hermes-parser',
                'tenko',
                'ignore',
                'acorn-private-class-elements',
                'acorn-class-fields',
                'acorn-static-class-features',
                'acorn-typescript',
                'acorn-stage-3',
                SLIM && 'debug',
            ].filter(Boolean).map(createEmpty),
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
        visualizer({
            filename: './stats.html', // куда сохранить визуализацию
        }),
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
