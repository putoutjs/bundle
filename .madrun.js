import {run} from 'madrun';

const env = {
    MINIFY: 1,
};

export default {
    'test': () => `tape 'test/*.js'`,
    'watch:test': async () => `nodemon -w lib -w test -x "${await run('test')}"`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'wisdom': () => run('build:*'),
    'wisdom:done': () => 'npm publish --tag latest',
    'build': () => run('build:*'),
    'build:putout': () => 'rollup -c',
    'build:putout:esm': async () => [env, await run('build:putout', build({
        name: 'putout',
        format: 'es',
        input: 'lib/putout.js',
        output: 'bundle/putout.min.js',
    }))],
};

function build({name, format, input, output, exports = 'auto'}) {
    return `--name ${name} --format ${format} --input ${input} --o ${output} --exports ${exports}`;
}
