import {run} from 'madrun';

export default {
    'test': () => `tape 'test/*.js'`,
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'wisdom': () => run('build:*'),
    'build': () => run('build:*'),
    'build:putout': () => 'rollup -c',
    'build:plugins:putout': () => 'rollup -c rollup.plugin-putout.js',
    'build:putout:iife': () => run('build:putout', build({
        name: 'putout',
        format: 'iife',
        input: 'lib/putout.cjs',
        output: 'bundle/putout-iife.js',
    })),
};

function build({name, format, input, output}) {
    return `--name ${name} --format ${format} --input ${input} --o ${output}`;
}
