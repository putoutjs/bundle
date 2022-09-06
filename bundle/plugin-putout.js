import require$$0$1 from '@putout/bundle';

function _mergeNamespaces(n, m) {
    m.forEach(function (e) {
        e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
            if (k !== 'default' && !(k in n)) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    });
    return Object.freeze(n);
}

var addArgs_1;
var hasRequiredAddArgs;

function requireAddArgs () {
	if (hasRequiredAddArgs) return addArgs_1;
	hasRequiredAddArgs = 1;

	const {operator} = require$$0$1;
	const {addArgs} = operator;

	addArgs_1 = addArgs({
	    comparePlaces: ['{comparePlaces}', [
	        'test("__a", async (__args) => __body)',
	        'test.skip("__a", async (__args) => __body)',
	        'test.only("__a", async (__args) => __body)',
	    ],
	    ],
	    
	    process: ['{process}', [
	        'test("__a", async (__args) => __body)',
	        'test.skip("__a", async (__args) => __body)',
	        'test.only("__a", async (__args) => __body)',
	    ],
	    ],
	    
	    noProcess: ['{noProcess}', [
	        'test("__a", async (__args) => __body)',
	        'test.skip("__a", async (__args) => __body)',
	        'test.only("__a", async (__args) => __body)',
	    ],
	    ],
	});
	return addArgs_1;
}

var addPush = {};

var hasRequiredAddPush;

function requireAddPush () {
	if (hasRequiredAddPush) return addPush;
	hasRequiredAddPush = 1;

	const {
	    types,
	    operator,
	} = require$$0$1;

	const {traverse} = operator;

	const {
	    ObjectProperty,
	    ObjectPattern,
	    Identifier,
	} = types;

	addPush.report = () => `Add 'push' argument to 'traverse'`;

	addPush.fix = (path) => {
	    const computed = false;
	    const shorthand = true;
	    const name = Identifier('push');
	    
	    path.node.right.params.push(ObjectPattern([
	        ObjectProperty(name, name, computed, shorthand),
	    ]));
	};

	addPush.traverse = ({push}) => ({
	    'module.exports.traverse = (__args) => __': (traversePath) => {
	        const paramsPaths = traversePath.get('right.params');
	        
	        if (paramsPaths.length)
	            return;
	        
	        traverse(traversePath, {
	            'push(__)': () => {
	                push(traversePath);
	            },
	        });
	    },
	});
	return addPush;
}

var applyAsyncFormatter = {};

var hasRequiredApplyAsyncFormatter;

function requireApplyAsyncFormatter () {
	if (hasRequiredApplyAsyncFormatter) return applyAsyncFormatter;
	hasRequiredApplyAsyncFormatter = 1;

	const {
	    operator,
	    types,
	} = require$$0$1;

	const computed = true;
	const shorthand = true;

	const {
	    Identifier,
	    ObjectPattern,
	    ObjectProperty,
	} = types;

	const {compare} = operator;

	applyAsyncFormatter.report = () => 'Use Async API to test Formatter';

	applyAsyncFormatter.replace = () => ({
	    't.format(__args)': create('format'),
	    't.noFormat(__args)': create('noFormat'),
	    't.formatMany(__args)': create('formatMany'),
	});

	const create = (name) => (vars, path) => {
	    const {block} = path.scope;
	    const {body} = block.body;
	    const n = body.length - 1;
	    const nameId = Identifier(name);
	    
	    block.async = true;
	    
	    block.params = [
	        ObjectPattern([
	            ObjectProperty(nameId, nameId, !computed, shorthand),
	        ]),
	    ];
	    
	    if (compare(body[n], 't.end()')) {
	        body.pop();
	    }
	    
	    return `await ${name}(__args)`;
	};
	return applyAsyncFormatter;
}

var applyCreateTest = {};

var hasRequiredApplyCreateTest;

function requireApplyCreateTest () {
	if (hasRequiredApplyCreateTest) return applyCreateTest;
	hasRequiredApplyCreateTest = 1;

	applyCreateTest.report = () => `Apply 'createTest'`;

	applyCreateTest.replace = () => ({
	    'require("@putout/test")(__dirname, __a)': `createTest(__dirname, __a)`,
	});
	return applyCreateTest;
}

var applyProcessorsDestructuring = {};

var hasRequiredApplyProcessorsDestructuring;

function requireApplyProcessorsDestructuring () {
	if (hasRequiredApplyProcessorsDestructuring) return applyProcessorsDestructuring;
	hasRequiredApplyProcessorsDestructuring = 1;

	applyProcessorsDestructuring.report = () => 'Test operator should be destructured';

	applyProcessorsDestructuring.replace = () => ({
	    'async (t) => {await t.process(__args)}': 'async ({process}) => {await process(__args)}',
	    'async (t) => {await t.noProcess(__args)}': 'async ({noProcess}) => {await noProcess(__args)}',
	    'async (t) => {await t.comparePlaces(__args)}': 'async ({comparePlaces}) => {await comparePlaces(__args)}',
	    
	    'async (t) => {await t.process(__args); t.end();}': 'async ({process}) => {await process(__args)}',
	    'async (t) => {await t.noProcess(__args); t.end();}': 'async ({noProcess}) => {await noProcess(__args)}',
	    'async (t) => {await t.comparePlaces(__args); t.end();}': 'async ({comparePlaces}) => {await comparePlaces(__args)}',
	});
	return applyProcessorsDestructuring;
}

var applyRemove = {};

var hasRequiredApplyRemove;

function requireApplyRemove () {
	if (hasRequiredApplyRemove) return applyRemove;
	hasRequiredApplyRemove = 1;

	applyRemove.report = () => `Use 'remove(path)' instead of 'path.remove()'`;

	applyRemove.replace = () => ({
	    'path.remove()': 'remove(path)',
	});
	return applyRemove;
}

var checkReplaceCode = {};

var tryCatch;
var hasRequiredTryCatch;

function requireTryCatch () {
	if (hasRequiredTryCatch) return tryCatch;
	hasRequiredTryCatch = 1;

	tryCatch = (fn, ...args) => {
	    try {
	        return [null, fn(...args)];
	    } catch(e) {
	        return [e];
	    }
	};
	return tryCatch;
}

var generateCode;
var hasRequiredGenerateCode;

function requireGenerateCode () {
	if (hasRequiredGenerateCode) return generateCode;
	hasRequiredGenerateCode = 1;

	const putout = require$$0$1;
	const tryCatch = requireTryCatch();

	const {types, operator} = putout;
	const {replaceWith} = operator;
	const {
	    ArrayPattern,
	    ObjectPattern,
	    BlockStatement,
	    ObjectExpression,
	} = types;

	generateCode = (rootPath, key) => {
	    const getVar = createVarStore(rootPath);
	    const [transformError, result] = tryCatch(putout, key, {
	        fix: true,
	        isTS: true,
	        plugins: [
	            ['generate', {
	                report: () => {},
	                include: () => [
	                    'Identifier',
	                    'StringLiteral',
	                ],
	                fix: (path) => {
	                    const {node} = path;
	                    
	                    const {
	                        value,
	                        name,
	                    } = node;
	                    
	                    if (path.isStringLiteral() && /^__[a-z]$/.test(value)) {
	                        path.node.value = getVar(value);
	                        return;
	                    }
	                    
	                    if (/^__[a-z]$/.test(name)) {
	                        path.node.name = getVar(name);
	                        return;
	                    }
	                    
	                    if (name === '__array') {
	                        if (path.parentPath.isVariableDeclarator())
	                            return replaceWith(path, ArrayPattern([]));
	                        
	                        if (path.parentPath.isCallExpression())
	                            return replaceWith(path, ArrayPattern([]));
	                        
	                        if (path.parentPath.isFunction())
	                            return replaceWith(path, ArrayPattern([]));
	                        
	                        if (path.parentPath.isAssignmentExpression())
	                            return replaceWith(path, ArrayPattern([]));
	                    }
	                    
	                    if (name === '__object') {
	                        return objectify(path);
	                    }
	                    
	                    if (name === '__body') {
	                        replaceWith(path, BlockStatement([]));
	                    }
	                },
	            }],
	        ],
	    });
	    
	    return [transformError, result?.code];
	};

	function createVarStore(path) {
	    const store = {};
	    
	    return (name) => {
	        if (store[name])
	            return store[name];
	        
	        store[name] = path.scope.generateUid();
	        
	        return store[name];
	    };
	}

	function objectify(path) {
	    const {parentPath} = path;
	    const isVar = parentPath.isVariableDeclarator();
	    const isAssign = parentPath.isAssignmentExpression();
	    
	    if (isVar && parentPath.get('id') === path)
	        return replaceWith(path, ObjectPattern([]));
	    
	    if (isAssign && parentPath.get('right') === path)
	        return replaceWith(path, ObjectExpression([]));
	}
	return generateCode;
}

var hasRequiredCheckReplaceCode;

function requireCheckReplaceCode () {
	if (hasRequiredCheckReplaceCode) return checkReplaceCode;
	hasRequiredCheckReplaceCode = 1;

	const putout = require$$0$1;
	const tryCatch = requireTryCatch();

	const generateCode = requireGenerateCode();

	const {operator} = putout;

	const {
	    compare,
	    extract,
	    compute,
	} = operator;

	const name = '__putout_plugin_check_replace_code';

	const get = (path) => path[name];
	const set = (path) => path[name] = true;

	const rmSemi = (a) => {
	    a = a.replace(';;', ';');
	    a = a.replace(/;$/, '');
	    
	    return a;
	};

	checkReplaceCode.report = ({path, code, error}) => {
	    if (error)
	        return error.message;
	    
	    const [, key] = parseKey(path);
	    const value = extract(path.node.value);
	    
	    return `transform mismatch: "${key}" -> "${value}" !== "${code}"`;
	};

	checkReplaceCode.fix = ({mainPath}) => {
	    set(mainPath);
	};

	checkReplaceCode.traverse = ({push}) => ({
	    'module.exports.replace = () => __a': (path) => {
	        if (get(path))
	            return;
	        
	        if (hasMatch(path))
	            return;
	        
	        for (const propertyPath of path.get('right.body.properties')) {
	            if (!propertyPath.get('value').isStringLiteral())
	                continue;
	            
	            const {node} = propertyPath;
	            const [parseError, key] = parseKey(propertyPath);
	            
	            if (parseError) {
	                push({
	                    error: parseError,
	                    mainPath: path,
	                    path: propertyPath,
	                });
	                return;
	            }
	            
	            const template = extract(node.value);
	            const [generateError, keyCode] = generateCode(path, key);
	            
	            if (generateError) {
	                push({
	                    error: generateError,
	                    mainPath: path,
	                    path: propertyPath,
	                });
	                return;
	            }
	            
	            const [transformError, result] = tryCatch(putout, keyCode, {
	                fix: true,
	                isTS: true,
	                plugins: [
	                    ['evaluate', {
	                        report: () => {},
	                        replace: () => ({
	                            [key]: template,
	                        }),
	                    }],
	                ],
	            });
	            
	            if (transformError) {
	                push({
	                    error: transformError,
	                    mainPath: path,
	                    path: propertyPath,
	                });
	                return;
	            }
	            
	            const {code} = result;
	            const [error, is] = tryCatch(compare, rmSemi(code), template);
	            
	            if (error || !is)
	                push({
	                    code,
	                    mainPath: path,
	                    path: propertyPath,
	                });
	        }
	    },
	});

	function parseKey(propertyPath) {
	    const keyPath = propertyPath.get('key');
	    const [isComputed, key] = compute(keyPath);
	    
	    if (!isComputed)
	        return [Error(`Replace key cannot be computed: '${keyPath.toString()}'`)];
	    
	    return [null, key];
	}

	function hasMatch(path) {
	    const {body} = path.scope.getProgramParent().path.node;
	    
	    for (const current of body) {
	        if (compare(current, 'module.exports.match = __a'))
	            return true;
	    }
	    
	    return false;
	}
	return checkReplaceCode;
}

var convertAddArgumentToAddArgs = {};

var hasRequiredConvertAddArgumentToAddArgs;

function requireConvertAddArgumentToAddArgs () {
	if (hasRequiredConvertAddArgumentToAddArgs) return convertAddArgumentToAddArgs;
	hasRequiredConvertAddArgumentToAddArgs = 1;

	convertAddArgumentToAddArgs.report = () => 'Use addArgs instead of addArgument';

	convertAddArgumentToAddArgs.replace = () => ({
	    'addArgument(__args)': (vars, path) => {
	        path.scope.rename('addArgument', 'addArgs');
	        return path;
	    },
	});
	return convertAddArgumentToAddArgs;
}

var convertBabelTypes = {};

var hasRequiredConvertBabelTypes;

function requireConvertBabelTypes () {
	if (hasRequiredConvertBabelTypes) return convertBabelTypes;
	hasRequiredConvertBabelTypes = 1;

	const {
	    operator,
	    template,
	} = require$$0$1;

	const {replaceWith} = operator;

	const astRequire = template.ast(`
    require('putout').types
`);

	convertBabelTypes.report = () => {
	    return `"putout.types" should be used instead of "@babel/types"`;
	};

	function isRequire(path) {
	    return path
	        .get('callee')
	        .isIdentifier({name: 'require'});
	}

	function isBabelTypes(path) {
	    return path
	        .get('arguments.0')
	        .isStringLiteral({value: '@babel/types'});
	}

	convertBabelTypes.traverse = ({push}) => ({
	    CallExpression(path) {
	        if (!isRequire(path))
	            return;
	        
	        if (!isBabelTypes(path))
	            return;
	        
	        push(path);
	    },
	});

	convertBabelTypes.fix = (path) => {
	    replaceWith(path, astRequire);
	};
	return convertBabelTypes;
}

var convertDestructuringToIdentifier = {};

var hasRequiredConvertDestructuringToIdentifier;

function requireConvertDestructuringToIdentifier () {
	if (hasRequiredConvertDestructuringToIdentifier) return convertDestructuringToIdentifier;
	hasRequiredConvertDestructuringToIdentifier = 1;

	const {compare} = require$$0$1.operator;

	convertDestructuringToIdentifier.report = () => 'Identifier should be used instead of empty destructuring';

	convertDestructuringToIdentifier.match = () => ({
	    '({}) => __body': (vars, path) => findUp(path, 'module.exports.__a = __'),
	    '({}, __a) => __body': (vars, path) => findUp(path, 'module.exports.__a = __'),
	});

	convertDestructuringToIdentifier.replace = () => ({
	    '({}) => __body': '(vars) => __body',
	    '({}, __a) => __body': '(vars, __a) => __body',
	});

	function findUp(path, str) {
	    while (!path.isProgram()) {
	        if (path.isAssignmentExpression()) {
	            return compare(path, str);
	        }
	        
	        path = path.parentPath;
	    }
	    
	    return false;
	}
	return convertDestructuringToIdentifier;
}

var convertDirnameToUrl = {};

var hasRequiredConvertDirnameToUrl;

function requireConvertDirnameToUrl () {
	if (hasRequiredConvertDirnameToUrl) return convertDirnameToUrl;
	hasRequiredConvertDirnameToUrl = 1;

	const {operator} = require$$0$1;
	const {isESM} = operator;

	convertDirnameToUrl.report = () => `Use 'createTest(import.meta.url)' instead of 'createTest(__dirname)'`;

	convertDirnameToUrl.match = () => ({
	    'createTest(__dirname, __a)': (vars, path) => isESM(path),
	});

	convertDirnameToUrl.replace = () => ({
	    'createTest(__dirname, __a)': 'createTest(import.meta.url, __a)',
	});
	return convertDirnameToUrl;
}

var convertFindToTraverse = {};

var hasRequiredConvertFindToTraverse;

function requireConvertFindToTraverse () {
	if (hasRequiredConvertFindToTraverse) return convertFindToTraverse;
	hasRequiredConvertFindToTraverse = 1;

	const {types, operator} = require$$0$1;
	const {replaceWith} = operator;

	const {
	    ReturnStatement,
	    isCallExpression,
	    isIdentifier,
	} = types;

	const {entries} = Object;

	convertFindToTraverse.report = () => '"traverse" should be used instead of "find"';

	const fixType = (types) => (path) => {
	    for (const [is, fix] of entries(types)) {
	        if (path[is]())
	            fix(path);
	    }
	};

	convertFindToTraverse.fix = fixType({
	    isMemberExpression: (path) => {
	        path.get('property').node.name = 'traverse';
	    },
	    
	    isFunction: (path) => {
	        path.node.params = [path.node.params[1]];
	    },
	    
	    isCallExpression: (path) => {
	        replaceWith(path, ReturnStatement(path.node.arguments[1]));
	    },
	});

	convertFindToTraverse.traverse = ({push}) => ({
	    'module.exports.find = (__args) => __'(path) {
	        const leftPath = path.get('left');
	        const rightPath = path.get('right');
	        
	        if (rightPath.node.params.length !== 2)
	            return;
	        
	        if (!isTraverseLastExpression(rightPath.node.body.body))
	            return;
	        
	        const traverseCallPath = getTraverseCall(rightPath);
	        
	        push(traverseCallPath);
	        push(leftPath);
	        push(rightPath);
	    },
	});

	function isTraverseLastExpression(body) {
	    const n = body.length - 1;
	    const {expression} = body[n];
	    
	    if (!isCallExpression(expression))
	        return false;
	    
	    const {callee} = expression;
	    
	    return isIdentifier(callee, {
	        name: 'traverse',
	    });
	}

	function getTraverseCall(path) {
	    let result;
	    
	    path.traverse({
	        CallExpression(path) {
	            if (!path.get('callee').isIdentifier({name: 'traverse'}))
	                return;
	            
	            result = path;
	            path.stop();
	        },
	    });
	    
	    return result;
	}
	return convertFindToTraverse;
}

var convertMatchToFunction = {};

var hasRequiredConvertMatchToFunction;

function requireConvertMatchToFunction () {
	if (hasRequiredConvertMatchToFunction) return convertMatchToFunction;
	hasRequiredConvertMatchToFunction = 1;

	convertMatchToFunction.report = () => `'match' should be a function`;

	convertMatchToFunction.replace = () => ({
	    'module.exports.match= __object': 'module.exports.match = () => __object',
	});
	return convertMatchToFunction;
}

var convertMethodToProperty = {};

var hasRequiredConvertMethodToProperty;

function requireConvertMethodToProperty () {
	if (hasRequiredConvertMethodToProperty) return convertMethodToProperty;
	hasRequiredConvertMethodToProperty = 1;

	const {
	    types,
	    operator,
	} = require$$0$1;

	const {replaceWith} = operator;
	const {ObjectProperty} = types;

	convertMethodToProperty.report = () => 'Object Property should be used instead of Method';

	convertMethodToProperty.include = () => ['ObjectMethod'];

	convertMethodToProperty.filter = (path) => {
	    if (!path.node.params.length)
	        return false;
	    
	    const firstPath = path.get('params.0');
	    
	    if (!firstPath.isObjectPattern())
	        return false;
	    
	    return !firstPath.node.properties.length;
	};

	convertMethodToProperty.fix = (path) => {
	    const keyPath = path.get('key');
	    path.node.type = 'ArrowFunctionExpression';
	    path.node.id = null;
	    
	    replaceWith(path, ObjectProperty(keyPath.node, path.node));
	};
	return convertMethodToProperty;
}

var convertNodeToPathInGetTemplateValues = {};

var hasRequiredConvertNodeToPathInGetTemplateValues;

function requireConvertNodeToPathInGetTemplateValues () {
	if (hasRequiredConvertNodeToPathInGetTemplateValues) return convertNodeToPathInGetTemplateValues;
	hasRequiredConvertNodeToPathInGetTemplateValues = 1;

	const {
	    types,
	    operator,
	} = require$$0$1;

	const {
	    compare,
	    replaceWith,
	    getTemplateValues,
	} = operator;

	const {
	    isVariableDeclarator,
	    isArrayPattern,
	} = types;

	convertNodeToPathInGetTemplateValues.report = () => '"path" should be used instead of "node" in getTemplateValues';

	const GET_TEMPLATE_VALUES_NODE = 'getTemplateValues(__a.node, __b)';

	convertNodeToPathInGetTemplateValues.fix = ({path, __aPath, init}) => {
	    if (compare(path, GET_TEMPLATE_VALUES_NODE)) {
	        const {__a} = getTemplateValues(path, GET_TEMPLATE_VALUES_NODE);
	        replaceWith(__aPath, __a);
	        
	        return;
	    }
	    
	    replaceWith(__aPath, init);
	};

	convertNodeToPathInGetTemplateValues.traverse = ({push}) => ({
	    'getTemplateValues(__a, __b)': (path) => {
	        const {scope} = path;
	        const {bindings} = scope;
	        
	        const __aPath = path.get('arguments.0');
	        
	        if (__aPath.isMemberExpression()) {
	            push({
	                path,
	                __aPath,
	            });
	            
	            return;
	        }
	        
	        const {name} = __aPath.node;
	        const binding = bindings[name];
	        
	        if (!binding)
	            return;
	        
	        const bindingNode = binding.path.node;
	        
	        if (!isVariableDeclarator(bindingNode))
	            return;
	        
	        if (isArrayPattern(bindingNode.id))
	            return;
	        
	        const {init} = bindingNode;
	        
	        push({
	            init,
	            path,
	            __aPath,
	        });
	    },
	});
	return convertNodeToPathInGetTemplateValues;
}

var convertNumberToNumeric = {};

var hasRequiredConvertNumberToNumeric;

function requireConvertNumberToNumeric () {
	if (hasRequiredConvertNumberToNumeric) return convertNumberToNumeric;
	hasRequiredConvertNumberToNumeric = 1;

	convertNumberToNumeric.report = () => `Use 'isNumericLiteral()' instead of 'isNumberLiteral()'`;

	convertNumberToNumeric.fix = (path) => {
	    const bindings = path.scope.getAllBindings();
	    const {name} = path.node.callee;
	    
	    if (!bindings.isNumericLiteral)
	        path.scope.rename('isNumberLiteral', 'isNumericLiteral');
	    
	    if (!bindings.NumericLiteral)
	        path.scope.rename('NumberLiteral', 'NumericLiteral');
	    
	    path.node.callee.name = name.replace('Number', 'Numeric');
	};

	convertNumberToNumeric.traverse = ({push}) => ({
	    'isNumberLiteral(__a)': (path) => {
	        push(path);
	    },
	    'NumberLiteral(__a)': (path) => {
	        push(path);
	    },
	});
	return convertNumberToNumeric;
}

var convertProcessToFind = {};

var hasRequiredConvertProcessToFind;

function requireConvertProcessToFind () {
	if (hasRequiredConvertProcessToFind) return convertProcessToFind;
	hasRequiredConvertProcessToFind = 1;

	const {replaceWith} = require$$0$1.operator;

	convertProcessToFind.report = () => 'Use find instead of process';

	convertProcessToFind.replace = () => ({
	    'module.exports.preProcess = __a': 'module.exports.branch = __a',
	    'module.exports.postProcess = __a ': 'module.exports.merge = __a',
	    'module.exports.process = __a': (vars, path) => {
	        const fnPath = path.get('right');
	        const {params} = fnPath.node;
	        
	        if (params.length > 1)
	            params.pop();
	        
	        fnPath.traverse({
	            ReturnStatement: (path) => {
	                const argPath = path.get('argument');
	                
	                if (argPath.isArrayExpression()) {
	                    const [, places] = argPath.node.elements;
	                    replaceWith(argPath, places);
	                }
	            },
	        });
	        
	        return 'module.exports.find = __a';
	    },
	});
	return convertProcessToFind;
}

var convertPutoutTestToCreateTest = {};

var hasRequiredConvertPutoutTestToCreateTest;

function requireConvertPutoutTestToCreateTest () {
	if (hasRequiredConvertPutoutTestToCreateTest) return convertPutoutTestToCreateTest;
	hasRequiredConvertPutoutTestToCreateTest = 1;

	const {assign} = Object;

	convertPutoutTestToCreateTest.report = () => `Use 'createTest' instead of 'putoutTest'`;

	convertPutoutTestToCreateTest.filter = ({scope}) => !scope.bindings.createTest;

	convertPutoutTestToCreateTest.include = () => [
	    'import putoutTest from "@putout/test"',
	];

	convertPutoutTestToCreateTest.fix = (path) => {
	    const [first] = path.node.specifiers;
	    
	    assign(first, {
	        type: 'ImportSpecifier',
	        kind: 'value',
	        imported: first.local,
	    });
	    
	    path.scope.rename('putoutTest', 'createTest');
	};
	return convertPutoutTestToCreateTest;
}

var convertReplaceToFunction = {};

var hasRequiredConvertReplaceToFunction;

function requireConvertReplaceToFunction () {
	if (hasRequiredConvertReplaceToFunction) return convertReplaceToFunction;
	hasRequiredConvertReplaceToFunction = 1;

	convertReplaceToFunction.report = () => `'replace' should be a function`;

	convertReplaceToFunction.replace = () => ({
	    'module.exports.replace = __object': 'module.exports.replace = () => __object',
	});
	return convertReplaceToFunction;
}

var convertReplaceWith = {};

var fullstore;
var hasRequiredFullstore;

function requireFullstore () {
	if (hasRequiredFullstore) return fullstore;
	hasRequiredFullstore = 1;

	fullstore = (value) => {
	    const data = {
	        value,
	    };
	    
	    return (...args) => {
	        const [value] = args;
	        
	        if (!args.length)
	            return data.value;
	        
	        data.value = value;
	        
	        return value;
	    };
	};
	return fullstore;
}

var hasRequiredConvertReplaceWith;

function requireConvertReplaceWith () {
	if (hasRequiredConvertReplaceWith) return convertReplaceWith;
	hasRequiredConvertReplaceWith = 1;

	const {
	    operator,
	    template,
	    types,
	} = require$$0$1;

	const fullstore = requireFullstore();

	const {
	    Identifier,
	    ObjectProperty,
	} = types;

	const {
	    replaceWith,
	    insertAfter,
	} = operator;

	convertReplaceWith.report = () => {
	    return `"operator.replaceWith" should be called instead of "path.replaceWith"`;
	};

	convertReplaceWith.fix = ({path, calleePath, property, object, program, isInserted}) => {
	    replaceWith(calleePath, property);
	    
	    const strictModePath = program.get('body.0');
	    const {bindings} = strictModePath.scope;
	    
	    path.node.arguments.unshift(object);
	    
	    if (bindings.replaceWith || isInserted())
	        return;
	    
	    if (!bindings.replaceWithMultiple && !bindings.insertAfter && !isInserted()) {
	        const replaceWithAST = template.ast.fresh(`
            const {replaceWith} = require('putout').operator;
        `);
	        
	        const {types} = bindings;
	        const pathToInsertAfter = types ? types.path.parentPath : strictModePath;
	        
	        isInserted(true);
	        insertAfter(pathToInsertAfter, replaceWithAST);
	        
	        return;
	    }
	    
	    const id = Identifier('replaceWith');
	    const varPath = getVarPath(bindings);
	    
	    varPath.node.id.properties
	        .unshift(ObjectProperty(id, id, false, true));
	};

	function getVarPath(bindings) {
	    const {
	        replaceWithMultiple,
	        insertAfter,
	    } = bindings;
	    
	    if (replaceWithMultiple)
	        return replaceWithMultiple.path;
	    
	    return insertAfter.path;
	}

	convertReplaceWith.traverse = ({push}) => {
	    const isInserted = fullstore();
	    
	    return {
	        CallExpression(path) {
	            const calleePath = path.get('callee');
	            
	            if (!calleePath.isMemberExpression())
	                return;
	            
	            const {object, property} = calleePath.node;
	            
	            if (property.name !== 'replaceWith')
	                return;
	            
	            const program = path.findParent((path) => path.isProgram());
	            
	            push({
	                isInserted,
	                path,
	                object,
	                program,
	                property,
	                calleePath,
	            });
	        },
	    };
	};
	return convertReplaceWith;
}

var convertReplaceWithMultiple = {};

var hasRequiredConvertReplaceWithMultiple;

function requireConvertReplaceWithMultiple () {
	if (hasRequiredConvertReplaceWithMultiple) return convertReplaceWithMultiple;
	hasRequiredConvertReplaceWithMultiple = 1;

	const {
	    operator,
	    template,
	    types,
	} = require$$0$1;

	const {
	    insertAfter,
	    replaceWith,
	} = operator;

	const {
	    Identifier,
	    ObjectProperty,
	} = types;

	convertReplaceWithMultiple.report = () => {
	    return `"operate.replaceWithMultiple" should be called instead of "path.replaceWithMultiple"`;
	};

	const replaceWithAST = template.ast(`
    const {replaceWithMultiple} = require('putout').operate;
`);

	convertReplaceWithMultiple.fix = ({path, calleePath, property, object, program}) => {
	    const strictModePath = program.get('body.0');
	    const {bindings} = strictModePath.scope;
	    
	    replaceWith(calleePath, property);
	    path.node.arguments.unshift(object);
	    
	    if (bindings.replaceWithMultiple)
	        return;
	    
	    if (!bindings.replaceWith && !bindings.insertAfter)
	        return insertAfter(strictModePath, replaceWithAST);
	    
	    const id = Identifier('replaceWithMultiple');
	    
	    const varPath = getVarPath(bindings);
	    varPath.node.id.properties
	        .push(ObjectProperty(id, id, false, true));
	};

	function getVarPath(bindings) {
	    const {
	        replaceWith,
	        insertAfter,
	    } = bindings;
	    
	    if (replaceWith)
	        return replaceWith.path;
	    
	    return insertAfter.path;
	}

	convertReplaceWithMultiple.traverse = ({push}) => ({
	    CallExpression(path) {
	        const calleePath = path.get('callee');
	        
	        if (!calleePath.isMemberExpression())
	            return;
	        
	        const {object, property} = calleePath.node;
	        
	        if (property.name !== 'replaceWithMultiple')
	            return;
	        
	        const program = path.findParent((path) => path.isProgram());
	        
	        push({
	            path,
	            object,
	            program,
	            calleePath,
	            property,
	        });
	    },
	});
	return convertReplaceWithMultiple;
}

var convertReportToFunction = {};

var hasRequiredConvertReportToFunction;

function requireConvertReportToFunction () {
	if (hasRequiredConvertReportToFunction) return convertReportToFunction;
	hasRequiredConvertReportToFunction = 1;

	const {types} = require$$0$1;
	const {
	    isStringLiteral,
	    isTemplateLiteral,
	} = types;

	convertReportToFunction.report = () => `Typeof 'report' should be a 'function'`;

	convertReportToFunction.match = () => ({
	    'module.exports.report = __a': ({__a}) => isStringLiteral(__a) || isTemplateLiteral(__a),
	});

	convertReportToFunction.replace = () => ({
	    'module.exports.report = __a': 'module.exports.report = () => __a',
	});
	return convertReportToFunction;
}

var convertToNoTransformCode = {};

var hasRequiredConvertToNoTransformCode;

function requireConvertToNoTransformCode () {
	if (hasRequiredConvertToNoTransformCode) return convertToNoTransformCode;
	hasRequiredConvertToNoTransformCode = 1;

	const {
	    isIdentifier,
	    Identifier,
	} = require$$0$1.types;

	convertToNoTransformCode.report = () => {
	    return `"noTransformCode" should be called instead of using same arguments twice in "transformCode"`;
	};

	convertToNoTransformCode.traverse = ({push}) => ({
	    CallExpression(path) {
	        const calleePath = path.get('callee');
	        
	        if (!calleePath.isMemberExpression())
	            return;
	        
	        const {object, property} = calleePath.node;
	        
	        if (object.name !== 't' || property.name !== 'transformCode')
	            return;
	        
	        const [a, b] = path.node.arguments;
	        
	        if (!isIdentifier(a) || !isIdentifier(b))
	            return;
	        
	        if (a.name !== b.name)
	            return;
	        
	        push({
	            path,
	            calleePath,
	        });
	    },
	});

	convertToNoTransformCode.fix = ({path, calleePath}) => {
	    calleePath.node.property = Identifier('noTransformCode');
	    path.node.arguments.pop();
	};
	return convertToNoTransformCode;
}

var convertTraverseToInclude = {};

var hasRequiredConvertTraverseToInclude;

function requireConvertTraverseToInclude () {
	if (hasRequiredConvertTraverseToInclude) return convertTraverseToInclude;
	hasRequiredConvertTraverseToInclude = 1;

	const {
	    types,
	    template,
	    operator,
	} = require$$0$1;
	const {StringLiteral} = types;
	const {compare} = operator;

	const isPush = (path) => path.get('value').isIdentifier({
	    name: 'push',
	});

	convertTraverseToInclude.report = () => 'Includer should be used instead of Traverser';

	convertTraverseToInclude.match = () => ({
	    'module.exports.traverse = __a': (vars, path) => {
	        const __aPath = path.get('right.body');
	        
	        if (__aPath.isBlockStatement())
	            return false;
	        
	        for (const propertyPath of __aPath.get('properties')) {
	            if (isPush(propertyPath) || isBlock(propertyPath)) {
	                return true;
	            }
	        }
	        
	        return false;
	    },
	});

	convertTraverseToInclude.replace = () => ({
	    'module.exports.traverse = __a': (vars, path) => {
	        const node = template.ast.fresh('module.exports.include = () => []');
	        const __aPath = path.get('right.body');
	        
	        for (const propertyPath of __aPath.get('properties')) {
	            const name = getName(propertyPath);
	            
	            if (isPush(propertyPath) || isBlock(propertyPath)) {
	                node.right.body.elements.push(StringLiteral(name));
	                propertyPath.remove();
	            }
	        }
	        
	        return node;
	    },
	});

	function getName(propertyPath) {
	    const keyPath = propertyPath.get('key');
	    const {node} = keyPath;
	    
	    if (keyPath.isIdentifier())
	        return node.name;
	    
	    return node.value;
	}

	function isBlock(path) {
	    const bodyPath = path.get('body');
	    
	    if (!bodyPath.isBlockStatement() || bodyPath.node.body.length !== 1)
	        return false;
	    
	    const [node] = bodyPath.node.body;
	    
	    return compare(node, 'push(path)');
	}
	return convertTraverseToInclude;
}

var convertTraverseToReplace = {};

var hasRequiredConvertTraverseToReplace;

function requireConvertTraverseToReplace () {
	if (hasRequiredConvertTraverseToReplace) return convertTraverseToReplace;
	hasRequiredConvertTraverseToReplace = 1;

	const {operator} = require$$0$1;
	const {
	    contains,
	    traverse,
	} = operator;

	convertTraverseToReplace.report = () => 'Replacer should be used instead of Traverser (https://git.io/JqcMn)';

	convertTraverseToReplace.match = () => ({
	    'module.exports.traverse = (__args) => __a': ({__args}, path) => {
	        const program = path.scope.getProgramParent().path;
	        const withFix = contains(program, [
	            'module.exports.fix = __a',
	        ]);
	        
	        if (withFix)
	            return false;
	        
	        if (hasPushCall(path))
	            return false;
	        
	        if (!__args.length)
	            return true;
	        
	        const withPush = contains(__args[0], [
	            'push',
	        ]);
	        
	        if (withPush)
	            return false;
	        
	        return !withPush;
	    },
	});

	convertTraverseToReplace.replace = () => ({
	    'module.exports.traverse = (__args) => __a': 'module.exports.replace = (__args) => __a',
	});

	function hasPushCall(path) {
	    let is = false;
	    
	    traverse(path, {
	        'push(__a)': (path) => {
	            is = true;
	            path.stop();
	        },
	    });
	    
	    return is;
	}
	return convertTraverseToReplace;
}

var convertUrlToDirname = {};

var hasRequiredConvertUrlToDirname;

function requireConvertUrlToDirname () {
	if (hasRequiredConvertUrlToDirname) return convertUrlToDirname;
	hasRequiredConvertUrlToDirname = 1;

	const {operator} = require$$0$1;
	const {isESM} = operator;

	convertUrlToDirname.report = () => `Use 'createTest(__dirname)' instead of 'createTest(import.meta.url)' in CommonJS'`;

	convertUrlToDirname.match = () => ({
	    'createTest(import.meta.url, __a)': (vars, path) => !isESM(path),
	});

	convertUrlToDirname.replace = () => ({
	    'createTest(import.meta.url, __a)': 'createTest(__dirname, __a)',
	});
	return convertUrlToDirname;
}

var types = "import {types} from 'putout'";
var is = "const {is} = types";
var isBinding = "const {isBinding} = types";
var isBlockScoped = "const {isBlockScoped} = types";
var isImmutable = "const {isImmutable} = types";
var isLet = "const {isLet} = types";
var isNode = "const {isNode} = types";
var isNodesEquivalent = "const {isNodesEquivalent} = types";
var isPlaceholderType = "const {isPlaceholderType} = types";
var isReferenced = "const {isReferenced} = types";
var isScope = "const {isScope} = types";
var isSpecifierDefault = "const {isSpecifierDefault} = types";
var isType = "const {isType} = types";
var isValidES3Identifier = "const {isValidES3Identifier} = types";
var isValidIdentifier = "const {isValidIdentifier} = types";
var isVar = "const {isVar} = types";
var ArrayExpression = "const {ArrayExpression} = types";
var AssignmentExpression = "const {AssignmentExpression} = types";
var BinaryExpression = "const {BinaryExpression} = types";
var InterpreterDirective = "const {InterpreterDirective} = types";
var Directive = "const {Directive} = types";
var DirectiveLiteral = "const {DirectiveLiteral} = types";
var BlockStatement = "const {BlockStatement} = types";
var BreakStatement = "const {BreakStatement} = types";
var CallExpression = "const {CallExpression} = types";
var CatchClause = "const {CatchClause} = types";
var ConditionalExpression = "const {ConditionalExpression} = types";
var ContinueStatement = "const {ContinueStatement} = types";
var DebuggerStatement = "const {DebuggerStatement} = types";
var DoWhileStatement = "const {DoWhileStatement} = types";
var EmptyStatement = "const {EmptyStatement} = types";
var ExpressionStatement = "const {ExpressionStatement} = types";
var File = "const {File} = types";
var ForInStatement = "const {ForInStatement} = types";
var ForStatement = "const {ForStatement} = types";
var FunctionDeclaration = "const {FunctionDeclaration} = types";
var FunctionExpression = "const {FunctionExpression} = types";
var Identifier = "const {Identifier} = types";
var IfStatement = "const {IfStatement} = types";
var LabeledStatement = "const {LabeledStatement} = types";
var StringLiteral = "const {StringLiteral} = types";
var NumericLiteral = "const {NumericLiteral} = types";
var NullLiteral = "const {NullLiteral} = types";
var BooleanLiteral = "const {BooleanLiteral} = types";
var RegExpLiteral = "const {RegExpLiteral} = types";
var LogicalExpression = "const {LogicalExpression} = types";
var MemberExpression = "const {MemberExpression} = types";
var NewExpression = "const {NewExpression} = types";
var Program = "const {Program} = types";
var ObjectExpression = "const {ObjectExpression} = types";
var ObjectMethod = "const {ObjectMethod} = types";
var ObjectProperty = "const {ObjectProperty} = types";
var RestElement = "const {RestElement} = types";
var ReturnStatement = "const {ReturnStatement} = types";
var SequenceExpression = "const {SequenceExpression} = types";
var ParenthesizedExpression = "const {ParenthesizedExpression} = types";
var SwitchCase = "const {SwitchCase} = types";
var SwitchStatement = "const {SwitchStatement} = types";
var ThisExpression = "const {ThisExpression} = types";
var ThrowStatement = "const {ThrowStatement} = types";
var TryStatement = "const {TryStatement} = types";
var UnaryExpression = "const {UnaryExpression} = types";
var UpdateExpression = "const {UpdateExpression} = types";
var VariableDeclaration = "const {VariableDeclaration} = types";
var VariableDeclarator = "const {VariableDeclarator} = types";
var WhileStatement = "const {WhileStatement} = types";
var WithStatement = "const {WithStatement} = types";
var AssignmentPattern = "const {AssignmentPattern} = types";
var ArrayPattern = "const {ArrayPattern} = types";
var ArrowFunctionExpression = "const {ArrowFunctionExpression} = types";
var ClassBody = "const {ClassBody} = types";
var ClassExpression = "const {ClassExpression} = types";
var ClassDeclaration = "const {ClassDeclaration} = types";
var ExportAllDeclaration = "const {ExportAllDeclaration} = types";
var ExportDefaultDeclaration = "const {ExportDefaultDeclaration} = types";
var ExportNamedDeclaration = "const {ExportNamedDeclaration} = types";
var ExportSpecifier = "const {ExportSpecifier} = types";
var ForOfStatement = "const {ForOfStatement} = types";
var ImportDeclaration = "const {ImportDeclaration} = types";
var ImportDefaultSpecifier = "const {ImportDefaultSpecifier} = types";
var ImportNamespaceSpecifier = "const {ImportNamespaceSpecifier} = types";
var ImportSpecifier = "const {ImportSpecifier} = types";
var MetaProperty = "const {MetaProperty} = types";
var ClassMethod = "const {ClassMethod} = types";
var ObjectPattern = "const {ObjectPattern} = types";
var SpreadElement = "const {SpreadElement} = types";
var Super = "const {Super} = types";
var TaggedTemplateExpression = "const {TaggedTemplateExpression} = types";
var TemplateElement = "const {TemplateElement} = types";
var TemplateLiteral = "const {TemplateLiteral} = types";
var YieldExpression = "const {YieldExpression} = types";
var AwaitExpression = "const {AwaitExpression} = types";
var Import = "const {Import} = types";
var BigIntLiteral = "const {BigIntLiteral} = types";
var ExportNamespaceSpecifier = "const {ExportNamespaceSpecifier} = types";
var OptionalMemberExpression = "const {OptionalMemberExpression} = types";
var OptionalCallExpression = "const {OptionalCallExpression} = types";
var ClassProperty = "const {ClassProperty} = types";
var ClassPrivateProperty = "const {ClassPrivateProperty} = types";
var ClassPrivateMethod = "const {ClassPrivateMethod} = types";
var PrivateName = "const {PrivateName} = types";
var AnyTypeAnnotation = "const {AnyTypeAnnotation} = types";
var ArrayTypeAnnotation = "const {ArrayTypeAnnotation} = types";
var BooleanTypeAnnotation = "const {BooleanTypeAnnotation} = types";
var BooleanLiteralTypeAnnotation = "const {BooleanLiteralTypeAnnotation} = types";
var NullLiteralTypeAnnotation = "const {NullLiteralTypeAnnotation} = types";
var ClassImplements = "const {ClassImplements} = types";
var DeclareClass = "const {DeclareClass} = types";
var DeclareFunction = "const {DeclareFunction} = types";
var DeclareInterface = "const {DeclareInterface} = types";
var DeclareModule = "const {DeclareModule} = types";
var DeclareModuleExports = "const {DeclareModuleExports} = types";
var DeclareTypeAlias = "const {DeclareTypeAlias} = types";
var DeclareOpaqueType = "const {DeclareOpaqueType} = types";
var DeclareVariable = "const {DeclareVariable} = types";
var DeclareExportDeclaration = "const {DeclareExportDeclaration} = types";
var DeclareExportAllDeclaration = "const {DeclareExportAllDeclaration} = types";
var DeclaredPredicate = "const {DeclaredPredicate} = types";
var ExistsTypeAnnotation = "const {ExistsTypeAnnotation} = types";
var FunctionTypeAnnotation = "const {FunctionTypeAnnotation} = types";
var FunctionTypeParam = "const {FunctionTypeParam} = types";
var GenericTypeAnnotation = "const {GenericTypeAnnotation} = types";
var InferredPredicate = "const {InferredPredicate} = types";
var InterfaceExtends = "const {InterfaceExtends} = types";
var InterfaceDeclaration = "const {InterfaceDeclaration} = types";
var InterfaceTypeAnnotation = "const {InterfaceTypeAnnotation} = types";
var IntersectionTypeAnnotation = "const {IntersectionTypeAnnotation} = types";
var MixedTypeAnnotation = "const {MixedTypeAnnotation} = types";
var EmptyTypeAnnotation = "const {EmptyTypeAnnotation} = types";
var NullableTypeAnnotation = "const {NullableTypeAnnotation} = types";
var NumberLiteralTypeAnnotation = "const {NumberLiteralTypeAnnotation} = types";
var NumberTypeAnnotation = "const {NumberTypeAnnotation} = types";
var ObjectTypeAnnotation = "const {ObjectTypeAnnotation} = types";
var ObjectTypeInternalSlot = "const {ObjectTypeInternalSlot} = types";
var ObjectTypeCallProperty = "const {ObjectTypeCallProperty} = types";
var ObjectTypeIndexer = "const {ObjectTypeIndexer} = types";
var ObjectTypeProperty = "const {ObjectTypeProperty} = types";
var ObjectTypeSpreadProperty = "const {ObjectTypeSpreadProperty} = types";
var OpaqueType = "const {OpaqueType} = types";
var QualifiedTypeIdentifier = "const {QualifiedTypeIdentifier} = types";
var StringLiteralTypeAnnotation = "const {StringLiteralTypeAnnotation} = types";
var StringTypeAnnotation = "const {StringTypeAnnotation} = types";
var SymbolTypeAnnotation = "const {SymbolTypeAnnotation} = types";
var ThisTypeAnnotation = "const {ThisTypeAnnotation} = types";
var TupleTypeAnnotation = "const {TupleTypeAnnotation} = types";
var TypeofTypeAnnotation = "const {TypeofTypeAnnotation} = types";
var TypeAlias = "const {TypeAlias} = types";
var TypeAnnotation = "const {TypeAnnotation} = types";
var TypeCastExpression = "const {TypeCastExpression} = types";
var TypeParameter = "const {TypeParameter} = types";
var TypeParameterDeclaration = "const {TypeParameterDeclaration} = types";
var TypeParameterInstantiation = "const {TypeParameterInstantiation} = types";
var UnionTypeAnnotation = "const {UnionTypeAnnotation} = types";
var Variance = "const {Variance} = types";
var VoidTypeAnnotation = "const {VoidTypeAnnotation} = types";
var EnumDeclaration = "const {EnumDeclaration} = types";
var EnumBooleanBody = "const {EnumBooleanBody} = types";
var EnumNumberBody = "const {EnumNumberBody} = types";
var EnumStringBody = "const {EnumStringBody} = types";
var EnumSymbolBody = "const {EnumSymbolBody} = types";
var EnumBooleanMember = "const {EnumBooleanMember} = types";
var EnumNumberMember = "const {EnumNumberMember} = types";
var EnumStringMember = "const {EnumStringMember} = types";
var EnumDefaultedMember = "const {EnumDefaultedMember} = types";
var IndexedAccessType = "const {IndexedAccessType} = types";
var OptionalIndexedAccessType = "const {OptionalIndexedAccessType} = types";
var JSXAttribute = "const {JSXAttribute} = types";
var JSXClosingElement = "const {JSXClosingElement} = types";
var JSXElement = "const {JSXElement} = types";
var JSXEmptyExpression = "const {JSXEmptyExpression} = types";
var JSXExpressionContainer = "const {JSXExpressionContainer} = types";
var JSXSpreadChild = "const {JSXSpreadChild} = types";
var JSXIdentifier = "const {JSXIdentifier} = types";
var JSXMemberExpression = "const {JSXMemberExpression} = types";
var JSXNamespacedName = "const {JSXNamespacedName} = types";
var JSXOpeningElement = "const {JSXOpeningElement} = types";
var JSXSpreadAttribute = "const {JSXSpreadAttribute} = types";
var JSXText = "const {JSXText} = types";
var JSXFragment = "const {JSXFragment} = types";
var JSXOpeningFragment = "const {JSXOpeningFragment} = types";
var JSXClosingFragment = "const {JSXClosingFragment} = types";
var Noop = "const {Noop} = types";
var Placeholder = "const {Placeholder} = types";
var V8IntrinsicIdentifier = "const {V8IntrinsicIdentifier} = types";
var ArgumentPlaceholder = "const {ArgumentPlaceholder} = types";
var BindExpression = "const {BindExpression} = types";
var ImportAttribute = "const {ImportAttribute} = types";
var Decorator = "const {Decorator} = types";
var DoExpression = "const {DoExpression} = types";
var ExportDefaultSpecifier = "const {ExportDefaultSpecifier} = types";
var RecordExpression = "const {RecordExpression} = types";
var TupleExpression = "const {TupleExpression} = types";
var DecimalLiteral = "const {DecimalLiteral} = types";
var StaticBlock = "const {StaticBlock} = types";
var ModuleExpression = "const {ModuleExpression} = types";
var TopicReference = "const {TopicReference} = types";
var PipelineTopicExpression = "const {PipelineTopicExpression} = types";
var PipelineBareFunction = "const {PipelineBareFunction} = types";
var PipelinePrimaryTopicReference = "const {PipelinePrimaryTopicReference} = types";
var TSParameterProperty = "const {TSParameterProperty} = types";
var TSDeclareFunction = "const {TSDeclareFunction} = types";
var TSDeclareMethod = "const {TSDeclareMethod} = types";
var TSQualifiedName = "const {TSQualifiedName} = types";
var TSCallSignatureDeclaration = "const {TSCallSignatureDeclaration} = types";
var TSConstructSignatureDeclaration = "const {TSConstructSignatureDeclaration} = types";
var TSPropertySignature = "const {TSPropertySignature} = types";
var TSMethodSignature = "const {TSMethodSignature} = types";
var TSIndexSignature = "const {TSIndexSignature} = types";
var TSAnyKeyword = "const {TSAnyKeyword} = types";
var TSBooleanKeyword = "const {TSBooleanKeyword} = types";
var TSBigIntKeyword = "const {TSBigIntKeyword} = types";
var TSIntrinsicKeyword = "const {TSIntrinsicKeyword} = types";
var TSNeverKeyword = "const {TSNeverKeyword} = types";
var TSNullKeyword = "const {TSNullKeyword} = types";
var TSNumberKeyword = "const {TSNumberKeyword} = types";
var TSObjectKeyword = "const {TSObjectKeyword} = types";
var TSStringKeyword = "const {TSStringKeyword} = types";
var TSSymbolKeyword = "const {TSSymbolKeyword} = types";
var TSUndefinedKeyword = "const {TSUndefinedKeyword} = types";
var TSUnknownKeyword = "const {TSUnknownKeyword} = types";
var TSVoidKeyword = "const {TSVoidKeyword} = types";
var TSThisType = "const {TSThisType} = types";
var TSFunctionType = "const {TSFunctionType} = types";
var TSConstructorType = "const {TSConstructorType} = types";
var TSTypeReference = "const {TSTypeReference} = types";
var TSTypePredicate = "const {TSTypePredicate} = types";
var TSTypeQuery = "const {TSTypeQuery} = types";
var TSTypeLiteral = "const {TSTypeLiteral} = types";
var TSArrayType = "const {TSArrayType} = types";
var TSTupleType = "const {TSTupleType} = types";
var TSOptionalType = "const {TSOptionalType} = types";
var TSRestType = "const {TSRestType} = types";
var TSNamedTupleMember = "const {TSNamedTupleMember} = types";
var TSUnionType = "const {TSUnionType} = types";
var TSIntersectionType = "const {TSIntersectionType} = types";
var TSConditionalType = "const {TSConditionalType} = types";
var TSInferType = "const {TSInferType} = types";
var TSParenthesizedType = "const {TSParenthesizedType} = types";
var TSTypeOperator = "const {TSTypeOperator} = types";
var TSIndexedAccessType = "const {TSIndexedAccessType} = types";
var TSMappedType = "const {TSMappedType} = types";
var TSLiteralType = "const {TSLiteralType} = types";
var TSExpressionWithTypeArguments = "const {TSExpressionWithTypeArguments} = types";
var TSInterfaceDeclaration = "const {TSInterfaceDeclaration} = types";
var TSInterfaceBody = "const {TSInterfaceBody} = types";
var TSTypeAliasDeclaration = "const {TSTypeAliasDeclaration} = types";
var TSAsExpression = "const {TSAsExpression} = types";
var TSTypeAssertion = "const {TSTypeAssertion} = types";
var TSEnumDeclaration = "const {TSEnumDeclaration} = types";
var TSEnumMember = "const {TSEnumMember} = types";
var TSModuleDeclaration = "const {TSModuleDeclaration} = types";
var TSModuleBlock = "const {TSModuleBlock} = types";
var TSImportType = "const {TSImportType} = types";
var TSImportEqualsDeclaration = "const {TSImportEqualsDeclaration} = types";
var TSExternalModuleReference = "const {TSExternalModuleReference} = types";
var TSNonNullExpression = "const {TSNonNullExpression} = types";
var TSExportAssignment = "const {TSExportAssignment} = types";
var TSNamespaceExportDeclaration = "const {TSNamespaceExportDeclaration} = types";
var TSTypeAnnotation = "const {TSTypeAnnotation} = types";
var TSTypeParameterInstantiation = "const {TSTypeParameterInstantiation} = types";
var TSTypeParameterDeclaration = "const {TSTypeParameterDeclaration} = types";
var TSTypeParameter = "const {TSTypeParameter} = types";
var NumberLiteral = "const {NumberLiteral} = types";
var RegexLiteral = "const {RegexLiteral} = types";
var RestProperty = "const {RestProperty} = types";
var SpreadProperty = "const {SpreadProperty} = types";
var EXPRESSION_TYPES = "const {EXPRESSION_TYPES} = types";
var BINARY_TYPES = "const {BINARY_TYPES} = types";
var SCOPABLE_TYPES = "const {SCOPABLE_TYPES} = types";
var BLOCKPARENT_TYPES = "const {BLOCKPARENT_TYPES} = types";
var BLOCK_TYPES = "const {BLOCK_TYPES} = types";
var STATEMENT_TYPES = "const {STATEMENT_TYPES} = types";
var TERMINATORLESS_TYPES = "const {TERMINATORLESS_TYPES} = types";
var COMPLETIONSTATEMENT_TYPES = "const {COMPLETIONSTATEMENT_TYPES} = types";
var CONDITIONAL_TYPES = "const {CONDITIONAL_TYPES} = types";
var LOOP_TYPES = "const {LOOP_TYPES} = types";
var WHILE_TYPES = "const {WHILE_TYPES} = types";
var EXPRESSIONWRAPPER_TYPES = "const {EXPRESSIONWRAPPER_TYPES} = types";
var FOR_TYPES = "const {FOR_TYPES} = types";
var FORXSTATEMENT_TYPES = "const {FORXSTATEMENT_TYPES} = types";
var FUNCTION_TYPES = "const {FUNCTION_TYPES} = types";
var FUNCTIONPARENT_TYPES = "const {FUNCTIONPARENT_TYPES} = types";
var PUREISH_TYPES = "const {PUREISH_TYPES} = types";
var DECLARATION_TYPES = "const {DECLARATION_TYPES} = types";
var PATTERNLIKE_TYPES = "const {PATTERNLIKE_TYPES} = types";
var LVAL_TYPES = "const {LVAL_TYPES} = types";
var TSENTITYNAME_TYPES = "const {TSENTITYNAME_TYPES} = types";
var LITERAL_TYPES = "const {LITERAL_TYPES} = types";
var IMMUTABLE_TYPES = "const {IMMUTABLE_TYPES} = types";
var USERWHITESPACABLE_TYPES = "const {USERWHITESPACABLE_TYPES} = types";
var METHOD_TYPES = "const {METHOD_TYPES} = types";
var OBJECTMEMBER_TYPES = "const {OBJECTMEMBER_TYPES} = types";
var PROPERTY_TYPES = "const {PROPERTY_TYPES} = types";
var UNARYLIKE_TYPES = "const {UNARYLIKE_TYPES} = types";
var PATTERN_TYPES = "const {PATTERN_TYPES} = types";
var CLASS_TYPES = "const {CLASS_TYPES} = types";
var MODULEDECLARATION_TYPES = "const {MODULEDECLARATION_TYPES} = types";
var EXPORTDECLARATION_TYPES = "const {EXPORTDECLARATION_TYPES} = types";
var MODULESPECIFIER_TYPES = "const {MODULESPECIFIER_TYPES} = types";
var PRIVATE_TYPES = "const {PRIVATE_TYPES} = types";
var FLOW_TYPES = "const {FLOW_TYPES} = types";
var FLOWTYPE_TYPES = "const {FLOWTYPE_TYPES} = types";
var FLOWBASEANNOTATION_TYPES = "const {FLOWBASEANNOTATION_TYPES} = types";
var FLOWDECLARATION_TYPES = "const {FLOWDECLARATION_TYPES} = types";
var FLOWPREDICATE_TYPES = "const {FLOWPREDICATE_TYPES} = types";
var ENUMBODY_TYPES = "const {ENUMBODY_TYPES} = types";
var ENUMMEMBER_TYPES = "const {ENUMMEMBER_TYPES} = types";
var JSX_TYPES = "const {JSX_TYPES} = types";
var TSTYPEELEMENT_TYPES = "const {TSTYPEELEMENT_TYPES} = types";
var TSTYPE_TYPES = "const {TSTYPE_TYPES} = types";
var TSBASETYPE_TYPES = "const {TSBASETYPE_TYPES} = types";
var STATEMENT_OR_BLOCK_KEYS = "const {STATEMENT_OR_BLOCK_KEYS} = types";
var FLATTENABLE_KEYS = "const {FLATTENABLE_KEYS} = types";
var FOR_INIT_KEYS = "const {FOR_INIT_KEYS} = types";
var COMMENT_KEYS = "const {COMMENT_KEYS} = types";
var LOGICAL_OPERATORS = "const {LOGICAL_OPERATORS} = types";
var UPDATE_OPERATORS = "const {UPDATE_OPERATORS} = types";
var BOOLEAN_NUMBER_BINARY_OPERATORS = "const {BOOLEAN_NUMBER_BINARY_OPERATORS} = types";
var EQUALITY_BINARY_OPERATORS = "const {EQUALITY_BINARY_OPERATORS} = types";
var COMPARISON_BINARY_OPERATORS = "const {COMPARISON_BINARY_OPERATORS} = types";
var BOOLEAN_BINARY_OPERATORS = "const {BOOLEAN_BINARY_OPERATORS} = types";
var NUMBER_BINARY_OPERATORS = "const {NUMBER_BINARY_OPERATORS} = types";
var BINARY_OPERATORS = "const {BINARY_OPERATORS} = types";
var ASSIGNMENT_OPERATORS = "const {ASSIGNMENT_OPERATORS} = types";
var BOOLEAN_UNARY_OPERATORS = "const {BOOLEAN_UNARY_OPERATORS} = types";
var NUMBER_UNARY_OPERATORS = "const {NUMBER_UNARY_OPERATORS} = types";
var STRING_UNARY_OPERATORS = "const {STRING_UNARY_OPERATORS} = types";
var UNARY_OPERATORS = "const {UNARY_OPERATORS} = types";
var INHERIT_KEYS = "const {INHERIT_KEYS} = types";
var BLOCK_SCOPED_SYMBOL = "const {BLOCK_SCOPED_SYMBOL} = types";
var NOT_LOCAL_BINDING = "const {NOT_LOCAL_BINDING} = types";
var VISITOR_KEYS = "const {VISITOR_KEYS} = types";
var ALIAS_KEYS = "const {ALIAS_KEYS} = types";
var FLIPPED_ALIAS_KEYS = "const {FLIPPED_ALIAS_KEYS} = types";
var NODE_FIELDS = "const {NODE_FIELDS} = types";
var BUILDER_KEYS = "const {BUILDER_KEYS} = types";
var DEPRECATED_KEYS = "const {DEPRECATED_KEYS} = types";
var NODE_PARENT_VALIDATIONS = "const {NODE_PARENT_VALIDATIONS} = types";
var PLACEHOLDERS = "const {PLACEHOLDERS} = types";
var PLACEHOLDERS_ALIAS = "const {PLACEHOLDERS_ALIAS} = types";
var PLACEHOLDERS_FLIPPED_ALIAS = "const {PLACEHOLDERS_FLIPPED_ALIAS} = types";
var TYPES = "const {TYPES} = types";
var isArrayExpression = "const {isArrayExpression} = types";
var isAssignmentExpression = "const {isAssignmentExpression} = types";
var isBinaryExpression = "const {isBinaryExpression} = types";
var isInterpreterDirective = "const {isInterpreterDirective} = types";
var isDirective = "const {isDirective} = types";
var isDirectiveLiteral = "const {isDirectiveLiteral} = types";
var isBlockStatement = "const {isBlockStatement} = types";
var isBreakStatement = "const {isBreakStatement} = types";
var isCallExpression = "const {isCallExpression} = types";
var isCatchClause = "const {isCatchClause} = types";
var isConditionalExpression = "const {isConditionalExpression} = types";
var isContinueStatement = "const {isContinueStatement} = types";
var isDebuggerStatement = "const {isDebuggerStatement} = types";
var isDoWhileStatement = "const {isDoWhileStatement} = types";
var isEmptyStatement = "const {isEmptyStatement} = types";
var isExpressionStatement = "const {isExpressionStatement} = types";
var isFile = "const {isFile} = types";
var isForInStatement = "const {isForInStatement} = types";
var isForStatement = "const {isForStatement} = types";
var isFunctionDeclaration = "const {isFunctionDeclaration} = types";
var isFunctionExpression = "const {isFunctionExpression} = types";
var isIdentifier = "const {isIdentifier} = types";
var isIfStatement = "const {isIfStatement} = types";
var isLabeledStatement = "const {isLabeledStatement} = types";
var isStringLiteral = "const {isStringLiteral} = types";
var isNumericLiteral = "const {isNumericLiteral} = types";
var isNullLiteral = "const {isNullLiteral} = types";
var isBooleanLiteral = "const {isBooleanLiteral} = types";
var isRegExpLiteral = "const {isRegExpLiteral} = types";
var isLogicalExpression = "const {isLogicalExpression} = types";
var isMemberExpression = "const {isMemberExpression} = types";
var isNewExpression = "const {isNewExpression} = types";
var isProgram = "const {isProgram} = types";
var isObjectExpression = "const {isObjectExpression} = types";
var isObjectMethod = "const {isObjectMethod} = types";
var isObjectProperty = "const {isObjectProperty} = types";
var isRestElement = "const {isRestElement} = types";
var isReturnStatement = "const {isReturnStatement} = types";
var isSequenceExpression = "const {isSequenceExpression} = types";
var isParenthesizedExpression = "const {isParenthesizedExpression} = types";
var isSwitchCase = "const {isSwitchCase} = types";
var isSwitchStatement = "const {isSwitchStatement} = types";
var isThisExpression = "const {isThisExpression} = types";
var isThrowStatement = "const {isThrowStatement} = types";
var isTryStatement = "const {isTryStatement} = types";
var isUnaryExpression = "const {isUnaryExpression} = types";
var isUpdateExpression = "const {isUpdateExpression} = types";
var isVariableDeclaration = "const {isVariableDeclaration} = types";
var isVariableDeclarator = "const {isVariableDeclarator} = types";
var isWhileStatement = "const {isWhileStatement} = types";
var isWithStatement = "const {isWithStatement} = types";
var isAssignmentPattern = "const {isAssignmentPattern} = types";
var isArrayPattern = "const {isArrayPattern} = types";
var isArrowFunctionExpression = "const {isArrowFunctionExpression} = types";
var isClassBody = "const {isClassBody} = types";
var isClassExpression = "const {isClassExpression} = types";
var isClassDeclaration = "const {isClassDeclaration} = types";
var isExportAllDeclaration = "const {isExportAllDeclaration} = types";
var isExportDefaultDeclaration = "const {isExportDefaultDeclaration} = types";
var isExportNamedDeclaration = "const {isExportNamedDeclaration} = types";
var isExportSpecifier = "const {isExportSpecifier} = types";
var isForOfStatement = "const {isForOfStatement} = types";
var isImportDeclaration = "const {isImportDeclaration} = types";
var isImportDefaultSpecifier = "const {isImportDefaultSpecifier} = types";
var isImportNamespaceSpecifier = "const {isImportNamespaceSpecifier} = types";
var isImportSpecifier = "const {isImportSpecifier} = types";
var isMetaProperty = "const {isMetaProperty} = types";
var isClassMethod = "const {isClassMethod} = types";
var isObjectPattern = "const {isObjectPattern} = types";
var isSpreadElement = "const {isSpreadElement} = types";
var isSuper = "const {isSuper} = types";
var isTaggedTemplateExpression = "const {isTaggedTemplateExpression} = types";
var isTemplateElement = "const {isTemplateElement} = types";
var isTemplateLiteral = "const {isTemplateLiteral} = types";
var isYieldExpression = "const {isYieldExpression} = types";
var isAwaitExpression = "const {isAwaitExpression} = types";
var isImport = "const {isImport} = types";
var isBigIntLiteral = "const {isBigIntLiteral} = types";
var isExportNamespaceSpecifier = "const {isExportNamespaceSpecifier} = types";
var isOptionalMemberExpression = "const {isOptionalMemberExpression} = types";
var isOptionalCallExpression = "const {isOptionalCallExpression} = types";
var isClassProperty = "const {isClassProperty} = types";
var isClassPrivateProperty = "const {isClassPrivateProperty} = types";
var isClassPrivateMethod = "const {isClassPrivateMethod} = types";
var isPrivateName = "const {isPrivateName} = types";
var isAnyTypeAnnotation = "const {isAnyTypeAnnotation} = types";
var isArrayTypeAnnotation = "const {isArrayTypeAnnotation} = types";
var isBooleanTypeAnnotation = "const {isBooleanTypeAnnotation} = types";
var isBooleanLiteralTypeAnnotation = "const {isBooleanLiteralTypeAnnotation} = types";
var isNullLiteralTypeAnnotation = "const {isNullLiteralTypeAnnotation} = types";
var isClassImplements = "const {isClassImplements} = types";
var isDeclareClass = "const {isDeclareClass} = types";
var isDeclareFunction = "const {isDeclareFunction} = types";
var isDeclareInterface = "const {isDeclareInterface} = types";
var isDeclareModule = "const {isDeclareModule} = types";
var isDeclareModuleExports = "const {isDeclareModuleExports} = types";
var isDeclareTypeAlias = "const {isDeclareTypeAlias} = types";
var isDeclareOpaqueType = "const {isDeclareOpaqueType} = types";
var isDeclareVariable = "const {isDeclareVariable} = types";
var isDeclareExportDeclaration = "const {isDeclareExportDeclaration} = types";
var isDeclareExportAllDeclaration = "const {isDeclareExportAllDeclaration} = types";
var isDeclaredPredicate = "const {isDeclaredPredicate} = types";
var isExistsTypeAnnotation = "const {isExistsTypeAnnotation} = types";
var isFunctionTypeAnnotation = "const {isFunctionTypeAnnotation} = types";
var isFunctionTypeParam = "const {isFunctionTypeParam} = types";
var isGenericTypeAnnotation = "const {isGenericTypeAnnotation} = types";
var isInferredPredicate = "const {isInferredPredicate} = types";
var isInterfaceExtends = "const {isInterfaceExtends} = types";
var isInterfaceDeclaration = "const {isInterfaceDeclaration} = types";
var isInterfaceTypeAnnotation = "const {isInterfaceTypeAnnotation} = types";
var isIntersectionTypeAnnotation = "const {isIntersectionTypeAnnotation} = types";
var isMixedTypeAnnotation = "const {isMixedTypeAnnotation} = types";
var isEmptyTypeAnnotation = "const {isEmptyTypeAnnotation} = types";
var isNullableTypeAnnotation = "const {isNullableTypeAnnotation} = types";
var isNumberLiteralTypeAnnotation = "const {isNumberLiteralTypeAnnotation} = types";
var isNumberTypeAnnotation = "const {isNumberTypeAnnotation} = types";
var isObjectTypeAnnotation = "const {isObjectTypeAnnotation} = types";
var isObjectTypeInternalSlot = "const {isObjectTypeInternalSlot} = types";
var isObjectTypeCallProperty = "const {isObjectTypeCallProperty} = types";
var isObjectTypeIndexer = "const {isObjectTypeIndexer} = types";
var isObjectTypeProperty = "const {isObjectTypeProperty} = types";
var isObjectTypeSpreadProperty = "const {isObjectTypeSpreadProperty} = types";
var isOpaqueType = "const {isOpaqueType} = types";
var isQualifiedTypeIdentifier = "const {isQualifiedTypeIdentifier} = types";
var isStringLiteralTypeAnnotation = "const {isStringLiteralTypeAnnotation} = types";
var isStringTypeAnnotation = "const {isStringTypeAnnotation} = types";
var isSymbolTypeAnnotation = "const {isSymbolTypeAnnotation} = types";
var isThisTypeAnnotation = "const {isThisTypeAnnotation} = types";
var isTupleTypeAnnotation = "const {isTupleTypeAnnotation} = types";
var isTypeofTypeAnnotation = "const {isTypeofTypeAnnotation} = types";
var isTypeAlias = "const {isTypeAlias} = types";
var isTypeAnnotation = "const {isTypeAnnotation} = types";
var isTypeCastExpression = "const {isTypeCastExpression} = types";
var isTypeParameter = "const {isTypeParameter} = types";
var isTypeParameterDeclaration = "const {isTypeParameterDeclaration} = types";
var isTypeParameterInstantiation = "const {isTypeParameterInstantiation} = types";
var isUnionTypeAnnotation = "const {isUnionTypeAnnotation} = types";
var isVariance = "const {isVariance} = types";
var isVoidTypeAnnotation = "const {isVoidTypeAnnotation} = types";
var isEnumDeclaration = "const {isEnumDeclaration} = types";
var isEnumBooleanBody = "const {isEnumBooleanBody} = types";
var isEnumNumberBody = "const {isEnumNumberBody} = types";
var isEnumStringBody = "const {isEnumStringBody} = types";
var isEnumSymbolBody = "const {isEnumSymbolBody} = types";
var isEnumBooleanMember = "const {isEnumBooleanMember} = types";
var isEnumNumberMember = "const {isEnumNumberMember} = types";
var isEnumStringMember = "const {isEnumStringMember} = types";
var isEnumDefaultedMember = "const {isEnumDefaultedMember} = types";
var isIndexedAccessType = "const {isIndexedAccessType} = types";
var isOptionalIndexedAccessType = "const {isOptionalIndexedAccessType} = types";
var isJSXAttribute = "const {isJSXAttribute} = types";
var isJSXClosingElement = "const {isJSXClosingElement} = types";
var isJSXElement = "const {isJSXElement} = types";
var isJSXEmptyExpression = "const {isJSXEmptyExpression} = types";
var isJSXExpressionContainer = "const {isJSXExpressionContainer} = types";
var isJSXSpreadChild = "const {isJSXSpreadChild} = types";
var isJSXIdentifier = "const {isJSXIdentifier} = types";
var isJSXMemberExpression = "const {isJSXMemberExpression} = types";
var isJSXNamespacedName = "const {isJSXNamespacedName} = types";
var isJSXOpeningElement = "const {isJSXOpeningElement} = types";
var isJSXSpreadAttribute = "const {isJSXSpreadAttribute} = types";
var isJSXText = "const {isJSXText} = types";
var isJSXFragment = "const {isJSXFragment} = types";
var isJSXOpeningFragment = "const {isJSXOpeningFragment} = types";
var isJSXClosingFragment = "const {isJSXClosingFragment} = types";
var isNoop = "const {isNoop} = types";
var isPlaceholder = "const {isPlaceholder} = types";
var isV8IntrinsicIdentifier = "const {isV8IntrinsicIdentifier} = types";
var isArgumentPlaceholder = "const {isArgumentPlaceholder} = types";
var isBindExpression = "const {isBindExpression} = types";
var isImportAttribute = "const {isImportAttribute} = types";
var isDecorator = "const {isDecorator} = types";
var isDoExpression = "const {isDoExpression} = types";
var isExportDefaultSpecifier = "const {isExportDefaultSpecifier} = types";
var isRecordExpression = "const {isRecordExpression} = types";
var isTupleExpression = "const {isTupleExpression} = types";
var isDecimalLiteral = "const {isDecimalLiteral} = types";
var isStaticBlock = "const {isStaticBlock} = types";
var isModuleExpression = "const {isModuleExpression} = types";
var isTopicReference = "const {isTopicReference} = types";
var isPipelineTopicExpression = "const {isPipelineTopicExpression} = types";
var isPipelineBareFunction = "const {isPipelineBareFunction} = types";
var isPipelinePrimaryTopicReference = "const {isPipelinePrimaryTopicReference} = types";
var isTSParameterProperty = "const {isTSParameterProperty} = types";
var isTSDeclareFunction = "const {isTSDeclareFunction} = types";
var isTSDeclareMethod = "const {isTSDeclareMethod} = types";
var isTSQualifiedName = "const {isTSQualifiedName} = types";
var isTSCallSignatureDeclaration = "const {isTSCallSignatureDeclaration} = types";
var isTSConstructSignatureDeclaration = "const {isTSConstructSignatureDeclaration} = types";
var isTSPropertySignature = "const {isTSPropertySignature} = types";
var isTSMethodSignature = "const {isTSMethodSignature} = types";
var isTSIndexSignature = "const {isTSIndexSignature} = types";
var isTSAnyKeyword = "const {isTSAnyKeyword} = types";
var isTSBooleanKeyword = "const {isTSBooleanKeyword} = types";
var isTSBigIntKeyword = "const {isTSBigIntKeyword} = types";
var isTSIntrinsicKeyword = "const {isTSIntrinsicKeyword} = types";
var isTSNeverKeyword = "const {isTSNeverKeyword} = types";
var isTSNullKeyword = "const {isTSNullKeyword} = types";
var isTSNumberKeyword = "const {isTSNumberKeyword} = types";
var isTSObjectKeyword = "const {isTSObjectKeyword} = types";
var isTSStringKeyword = "const {isTSStringKeyword} = types";
var isTSSymbolKeyword = "const {isTSSymbolKeyword} = types";
var isTSUndefinedKeyword = "const {isTSUndefinedKeyword} = types";
var isTSUnknownKeyword = "const {isTSUnknownKeyword} = types";
var isTSVoidKeyword = "const {isTSVoidKeyword} = types";
var isTSThisType = "const {isTSThisType} = types";
var isTSFunctionType = "const {isTSFunctionType} = types";
var isTSConstructorType = "const {isTSConstructorType} = types";
var isTSTypeReference = "const {isTSTypeReference} = types";
var isTSTypePredicate = "const {isTSTypePredicate} = types";
var isTSTypeQuery = "const {isTSTypeQuery} = types";
var isTSTypeLiteral = "const {isTSTypeLiteral} = types";
var isTSArrayType = "const {isTSArrayType} = types";
var isTSTupleType = "const {isTSTupleType} = types";
var isTSOptionalType = "const {isTSOptionalType} = types";
var isTSRestType = "const {isTSRestType} = types";
var isTSNamedTupleMember = "const {isTSNamedTupleMember} = types";
var isTSUnionType = "const {isTSUnionType} = types";
var isTSIntersectionType = "const {isTSIntersectionType} = types";
var isTSConditionalType = "const {isTSConditionalType} = types";
var isTSInferType = "const {isTSInferType} = types";
var isTSParenthesizedType = "const {isTSParenthesizedType} = types";
var isTSTypeOperator = "const {isTSTypeOperator} = types";
var isTSIndexedAccessType = "const {isTSIndexedAccessType} = types";
var isTSMappedType = "const {isTSMappedType} = types";
var isTSLiteralType = "const {isTSLiteralType} = types";
var isTSExpressionWithTypeArguments = "const {isTSExpressionWithTypeArguments} = types";
var isTSInterfaceDeclaration = "const {isTSInterfaceDeclaration} = types";
var isTSInterfaceBody = "const {isTSInterfaceBody} = types";
var isTSTypeAliasDeclaration = "const {isTSTypeAliasDeclaration} = types";
var isTSAsExpression = "const {isTSAsExpression} = types";
var isTSTypeAssertion = "const {isTSTypeAssertion} = types";
var isTSEnumDeclaration = "const {isTSEnumDeclaration} = types";
var isTSEnumMember = "const {isTSEnumMember} = types";
var isTSModuleDeclaration = "const {isTSModuleDeclaration} = types";
var isTSModuleBlock = "const {isTSModuleBlock} = types";
var isTSImportType = "const {isTSImportType} = types";
var isTSImportEqualsDeclaration = "const {isTSImportEqualsDeclaration} = types";
var isTSExternalModuleReference = "const {isTSExternalModuleReference} = types";
var isTSNonNullExpression = "const {isTSNonNullExpression} = types";
var isTSExportAssignment = "const {isTSExportAssignment} = types";
var isTSNamespaceExportDeclaration = "const {isTSNamespaceExportDeclaration} = types";
var isTSTypeAnnotation = "const {isTSTypeAnnotation} = types";
var isTSTypeParameterInstantiation = "const {isTSTypeParameterInstantiation} = types";
var isTSTypeParameterDeclaration = "const {isTSTypeParameterDeclaration} = types";
var isTSTypeParameter = "const {isTSTypeParameter} = types";
var isExpression = "const {isExpression} = types";
var isBinary = "const {isBinary} = types";
var isScopable = "const {isScopable} = types";
var isBlockParent = "const {isBlockParent} = types";
var isBlock = "const {isBlock} = types";
var isStatement = "const {isStatement} = types";
var isTerminatorless = "const {isTerminatorless} = types";
var isCompletionStatement = "const {isCompletionStatement} = types";
var isConditional = "const {isConditional} = types";
var isLoop = "const {isLoop} = types";
var isWhile = "const {isWhile} = types";
var isExpressionWrapper = "const {isExpressionWrapper} = types";
var isFor = "const {isFor} = types";
var isForXStatement = "const {isForXStatement} = types";
var isFunction = "const {isFunction} = types";
var isFunctionParent = "const {isFunctionParent} = types";
var isPureish = "const {isPureish} = types";
var isDeclaration = "const {isDeclaration} = types";
var isPatternLike = "const {isPatternLike} = types";
var isLVal = "const {isLVal} = types";
var isTSEntityName = "const {isTSEntityName} = types";
var isLiteral = "const {isLiteral} = types";
var isUserWhitespacable = "const {isUserWhitespacable} = types";
var isMethod = "const {isMethod} = types";
var isObjectMember = "const {isObjectMember} = types";
var isProperty = "const {isProperty} = types";
var isUnaryLike = "const {isUnaryLike} = types";
var isPattern = "const {isPattern} = types";
var isClass = "const {isClass} = types";
var isModuleDeclaration = "const {isModuleDeclaration} = types";
var isExportDeclaration = "const {isExportDeclaration} = types";
var isModuleSpecifier = "const {isModuleSpecifier} = types";
var isPrivate = "const {isPrivate} = types";
var isFlow = "const {isFlow} = types";
var isFlowType = "const {isFlowType} = types";
var isFlowBaseAnnotation = "const {isFlowBaseAnnotation} = types";
var isFlowDeclaration = "const {isFlowDeclaration} = types";
var isFlowPredicate = "const {isFlowPredicate} = types";
var isEnumBody = "const {isEnumBody} = types";
var isEnumMember = "const {isEnumMember} = types";
var isJSX = "const {isJSX} = types";
var isTSTypeElement = "const {isTSTypeElement} = types";
var isTSType = "const {isTSType} = types";
var isTSBaseType = "const {isTSBaseType} = types";
var isNumberLiteral = "const {isNumberLiteral} = types";
var isRegexLiteral = "const {isRegexLiteral} = types";
var isRestProperty = "const {isRestProperty} = types";
var isSpreadProperty = "const {isSpreadProperty} = types";
var require$$0 = {
	types: types,
	is: is,
	isBinding: isBinding,
	isBlockScoped: isBlockScoped,
	isImmutable: isImmutable,
	isLet: isLet,
	isNode: isNode,
	isNodesEquivalent: isNodesEquivalent,
	isPlaceholderType: isPlaceholderType,
	isReferenced: isReferenced,
	isScope: isScope,
	isSpecifierDefault: isSpecifierDefault,
	isType: isType,
	isValidES3Identifier: isValidES3Identifier,
	isValidIdentifier: isValidIdentifier,
	isVar: isVar,
	ArrayExpression: ArrayExpression,
	AssignmentExpression: AssignmentExpression,
	BinaryExpression: BinaryExpression,
	InterpreterDirective: InterpreterDirective,
	Directive: Directive,
	DirectiveLiteral: DirectiveLiteral,
	BlockStatement: BlockStatement,
	BreakStatement: BreakStatement,
	CallExpression: CallExpression,
	CatchClause: CatchClause,
	ConditionalExpression: ConditionalExpression,
	ContinueStatement: ContinueStatement,
	DebuggerStatement: DebuggerStatement,
	DoWhileStatement: DoWhileStatement,
	EmptyStatement: EmptyStatement,
	ExpressionStatement: ExpressionStatement,
	File: File,
	ForInStatement: ForInStatement,
	ForStatement: ForStatement,
	FunctionDeclaration: FunctionDeclaration,
	FunctionExpression: FunctionExpression,
	Identifier: Identifier,
	IfStatement: IfStatement,
	LabeledStatement: LabeledStatement,
	StringLiteral: StringLiteral,
	NumericLiteral: NumericLiteral,
	NullLiteral: NullLiteral,
	BooleanLiteral: BooleanLiteral,
	RegExpLiteral: RegExpLiteral,
	LogicalExpression: LogicalExpression,
	MemberExpression: MemberExpression,
	NewExpression: NewExpression,
	Program: Program,
	ObjectExpression: ObjectExpression,
	ObjectMethod: ObjectMethod,
	ObjectProperty: ObjectProperty,
	RestElement: RestElement,
	ReturnStatement: ReturnStatement,
	SequenceExpression: SequenceExpression,
	ParenthesizedExpression: ParenthesizedExpression,
	SwitchCase: SwitchCase,
	SwitchStatement: SwitchStatement,
	ThisExpression: ThisExpression,
	ThrowStatement: ThrowStatement,
	TryStatement: TryStatement,
	UnaryExpression: UnaryExpression,
	UpdateExpression: UpdateExpression,
	VariableDeclaration: VariableDeclaration,
	VariableDeclarator: VariableDeclarator,
	WhileStatement: WhileStatement,
	WithStatement: WithStatement,
	AssignmentPattern: AssignmentPattern,
	ArrayPattern: ArrayPattern,
	ArrowFunctionExpression: ArrowFunctionExpression,
	ClassBody: ClassBody,
	ClassExpression: ClassExpression,
	ClassDeclaration: ClassDeclaration,
	ExportAllDeclaration: ExportAllDeclaration,
	ExportDefaultDeclaration: ExportDefaultDeclaration,
	ExportNamedDeclaration: ExportNamedDeclaration,
	ExportSpecifier: ExportSpecifier,
	ForOfStatement: ForOfStatement,
	ImportDeclaration: ImportDeclaration,
	ImportDefaultSpecifier: ImportDefaultSpecifier,
	ImportNamespaceSpecifier: ImportNamespaceSpecifier,
	ImportSpecifier: ImportSpecifier,
	MetaProperty: MetaProperty,
	ClassMethod: ClassMethod,
	ObjectPattern: ObjectPattern,
	SpreadElement: SpreadElement,
	Super: Super,
	TaggedTemplateExpression: TaggedTemplateExpression,
	TemplateElement: TemplateElement,
	TemplateLiteral: TemplateLiteral,
	YieldExpression: YieldExpression,
	AwaitExpression: AwaitExpression,
	Import: Import,
	BigIntLiteral: BigIntLiteral,
	ExportNamespaceSpecifier: ExportNamespaceSpecifier,
	OptionalMemberExpression: OptionalMemberExpression,
	OptionalCallExpression: OptionalCallExpression,
	ClassProperty: ClassProperty,
	ClassPrivateProperty: ClassPrivateProperty,
	ClassPrivateMethod: ClassPrivateMethod,
	PrivateName: PrivateName,
	AnyTypeAnnotation: AnyTypeAnnotation,
	ArrayTypeAnnotation: ArrayTypeAnnotation,
	BooleanTypeAnnotation: BooleanTypeAnnotation,
	BooleanLiteralTypeAnnotation: BooleanLiteralTypeAnnotation,
	NullLiteralTypeAnnotation: NullLiteralTypeAnnotation,
	ClassImplements: ClassImplements,
	DeclareClass: DeclareClass,
	DeclareFunction: DeclareFunction,
	DeclareInterface: DeclareInterface,
	DeclareModule: DeclareModule,
	DeclareModuleExports: DeclareModuleExports,
	DeclareTypeAlias: DeclareTypeAlias,
	DeclareOpaqueType: DeclareOpaqueType,
	DeclareVariable: DeclareVariable,
	DeclareExportDeclaration: DeclareExportDeclaration,
	DeclareExportAllDeclaration: DeclareExportAllDeclaration,
	DeclaredPredicate: DeclaredPredicate,
	ExistsTypeAnnotation: ExistsTypeAnnotation,
	FunctionTypeAnnotation: FunctionTypeAnnotation,
	FunctionTypeParam: FunctionTypeParam,
	GenericTypeAnnotation: GenericTypeAnnotation,
	InferredPredicate: InferredPredicate,
	InterfaceExtends: InterfaceExtends,
	InterfaceDeclaration: InterfaceDeclaration,
	InterfaceTypeAnnotation: InterfaceTypeAnnotation,
	IntersectionTypeAnnotation: IntersectionTypeAnnotation,
	MixedTypeAnnotation: MixedTypeAnnotation,
	EmptyTypeAnnotation: EmptyTypeAnnotation,
	NullableTypeAnnotation: NullableTypeAnnotation,
	NumberLiteralTypeAnnotation: NumberLiteralTypeAnnotation,
	NumberTypeAnnotation: NumberTypeAnnotation,
	ObjectTypeAnnotation: ObjectTypeAnnotation,
	ObjectTypeInternalSlot: ObjectTypeInternalSlot,
	ObjectTypeCallProperty: ObjectTypeCallProperty,
	ObjectTypeIndexer: ObjectTypeIndexer,
	ObjectTypeProperty: ObjectTypeProperty,
	ObjectTypeSpreadProperty: ObjectTypeSpreadProperty,
	OpaqueType: OpaqueType,
	QualifiedTypeIdentifier: QualifiedTypeIdentifier,
	StringLiteralTypeAnnotation: StringLiteralTypeAnnotation,
	StringTypeAnnotation: StringTypeAnnotation,
	SymbolTypeAnnotation: SymbolTypeAnnotation,
	ThisTypeAnnotation: ThisTypeAnnotation,
	TupleTypeAnnotation: TupleTypeAnnotation,
	TypeofTypeAnnotation: TypeofTypeAnnotation,
	TypeAlias: TypeAlias,
	TypeAnnotation: TypeAnnotation,
	TypeCastExpression: TypeCastExpression,
	TypeParameter: TypeParameter,
	TypeParameterDeclaration: TypeParameterDeclaration,
	TypeParameterInstantiation: TypeParameterInstantiation,
	UnionTypeAnnotation: UnionTypeAnnotation,
	Variance: Variance,
	VoidTypeAnnotation: VoidTypeAnnotation,
	EnumDeclaration: EnumDeclaration,
	EnumBooleanBody: EnumBooleanBody,
	EnumNumberBody: EnumNumberBody,
	EnumStringBody: EnumStringBody,
	EnumSymbolBody: EnumSymbolBody,
	EnumBooleanMember: EnumBooleanMember,
	EnumNumberMember: EnumNumberMember,
	EnumStringMember: EnumStringMember,
	EnumDefaultedMember: EnumDefaultedMember,
	IndexedAccessType: IndexedAccessType,
	OptionalIndexedAccessType: OptionalIndexedAccessType,
	JSXAttribute: JSXAttribute,
	JSXClosingElement: JSXClosingElement,
	JSXElement: JSXElement,
	JSXEmptyExpression: JSXEmptyExpression,
	JSXExpressionContainer: JSXExpressionContainer,
	JSXSpreadChild: JSXSpreadChild,
	JSXIdentifier: JSXIdentifier,
	JSXMemberExpression: JSXMemberExpression,
	JSXNamespacedName: JSXNamespacedName,
	JSXOpeningElement: JSXOpeningElement,
	JSXSpreadAttribute: JSXSpreadAttribute,
	JSXText: JSXText,
	JSXFragment: JSXFragment,
	JSXOpeningFragment: JSXOpeningFragment,
	JSXClosingFragment: JSXClosingFragment,
	Noop: Noop,
	Placeholder: Placeholder,
	V8IntrinsicIdentifier: V8IntrinsicIdentifier,
	ArgumentPlaceholder: ArgumentPlaceholder,
	BindExpression: BindExpression,
	ImportAttribute: ImportAttribute,
	Decorator: Decorator,
	DoExpression: DoExpression,
	ExportDefaultSpecifier: ExportDefaultSpecifier,
	RecordExpression: RecordExpression,
	TupleExpression: TupleExpression,
	DecimalLiteral: DecimalLiteral,
	StaticBlock: StaticBlock,
	ModuleExpression: ModuleExpression,
	TopicReference: TopicReference,
	PipelineTopicExpression: PipelineTopicExpression,
	PipelineBareFunction: PipelineBareFunction,
	PipelinePrimaryTopicReference: PipelinePrimaryTopicReference,
	TSParameterProperty: TSParameterProperty,
	TSDeclareFunction: TSDeclareFunction,
	TSDeclareMethod: TSDeclareMethod,
	TSQualifiedName: TSQualifiedName,
	TSCallSignatureDeclaration: TSCallSignatureDeclaration,
	TSConstructSignatureDeclaration: TSConstructSignatureDeclaration,
	TSPropertySignature: TSPropertySignature,
	TSMethodSignature: TSMethodSignature,
	TSIndexSignature: TSIndexSignature,
	TSAnyKeyword: TSAnyKeyword,
	TSBooleanKeyword: TSBooleanKeyword,
	TSBigIntKeyword: TSBigIntKeyword,
	TSIntrinsicKeyword: TSIntrinsicKeyword,
	TSNeverKeyword: TSNeverKeyword,
	TSNullKeyword: TSNullKeyword,
	TSNumberKeyword: TSNumberKeyword,
	TSObjectKeyword: TSObjectKeyword,
	TSStringKeyword: TSStringKeyword,
	TSSymbolKeyword: TSSymbolKeyword,
	TSUndefinedKeyword: TSUndefinedKeyword,
	TSUnknownKeyword: TSUnknownKeyword,
	TSVoidKeyword: TSVoidKeyword,
	TSThisType: TSThisType,
	TSFunctionType: TSFunctionType,
	TSConstructorType: TSConstructorType,
	TSTypeReference: TSTypeReference,
	TSTypePredicate: TSTypePredicate,
	TSTypeQuery: TSTypeQuery,
	TSTypeLiteral: TSTypeLiteral,
	TSArrayType: TSArrayType,
	TSTupleType: TSTupleType,
	TSOptionalType: TSOptionalType,
	TSRestType: TSRestType,
	TSNamedTupleMember: TSNamedTupleMember,
	TSUnionType: TSUnionType,
	TSIntersectionType: TSIntersectionType,
	TSConditionalType: TSConditionalType,
	TSInferType: TSInferType,
	TSParenthesizedType: TSParenthesizedType,
	TSTypeOperator: TSTypeOperator,
	TSIndexedAccessType: TSIndexedAccessType,
	TSMappedType: TSMappedType,
	TSLiteralType: TSLiteralType,
	TSExpressionWithTypeArguments: TSExpressionWithTypeArguments,
	TSInterfaceDeclaration: TSInterfaceDeclaration,
	TSInterfaceBody: TSInterfaceBody,
	TSTypeAliasDeclaration: TSTypeAliasDeclaration,
	TSAsExpression: TSAsExpression,
	TSTypeAssertion: TSTypeAssertion,
	TSEnumDeclaration: TSEnumDeclaration,
	TSEnumMember: TSEnumMember,
	TSModuleDeclaration: TSModuleDeclaration,
	TSModuleBlock: TSModuleBlock,
	TSImportType: TSImportType,
	TSImportEqualsDeclaration: TSImportEqualsDeclaration,
	TSExternalModuleReference: TSExternalModuleReference,
	TSNonNullExpression: TSNonNullExpression,
	TSExportAssignment: TSExportAssignment,
	TSNamespaceExportDeclaration: TSNamespaceExportDeclaration,
	TSTypeAnnotation: TSTypeAnnotation,
	TSTypeParameterInstantiation: TSTypeParameterInstantiation,
	TSTypeParameterDeclaration: TSTypeParameterDeclaration,
	TSTypeParameter: TSTypeParameter,
	NumberLiteral: NumberLiteral,
	RegexLiteral: RegexLiteral,
	RestProperty: RestProperty,
	SpreadProperty: SpreadProperty,
	EXPRESSION_TYPES: EXPRESSION_TYPES,
	BINARY_TYPES: BINARY_TYPES,
	SCOPABLE_TYPES: SCOPABLE_TYPES,
	BLOCKPARENT_TYPES: BLOCKPARENT_TYPES,
	BLOCK_TYPES: BLOCK_TYPES,
	STATEMENT_TYPES: STATEMENT_TYPES,
	TERMINATORLESS_TYPES: TERMINATORLESS_TYPES,
	COMPLETIONSTATEMENT_TYPES: COMPLETIONSTATEMENT_TYPES,
	CONDITIONAL_TYPES: CONDITIONAL_TYPES,
	LOOP_TYPES: LOOP_TYPES,
	WHILE_TYPES: WHILE_TYPES,
	EXPRESSIONWRAPPER_TYPES: EXPRESSIONWRAPPER_TYPES,
	FOR_TYPES: FOR_TYPES,
	FORXSTATEMENT_TYPES: FORXSTATEMENT_TYPES,
	FUNCTION_TYPES: FUNCTION_TYPES,
	FUNCTIONPARENT_TYPES: FUNCTIONPARENT_TYPES,
	PUREISH_TYPES: PUREISH_TYPES,
	DECLARATION_TYPES: DECLARATION_TYPES,
	PATTERNLIKE_TYPES: PATTERNLIKE_TYPES,
	LVAL_TYPES: LVAL_TYPES,
	TSENTITYNAME_TYPES: TSENTITYNAME_TYPES,
	LITERAL_TYPES: LITERAL_TYPES,
	IMMUTABLE_TYPES: IMMUTABLE_TYPES,
	USERWHITESPACABLE_TYPES: USERWHITESPACABLE_TYPES,
	METHOD_TYPES: METHOD_TYPES,
	OBJECTMEMBER_TYPES: OBJECTMEMBER_TYPES,
	PROPERTY_TYPES: PROPERTY_TYPES,
	UNARYLIKE_TYPES: UNARYLIKE_TYPES,
	PATTERN_TYPES: PATTERN_TYPES,
	CLASS_TYPES: CLASS_TYPES,
	MODULEDECLARATION_TYPES: MODULEDECLARATION_TYPES,
	EXPORTDECLARATION_TYPES: EXPORTDECLARATION_TYPES,
	MODULESPECIFIER_TYPES: MODULESPECIFIER_TYPES,
	PRIVATE_TYPES: PRIVATE_TYPES,
	FLOW_TYPES: FLOW_TYPES,
	FLOWTYPE_TYPES: FLOWTYPE_TYPES,
	FLOWBASEANNOTATION_TYPES: FLOWBASEANNOTATION_TYPES,
	FLOWDECLARATION_TYPES: FLOWDECLARATION_TYPES,
	FLOWPREDICATE_TYPES: FLOWPREDICATE_TYPES,
	ENUMBODY_TYPES: ENUMBODY_TYPES,
	ENUMMEMBER_TYPES: ENUMMEMBER_TYPES,
	JSX_TYPES: JSX_TYPES,
	TSTYPEELEMENT_TYPES: TSTYPEELEMENT_TYPES,
	TSTYPE_TYPES: TSTYPE_TYPES,
	TSBASETYPE_TYPES: TSBASETYPE_TYPES,
	STATEMENT_OR_BLOCK_KEYS: STATEMENT_OR_BLOCK_KEYS,
	FLATTENABLE_KEYS: FLATTENABLE_KEYS,
	FOR_INIT_KEYS: FOR_INIT_KEYS,
	COMMENT_KEYS: COMMENT_KEYS,
	LOGICAL_OPERATORS: LOGICAL_OPERATORS,
	UPDATE_OPERATORS: UPDATE_OPERATORS,
	BOOLEAN_NUMBER_BINARY_OPERATORS: BOOLEAN_NUMBER_BINARY_OPERATORS,
	EQUALITY_BINARY_OPERATORS: EQUALITY_BINARY_OPERATORS,
	COMPARISON_BINARY_OPERATORS: COMPARISON_BINARY_OPERATORS,
	BOOLEAN_BINARY_OPERATORS: BOOLEAN_BINARY_OPERATORS,
	NUMBER_BINARY_OPERATORS: NUMBER_BINARY_OPERATORS,
	BINARY_OPERATORS: BINARY_OPERATORS,
	ASSIGNMENT_OPERATORS: ASSIGNMENT_OPERATORS,
	BOOLEAN_UNARY_OPERATORS: BOOLEAN_UNARY_OPERATORS,
	NUMBER_UNARY_OPERATORS: NUMBER_UNARY_OPERATORS,
	STRING_UNARY_OPERATORS: STRING_UNARY_OPERATORS,
	UNARY_OPERATORS: UNARY_OPERATORS,
	INHERIT_KEYS: INHERIT_KEYS,
	BLOCK_SCOPED_SYMBOL: BLOCK_SCOPED_SYMBOL,
	NOT_LOCAL_BINDING: NOT_LOCAL_BINDING,
	VISITOR_KEYS: VISITOR_KEYS,
	ALIAS_KEYS: ALIAS_KEYS,
	FLIPPED_ALIAS_KEYS: FLIPPED_ALIAS_KEYS,
	NODE_FIELDS: NODE_FIELDS,
	BUILDER_KEYS: BUILDER_KEYS,
	DEPRECATED_KEYS: DEPRECATED_KEYS,
	NODE_PARENT_VALIDATIONS: NODE_PARENT_VALIDATIONS,
	PLACEHOLDERS: PLACEHOLDERS,
	PLACEHOLDERS_ALIAS: PLACEHOLDERS_ALIAS,
	PLACEHOLDERS_FLIPPED_ALIAS: PLACEHOLDERS_FLIPPED_ALIAS,
	TYPES: TYPES,
	isArrayExpression: isArrayExpression,
	isAssignmentExpression: isAssignmentExpression,
	isBinaryExpression: isBinaryExpression,
	isInterpreterDirective: isInterpreterDirective,
	isDirective: isDirective,
	isDirectiveLiteral: isDirectiveLiteral,
	isBlockStatement: isBlockStatement,
	isBreakStatement: isBreakStatement,
	isCallExpression: isCallExpression,
	isCatchClause: isCatchClause,
	isConditionalExpression: isConditionalExpression,
	isContinueStatement: isContinueStatement,
	isDebuggerStatement: isDebuggerStatement,
	isDoWhileStatement: isDoWhileStatement,
	isEmptyStatement: isEmptyStatement,
	isExpressionStatement: isExpressionStatement,
	isFile: isFile,
	isForInStatement: isForInStatement,
	isForStatement: isForStatement,
	isFunctionDeclaration: isFunctionDeclaration,
	isFunctionExpression: isFunctionExpression,
	isIdentifier: isIdentifier,
	isIfStatement: isIfStatement,
	isLabeledStatement: isLabeledStatement,
	isStringLiteral: isStringLiteral,
	isNumericLiteral: isNumericLiteral,
	isNullLiteral: isNullLiteral,
	isBooleanLiteral: isBooleanLiteral,
	isRegExpLiteral: isRegExpLiteral,
	isLogicalExpression: isLogicalExpression,
	isMemberExpression: isMemberExpression,
	isNewExpression: isNewExpression,
	isProgram: isProgram,
	isObjectExpression: isObjectExpression,
	isObjectMethod: isObjectMethod,
	isObjectProperty: isObjectProperty,
	isRestElement: isRestElement,
	isReturnStatement: isReturnStatement,
	isSequenceExpression: isSequenceExpression,
	isParenthesizedExpression: isParenthesizedExpression,
	isSwitchCase: isSwitchCase,
	isSwitchStatement: isSwitchStatement,
	isThisExpression: isThisExpression,
	isThrowStatement: isThrowStatement,
	isTryStatement: isTryStatement,
	isUnaryExpression: isUnaryExpression,
	isUpdateExpression: isUpdateExpression,
	isVariableDeclaration: isVariableDeclaration,
	isVariableDeclarator: isVariableDeclarator,
	isWhileStatement: isWhileStatement,
	isWithStatement: isWithStatement,
	isAssignmentPattern: isAssignmentPattern,
	isArrayPattern: isArrayPattern,
	isArrowFunctionExpression: isArrowFunctionExpression,
	isClassBody: isClassBody,
	isClassExpression: isClassExpression,
	isClassDeclaration: isClassDeclaration,
	isExportAllDeclaration: isExportAllDeclaration,
	isExportDefaultDeclaration: isExportDefaultDeclaration,
	isExportNamedDeclaration: isExportNamedDeclaration,
	isExportSpecifier: isExportSpecifier,
	isForOfStatement: isForOfStatement,
	isImportDeclaration: isImportDeclaration,
	isImportDefaultSpecifier: isImportDefaultSpecifier,
	isImportNamespaceSpecifier: isImportNamespaceSpecifier,
	isImportSpecifier: isImportSpecifier,
	isMetaProperty: isMetaProperty,
	isClassMethod: isClassMethod,
	isObjectPattern: isObjectPattern,
	isSpreadElement: isSpreadElement,
	isSuper: isSuper,
	isTaggedTemplateExpression: isTaggedTemplateExpression,
	isTemplateElement: isTemplateElement,
	isTemplateLiteral: isTemplateLiteral,
	isYieldExpression: isYieldExpression,
	isAwaitExpression: isAwaitExpression,
	isImport: isImport,
	isBigIntLiteral: isBigIntLiteral,
	isExportNamespaceSpecifier: isExportNamespaceSpecifier,
	isOptionalMemberExpression: isOptionalMemberExpression,
	isOptionalCallExpression: isOptionalCallExpression,
	isClassProperty: isClassProperty,
	isClassPrivateProperty: isClassPrivateProperty,
	isClassPrivateMethod: isClassPrivateMethod,
	isPrivateName: isPrivateName,
	isAnyTypeAnnotation: isAnyTypeAnnotation,
	isArrayTypeAnnotation: isArrayTypeAnnotation,
	isBooleanTypeAnnotation: isBooleanTypeAnnotation,
	isBooleanLiteralTypeAnnotation: isBooleanLiteralTypeAnnotation,
	isNullLiteralTypeAnnotation: isNullLiteralTypeAnnotation,
	isClassImplements: isClassImplements,
	isDeclareClass: isDeclareClass,
	isDeclareFunction: isDeclareFunction,
	isDeclareInterface: isDeclareInterface,
	isDeclareModule: isDeclareModule,
	isDeclareModuleExports: isDeclareModuleExports,
	isDeclareTypeAlias: isDeclareTypeAlias,
	isDeclareOpaqueType: isDeclareOpaqueType,
	isDeclareVariable: isDeclareVariable,
	isDeclareExportDeclaration: isDeclareExportDeclaration,
	isDeclareExportAllDeclaration: isDeclareExportAllDeclaration,
	isDeclaredPredicate: isDeclaredPredicate,
	isExistsTypeAnnotation: isExistsTypeAnnotation,
	isFunctionTypeAnnotation: isFunctionTypeAnnotation,
	isFunctionTypeParam: isFunctionTypeParam,
	isGenericTypeAnnotation: isGenericTypeAnnotation,
	isInferredPredicate: isInferredPredicate,
	isInterfaceExtends: isInterfaceExtends,
	isInterfaceDeclaration: isInterfaceDeclaration,
	isInterfaceTypeAnnotation: isInterfaceTypeAnnotation,
	isIntersectionTypeAnnotation: isIntersectionTypeAnnotation,
	isMixedTypeAnnotation: isMixedTypeAnnotation,
	isEmptyTypeAnnotation: isEmptyTypeAnnotation,
	isNullableTypeAnnotation: isNullableTypeAnnotation,
	isNumberLiteralTypeAnnotation: isNumberLiteralTypeAnnotation,
	isNumberTypeAnnotation: isNumberTypeAnnotation,
	isObjectTypeAnnotation: isObjectTypeAnnotation,
	isObjectTypeInternalSlot: isObjectTypeInternalSlot,
	isObjectTypeCallProperty: isObjectTypeCallProperty,
	isObjectTypeIndexer: isObjectTypeIndexer,
	isObjectTypeProperty: isObjectTypeProperty,
	isObjectTypeSpreadProperty: isObjectTypeSpreadProperty,
	isOpaqueType: isOpaqueType,
	isQualifiedTypeIdentifier: isQualifiedTypeIdentifier,
	isStringLiteralTypeAnnotation: isStringLiteralTypeAnnotation,
	isStringTypeAnnotation: isStringTypeAnnotation,
	isSymbolTypeAnnotation: isSymbolTypeAnnotation,
	isThisTypeAnnotation: isThisTypeAnnotation,
	isTupleTypeAnnotation: isTupleTypeAnnotation,
	isTypeofTypeAnnotation: isTypeofTypeAnnotation,
	isTypeAlias: isTypeAlias,
	isTypeAnnotation: isTypeAnnotation,
	isTypeCastExpression: isTypeCastExpression,
	isTypeParameter: isTypeParameter,
	isTypeParameterDeclaration: isTypeParameterDeclaration,
	isTypeParameterInstantiation: isTypeParameterInstantiation,
	isUnionTypeAnnotation: isUnionTypeAnnotation,
	isVariance: isVariance,
	isVoidTypeAnnotation: isVoidTypeAnnotation,
	isEnumDeclaration: isEnumDeclaration,
	isEnumBooleanBody: isEnumBooleanBody,
	isEnumNumberBody: isEnumNumberBody,
	isEnumStringBody: isEnumStringBody,
	isEnumSymbolBody: isEnumSymbolBody,
	isEnumBooleanMember: isEnumBooleanMember,
	isEnumNumberMember: isEnumNumberMember,
	isEnumStringMember: isEnumStringMember,
	isEnumDefaultedMember: isEnumDefaultedMember,
	isIndexedAccessType: isIndexedAccessType,
	isOptionalIndexedAccessType: isOptionalIndexedAccessType,
	isJSXAttribute: isJSXAttribute,
	isJSXClosingElement: isJSXClosingElement,
	isJSXElement: isJSXElement,
	isJSXEmptyExpression: isJSXEmptyExpression,
	isJSXExpressionContainer: isJSXExpressionContainer,
	isJSXSpreadChild: isJSXSpreadChild,
	isJSXIdentifier: isJSXIdentifier,
	isJSXMemberExpression: isJSXMemberExpression,
	isJSXNamespacedName: isJSXNamespacedName,
	isJSXOpeningElement: isJSXOpeningElement,
	isJSXSpreadAttribute: isJSXSpreadAttribute,
	isJSXText: isJSXText,
	isJSXFragment: isJSXFragment,
	isJSXOpeningFragment: isJSXOpeningFragment,
	isJSXClosingFragment: isJSXClosingFragment,
	isNoop: isNoop,
	isPlaceholder: isPlaceholder,
	isV8IntrinsicIdentifier: isV8IntrinsicIdentifier,
	isArgumentPlaceholder: isArgumentPlaceholder,
	isBindExpression: isBindExpression,
	isImportAttribute: isImportAttribute,
	isDecorator: isDecorator,
	isDoExpression: isDoExpression,
	isExportDefaultSpecifier: isExportDefaultSpecifier,
	isRecordExpression: isRecordExpression,
	isTupleExpression: isTupleExpression,
	isDecimalLiteral: isDecimalLiteral,
	isStaticBlock: isStaticBlock,
	isModuleExpression: isModuleExpression,
	isTopicReference: isTopicReference,
	isPipelineTopicExpression: isPipelineTopicExpression,
	isPipelineBareFunction: isPipelineBareFunction,
	isPipelinePrimaryTopicReference: isPipelinePrimaryTopicReference,
	isTSParameterProperty: isTSParameterProperty,
	isTSDeclareFunction: isTSDeclareFunction,
	isTSDeclareMethod: isTSDeclareMethod,
	isTSQualifiedName: isTSQualifiedName,
	isTSCallSignatureDeclaration: isTSCallSignatureDeclaration,
	isTSConstructSignatureDeclaration: isTSConstructSignatureDeclaration,
	isTSPropertySignature: isTSPropertySignature,
	isTSMethodSignature: isTSMethodSignature,
	isTSIndexSignature: isTSIndexSignature,
	isTSAnyKeyword: isTSAnyKeyword,
	isTSBooleanKeyword: isTSBooleanKeyword,
	isTSBigIntKeyword: isTSBigIntKeyword,
	isTSIntrinsicKeyword: isTSIntrinsicKeyword,
	isTSNeverKeyword: isTSNeverKeyword,
	isTSNullKeyword: isTSNullKeyword,
	isTSNumberKeyword: isTSNumberKeyword,
	isTSObjectKeyword: isTSObjectKeyword,
	isTSStringKeyword: isTSStringKeyword,
	isTSSymbolKeyword: isTSSymbolKeyword,
	isTSUndefinedKeyword: isTSUndefinedKeyword,
	isTSUnknownKeyword: isTSUnknownKeyword,
	isTSVoidKeyword: isTSVoidKeyword,
	isTSThisType: isTSThisType,
	isTSFunctionType: isTSFunctionType,
	isTSConstructorType: isTSConstructorType,
	isTSTypeReference: isTSTypeReference,
	isTSTypePredicate: isTSTypePredicate,
	isTSTypeQuery: isTSTypeQuery,
	isTSTypeLiteral: isTSTypeLiteral,
	isTSArrayType: isTSArrayType,
	isTSTupleType: isTSTupleType,
	isTSOptionalType: isTSOptionalType,
	isTSRestType: isTSRestType,
	isTSNamedTupleMember: isTSNamedTupleMember,
	isTSUnionType: isTSUnionType,
	isTSIntersectionType: isTSIntersectionType,
	isTSConditionalType: isTSConditionalType,
	isTSInferType: isTSInferType,
	isTSParenthesizedType: isTSParenthesizedType,
	isTSTypeOperator: isTSTypeOperator,
	isTSIndexedAccessType: isTSIndexedAccessType,
	isTSMappedType: isTSMappedType,
	isTSLiteralType: isTSLiteralType,
	isTSExpressionWithTypeArguments: isTSExpressionWithTypeArguments,
	isTSInterfaceDeclaration: isTSInterfaceDeclaration,
	isTSInterfaceBody: isTSInterfaceBody,
	isTSTypeAliasDeclaration: isTSTypeAliasDeclaration,
	isTSAsExpression: isTSAsExpression,
	isTSTypeAssertion: isTSTypeAssertion,
	isTSEnumDeclaration: isTSEnumDeclaration,
	isTSEnumMember: isTSEnumMember,
	isTSModuleDeclaration: isTSModuleDeclaration,
	isTSModuleBlock: isTSModuleBlock,
	isTSImportType: isTSImportType,
	isTSImportEqualsDeclaration: isTSImportEqualsDeclaration,
	isTSExternalModuleReference: isTSExternalModuleReference,
	isTSNonNullExpression: isTSNonNullExpression,
	isTSExportAssignment: isTSExportAssignment,
	isTSNamespaceExportDeclaration: isTSNamespaceExportDeclaration,
	isTSTypeAnnotation: isTSTypeAnnotation,
	isTSTypeParameterInstantiation: isTSTypeParameterInstantiation,
	isTSTypeParameterDeclaration: isTSTypeParameterDeclaration,
	isTSTypeParameter: isTSTypeParameter,
	isExpression: isExpression,
	isBinary: isBinary,
	isScopable: isScopable,
	isBlockParent: isBlockParent,
	isBlock: isBlock,
	isStatement: isStatement,
	isTerminatorless: isTerminatorless,
	isCompletionStatement: isCompletionStatement,
	isConditional: isConditional,
	isLoop: isLoop,
	isWhile: isWhile,
	isExpressionWrapper: isExpressionWrapper,
	isFor: isFor,
	isForXStatement: isForXStatement,
	isFunction: isFunction,
	isFunctionParent: isFunctionParent,
	isPureish: isPureish,
	isDeclaration: isDeclaration,
	isPatternLike: isPatternLike,
	isLVal: isLVal,
	isTSEntityName: isTSEntityName,
	isLiteral: isLiteral,
	isUserWhitespacable: isUserWhitespacable,
	isMethod: isMethod,
	isObjectMember: isObjectMember,
	isProperty: isProperty,
	isUnaryLike: isUnaryLike,
	isPattern: isPattern,
	isClass: isClass,
	isModuleDeclaration: isModuleDeclaration,
	isExportDeclaration: isExportDeclaration,
	isModuleSpecifier: isModuleSpecifier,
	isPrivate: isPrivate,
	isFlow: isFlow,
	isFlowType: isFlowType,
	isFlowBaseAnnotation: isFlowBaseAnnotation,
	isFlowDeclaration: isFlowDeclaration,
	isFlowPredicate: isFlowPredicate,
	isEnumBody: isEnumBody,
	isEnumMember: isEnumMember,
	isJSX: isJSX,
	isTSTypeElement: isTSTypeElement,
	isTSType: isTSType,
	isTSBaseType: isTSBaseType,
	isNumberLiteral: isNumberLiteral,
	isRegexLiteral: isRegexLiteral,
	isRestProperty: isRestProperty,
	isSpreadProperty: isSpreadProperty
};

var operator;
var hasRequiredOperator;

function requireOperator () {
	if (hasRequiredOperator) return operator;
	hasRequiredOperator = 1;

	operator = {
	    operator: `import {operator} from 'putout'`,
	    compare: `const {compare} = operator`,
	    compareAll: `const {compareAll} = operator`,
	    compareAny: `const {compareAny} = operator`,
	    compute: `const {compute} = operator`,
	    contains: `const {contains} = operator`,
	    declare: `const {declare} = operator`,
	    extract: `const {extract} = operator`,
	    getPathAfterImports: `const {getPathAfterImports} = operator`,
	    traverse: `const {traverse} = operator`,
	    isSimpleRegExp: `const {isSimpleRegExp} = operator`,
	    getTemplateValues: `const {getTemplateValues} = operator`,
	    addArgs: `const {addArgs} = operator`,
	    replaceWith: `const {replaceWith} = operator`,
	    replaceWithMultiple: `const {replaceWithMultiple} = operator`,
	    remove: 'const {remove} = operator',
	    isESM: `const {isESM} = operator`,
	    getProperty: `const {getProperty} = operator`,
	    getProperties: `const {getProperties} = operator`,
	};
	return operator;
}

var declarations;
var hasRequiredDeclarations;

function requireDeclarations () {
	if (hasRequiredDeclarations) return declarations;
	hasRequiredDeclarations = 1;

	const types = require$$0;
	const operator = requireOperator();

	declarations = {
	    template: `import {template} from 'putout'`,
	    createTest: `import {createTest} from '@putout/test'`,
	    ...operator,
	    ...types,
	};
	return declarations;
}

var declare_1;
var hasRequiredDeclare;

function requireDeclare () {
	if (hasRequiredDeclare) return declare_1;
	hasRequiredDeclare = 1;

	const {operator} = require$$0$1;
	const declarations = requireDeclarations();
	const {declare} = operator;

	declare_1 = declare(declarations);
	return declare_1;
}

var includer = {};

var hasRequiredIncluder;

function requireIncluder () {
	if (hasRequiredIncluder) return includer;
	hasRequiredIncluder = 1;

	includer.report = () => 'Includer functions should return array (https://git.io/Jyndl)';

	includer.replace = () => ({
	    'module.exports.include = () => "__a"': 'module.exports.include = ["__a"]',
	    'module.exports.exclude = () => "__a"': 'module.exports.exclude = ["__a"]',
	    
	    'module.exports.include = ["__a"]': 'module.exports.include = () => ["__a"]',
	    'module.exports.exclude = ["__a"]': 'module.exports.exclude = () => ["__a"]',
	    
	    'module.exports.include = "__a"': 'module.exports.include = ["__a"]',
	    'module.exports.exclude = "__a"': 'module.exports.exclude= ["__a"]',
	});
	return includer;
}

var moveRequireOnTopLevel = {};

var justCamelCase;
var hasRequiredJustCamelCase;

function requireJustCamelCase () {
	if (hasRequiredJustCamelCase) return justCamelCase;
	hasRequiredJustCamelCase = 1;
	justCamelCase = camelCase;

	// any combination of spaces and punctuation characters
	// thanks to http://stackoverflow.com/a/25575009
	var wordSeparatorsRegEx = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;

	var basicCamelRegEx = /^[a-z\u00E0-\u00FCA-Z\u00C0-\u00DC][\d|a-z\u00E0-\u00FCA-Z\u00C0-\u00DC]*$/;
	var fourOrMoreConsecutiveCapsRegEx = /([A-Z\u00C0-\u00DC]{4,})/g;
	var allCapsRegEx = /^[A-Z\u00C0-\u00DC]+$/;

	function camelCase(str) {
	  var words = str.split(wordSeparatorsRegEx);
	  var len = words.length;
	  var mappedWords = new Array(len);
	  for (var i = 0; i < len; i++) {
	    var word = words[i];
	    if (word === '') {
	      continue;
	    }
	    var isCamelCase = basicCamelRegEx.test(word) && !allCapsRegEx.test(word);
	    if (isCamelCase) {
	      word = word.replace(fourOrMoreConsecutiveCapsRegEx, function(match, p1, offset) {
	        return deCap(match, word.length - offset - match.length == 0);
	      });
	    }
	    var firstLetter = word[0];
	    firstLetter = i > 0 ? firstLetter.toUpperCase() : firstLetter.toLowerCase();
	    mappedWords[i] = firstLetter + (!isCamelCase ? word.slice(1).toLowerCase() : word.slice(1));
	  }
	  return mappedWords.join('');
	}

	function deCap(match, endOfWord) {
	  var arr = match.split('');
	  var first = arr.shift().toUpperCase();
	  var last = endOfWord ? arr.pop().toLowerCase() : arr.pop();
	  return first + arr.join('').toLowerCase() + last;
	}
	return justCamelCase;
}

var hasRequiredMoveRequireOnTopLevel;

function requireMoveRequireOnTopLevel () {
	if (hasRequiredMoveRequireOnTopLevel) return moveRequireOnTopLevel;
	hasRequiredMoveRequireOnTopLevel = 1;

	const justCamelCase = requireJustCamelCase();
	const {
	    types,
	    template,
	} = require$$0$1;

	const TEST = `
    const test = require('@putout/test')(__dirname, {
        __a: __b
    });
`;

	const TRANSFORM = `
    t.transform(__c, {
        __a: __b
    });
`;

	const {
	    Identifier,
	    isIdentifier,
	    isObjectExpression,
	} = types;

	moveRequireOnTopLevel.report = () => 'Move require on top level';

	moveRequireOnTopLevel.match = () => ({
	    [TEST]: ({__b}) => !isIdentifier(__b),
	    [TRANSFORM]: ({__b}) => !isIdentifier(__b) && !isObjectExpression(__b),
	});

	moveRequireOnTopLevel.replace = () => ({
	    [TEST]: (vars, path) => {
	        const name = declareRequire(vars, path);
	        const {__a} = vars;
	        const value = __a.value || __a.name;
	        
	        return `
            const test = require('@putout/test')(__dirname, {
                '${value}': ${name},
            });
        `;
	    },
	    [TRANSFORM]: (vars, path) => {
	        const name = declareRequire(vars, path);
	        const {__a} = vars;
	        const value = __a.value || __a.name;
	        
	        return `
            t.transform(__c, {
                '${value}': ${name},
            });
    `;
	    },
	});

	const buildRequire = template(`const NAME = REQUIRE`);

	function declareRequire({__a, __b}, path) {
	    const shortName = (__a.value || __a.name).split('/').pop();
	    const name = justCamelCase(shortName);
	    const requireNode = buildRequire({
	        NAME: Identifier(name),
	        REQUIRE: __b,
	    });
	    
	    if (path.scope.hasBinding(name))
	        return name;
	    
	    const programPath = path.scope.getProgramParent().path;
	    programPath.node.body.unshift(requireNode);
	    
	    return name;
	}
	return moveRequireOnTopLevel;
}

var renameOperateToOperator = {};

var hasRequiredRenameOperateToOperator;

function requireRenameOperateToOperator () {
	if (hasRequiredRenameOperateToOperator) return renameOperateToOperator;
	hasRequiredRenameOperateToOperator = 1;

	renameOperateToOperator.report = () => '"operator" should be used instead of "operate"';

	renameOperateToOperator.include = () => [
	    'Program',
	];

	renameOperateToOperator.filter = (path) => {
	    const noOperator = !path.scope.bindings.operator;
	    const yesOperate = path.scope.bindings.operate;
	    
	    return noOperator && yesOperate;
	};

	renameOperateToOperator.fix = (path) => {
	    path.scope.rename('operate', 'operator');
	};
	return renameOperateToOperator;
}

var replaceOperateWithOperator = {};

var hasRequiredReplaceOperateWithOperator;

function requireReplaceOperateWithOperator () {
	if (hasRequiredReplaceOperateWithOperator) return replaceOperateWithOperator;
	hasRequiredReplaceOperateWithOperator = 1;

	replaceOperateWithOperator.report = () => '"operator" should be used instead of "operate"';

	replaceOperateWithOperator.replace = () => ({
	    'const __object = require("putout").operate': 'const __object = require("putout").operator',
	});
	return replaceOperateWithOperator;
}

var replaceTestMessage = {};

var hasRequiredReplaceTestMessage;

function requireReplaceTestMessage () {
	if (hasRequiredReplaceTestMessage) return replaceTestMessage;
	hasRequiredReplaceTestMessage = 1;

	const {types} = require$$0$1;

	const {isCallExpression} = types;

	replaceTestMessage.report = ({correct, operatorPath}) => {
	    const calleePath = operatorPath.get('callee');
	    return `Use '${correct}' in test message when using '${calleePath}()'`;
	};

	replaceTestMessage.fix = ({path, incorrect, correct}) => {
	    path.node.value = path.node.value.replace(incorrect, correct);
	};

	replaceTestMessage.traverse = ({push}) => ({
	    't.transform(__a)': convert({
	        push,
	        incorrect: /: no transform/,
	        correct: ': transform',
	    }),
	    't.noTransform(__a)': convert({
	        push,
	        incorrect: /: transform/,
	        correct: ': no transform',
	    }),
	    't.report(__a)': convert({
	        push,
	        incorrect: /: no report/,
	        correct: ': report',
	    }),
	    't.noReport(__a)': convert({
	        push,
	        incorrect: /: (report|transform|no transform)/,
	        correct: ': no report',
	    }),
	});

	const convert = ({push, correct, incorrect}) => (path) => {
	    const [is, messagePath] = isCorrect({
	        incorrect,
	        path,
	    });
	    
	    if (is)
	        return;
	    
	    push({
	        path: messagePath,
	        operatorPath: path,
	        incorrect,
	        correct,
	    });
	};

	const CORRECT = true;

	function isCorrect({path, incorrect}) {
	    const calleePath = path.findParent(isCallExpression);
	    
	    if (!calleePath)
	        return [CORRECT];
	    
	    const messagePath = calleePath.get('arguments.0');
	    
	    if (!messagePath.isStringLiteral())
	        return [CORRECT];
	    
	    const {value} = messagePath.node;
	    const is = !incorrect.test(value);
	    
	    return [is, messagePath];
	}
	return replaceTestMessage;
}

var shortenImports = {};

var hasRequiredShortenImports;

function requireShortenImports () {
	if (hasRequiredShortenImports) return shortenImports;
	hasRequiredShortenImports = 1;

	shortenImports.report = () => 'Shorten require path to putout exports';

	shortenImports.replace = () => ({
	    'require("putout/lib/cli/process-file")': 'require("putout/process-file")',
	    'require("putout/lib/parse-options")': 'require("putout/parse-options")',
	});
	return shortenImports;
}

var dynamicModules;

function getDynamicModules() {
	return dynamicModules || (dynamicModules = {
		"/node_modules/@putout/plugin-putout/lib/add-args": requireAddArgs,
		"/node_modules/@putout/plugin-putout/lib/add-args/index.js": requireAddArgs,
		"/node_modules/@putout/plugin-putout/lib/add-push": requireAddPush,
		"/node_modules/@putout/plugin-putout/lib/add-push/index.js": requireAddPush,
		"/node_modules/@putout/plugin-putout/lib/apply-async-formatter": requireApplyAsyncFormatter,
		"/node_modules/@putout/plugin-putout/lib/apply-async-formatter/index.js": requireApplyAsyncFormatter,
		"/node_modules/@putout/plugin-putout/lib/apply-create-test": requireApplyCreateTest,
		"/node_modules/@putout/plugin-putout/lib/apply-create-test/index.js": requireApplyCreateTest,
		"/node_modules/@putout/plugin-putout/lib/apply-processors-destructuring": requireApplyProcessorsDestructuring,
		"/node_modules/@putout/plugin-putout/lib/apply-processors-destructuring/index.js": requireApplyProcessorsDestructuring,
		"/node_modules/@putout/plugin-putout/lib/apply-remove": requireApplyRemove,
		"/node_modules/@putout/plugin-putout/lib/apply-remove/index.js": requireApplyRemove,
		"/node_modules/@putout/plugin-putout/lib/check-replace-code": requireCheckReplaceCode,
		"/node_modules/@putout/plugin-putout/lib/check-replace-code/index.js": requireCheckReplaceCode,
		"/node_modules/@putout/plugin-putout/lib/convert-add-argument-to-add-args": requireConvertAddArgumentToAddArgs,
		"/node_modules/@putout/plugin-putout/lib/convert-add-argument-to-add-args/index.js": requireConvertAddArgumentToAddArgs,
		"/node_modules/@putout/plugin-putout/lib/convert-babel-types": requireConvertBabelTypes,
		"/node_modules/@putout/plugin-putout/lib/convert-babel-types/index.js": requireConvertBabelTypes,
		"/node_modules/@putout/plugin-putout/lib/convert-destructuring-to-identifier": requireConvertDestructuringToIdentifier,
		"/node_modules/@putout/plugin-putout/lib/convert-destructuring-to-identifier/index.js": requireConvertDestructuringToIdentifier,
		"/node_modules/@putout/plugin-putout/lib/convert-dirname-to-url": requireConvertDirnameToUrl,
		"/node_modules/@putout/plugin-putout/lib/convert-dirname-to-url/index.js": requireConvertDirnameToUrl,
		"/node_modules/@putout/plugin-putout/lib/convert-find-to-traverse": requireConvertFindToTraverse,
		"/node_modules/@putout/plugin-putout/lib/convert-find-to-traverse/index.js": requireConvertFindToTraverse,
		"/node_modules/@putout/plugin-putout/lib/convert-match-to-function": requireConvertMatchToFunction,
		"/node_modules/@putout/plugin-putout/lib/convert-match-to-function/index.js": requireConvertMatchToFunction,
		"/node_modules/@putout/plugin-putout/lib/convert-method-to-property": requireConvertMethodToProperty,
		"/node_modules/@putout/plugin-putout/lib/convert-method-to-property/index.js": requireConvertMethodToProperty,
		"/node_modules/@putout/plugin-putout/lib/convert-node-to-path-in-get-template-values": requireConvertNodeToPathInGetTemplateValues,
		"/node_modules/@putout/plugin-putout/lib/convert-node-to-path-in-get-template-values/index.js": requireConvertNodeToPathInGetTemplateValues,
		"/node_modules/@putout/plugin-putout/lib/convert-number-to-numeric": requireConvertNumberToNumeric,
		"/node_modules/@putout/plugin-putout/lib/convert-number-to-numeric/index.js": requireConvertNumberToNumeric,
		"/node_modules/@putout/plugin-putout/lib/convert-process-to-find": requireConvertProcessToFind,
		"/node_modules/@putout/plugin-putout/lib/convert-process-to-find/index.js": requireConvertProcessToFind,
		"/node_modules/@putout/plugin-putout/lib/convert-putout-test-to-create-test": requireConvertPutoutTestToCreateTest,
		"/node_modules/@putout/plugin-putout/lib/convert-putout-test-to-create-test/index.js": requireConvertPutoutTestToCreateTest,
		"/node_modules/@putout/plugin-putout/lib/convert-replace-to-function": requireConvertReplaceToFunction,
		"/node_modules/@putout/plugin-putout/lib/convert-replace-to-function/index.js": requireConvertReplaceToFunction,
		"/node_modules/@putout/plugin-putout/lib/convert-replace-with": requireConvertReplaceWith,
		"/node_modules/@putout/plugin-putout/lib/convert-replace-with/index.js": requireConvertReplaceWith,
		"/node_modules/@putout/plugin-putout/lib/convert-replace-with-multiple": requireConvertReplaceWithMultiple,
		"/node_modules/@putout/plugin-putout/lib/convert-replace-with-multiple/index.js": requireConvertReplaceWithMultiple,
		"/node_modules/@putout/plugin-putout/lib/convert-report-to-function": requireConvertReportToFunction,
		"/node_modules/@putout/plugin-putout/lib/convert-report-to-function/index.js": requireConvertReportToFunction,
		"/node_modules/@putout/plugin-putout/lib/convert-to-no-transform-code": requireConvertToNoTransformCode,
		"/node_modules/@putout/plugin-putout/lib/convert-to-no-transform-code/index.js": requireConvertToNoTransformCode,
		"/node_modules/@putout/plugin-putout/lib/convert-traverse-to-include": requireConvertTraverseToInclude,
		"/node_modules/@putout/plugin-putout/lib/convert-traverse-to-include/index.js": requireConvertTraverseToInclude,
		"/node_modules/@putout/plugin-putout/lib/convert-traverse-to-replace": requireConvertTraverseToReplace,
		"/node_modules/@putout/plugin-putout/lib/convert-traverse-to-replace/index.js": requireConvertTraverseToReplace,
		"/node_modules/@putout/plugin-putout/lib/convert-url-to-dirname": requireConvertUrlToDirname,
		"/node_modules/@putout/plugin-putout/lib/convert-url-to-dirname/index.js": requireConvertUrlToDirname,
		"/node_modules/@putout/plugin-putout/lib/declare": requireDeclare,
		"/node_modules/@putout/plugin-putout/lib/declare/index.js": requireDeclare,
		"/node_modules/@putout/plugin-putout/lib/includer": requireIncluder,
		"/node_modules/@putout/plugin-putout/lib/includer/index.js": requireIncluder,
		"/node_modules/@putout/plugin-putout/lib/move-require-on-top-level": requireMoveRequireOnTopLevel,
		"/node_modules/@putout/plugin-putout/lib/move-require-on-top-level/index.js": requireMoveRequireOnTopLevel,
		"/node_modules/@putout/plugin-putout/lib/rename-operate-to-operator": requireRenameOperateToOperator,
		"/node_modules/@putout/plugin-putout/lib/rename-operate-to-operator/index.js": requireRenameOperateToOperator,
		"/node_modules/@putout/plugin-putout/lib/replace-operate-with-operator": requireReplaceOperateWithOperator,
		"/node_modules/@putout/plugin-putout/lib/replace-operate-with-operator/index.js": requireReplaceOperateWithOperator,
		"/node_modules/@putout/plugin-putout/lib/replace-test-message": requireReplaceTestMessage,
		"/node_modules/@putout/plugin-putout/lib/replace-test-message/index.js": requireReplaceTestMessage,
		"/node_modules/@putout/plugin-putout/lib/shorten-imports": requireShortenImports,
		"/node_modules/@putout/plugin-putout/lib/shorten-imports/index.js": requireShortenImports
	});
}

function createCommonjsRequire(originalModuleDir) {
	function handleRequire(path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return getDynamicModules()[resolvedPath]();
		}
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}
	handleRequire.resolve = function (path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return resolvedPath;
		}
		return require.resolve(path);
	};
	return handleRequire;
}

function commonjsResolve (path, originalModuleDir) {
	var shouldTryNodeModules = isPossibleNodeModulesPath(path);
	path = normalize(path);
	var relPath;
	if (path[0] === '/') {
		originalModuleDir = '';
	}
	var modules = getDynamicModules();
	var checkedExtensions = ['', '.js', '.json'];
	while (true) {
		if (!shouldTryNodeModules) {
			relPath = normalize(originalModuleDir + '/' + path);
		} else {
			relPath = normalize(originalModuleDir + '/node_modules/' + path);
		}

		if (relPath.endsWith('/..')) {
			break; // Travelled too far up, avoid infinite loop
		}

		for (var extensionIndex = 0; extensionIndex < checkedExtensions.length; extensionIndex++) {
			var resolvedPath = relPath + checkedExtensions[extensionIndex];
			if (modules[resolvedPath]) {
				return resolvedPath;
			}
		}
		if (!shouldTryNodeModules) break;
		var nextDir = normalize(originalModuleDir + '/..');
		if (nextDir === originalModuleDir) break;
		originalModuleDir = nextDir;
	}
	return null;
}

function isPossibleNodeModulesPath (modulePath) {
	var c0 = modulePath[0];
	if (c0 === '/' || c0 === '\\') return false;
	var c1 = modulePath[1], c2 = modulePath[2];
	if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\')) ||
		(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\'))) return false;
	if (c1 === ':' && (c2 === '/' || c2 === '\\')) return false;
	return true;
}

function normalize (path) {
	path = path.replace(/\\/g, '/');
	var parts = path.split('/');
	var slashed = parts[0] === '';
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] === '.' || parts[i] === '') {
			parts.splice(i--, 1);
		}
	}
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] !== '..') continue;
		if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
			parts.splice(--i, 2);
			i--;
		}
	}
	path = parts.join('/');
	if (slashed && path[0] !== '/') path = '/' + path;
	else if (path.length === 0) path = '.';
	return path;
}

var lib = {};

const getRule = (a) => ({
    [a]: createCommonjsRequire("/node_modules/@putout/plugin-putout/lib")(`./${a}`),
});

var rules = lib.rules = {
    ...getRule('apply-processors-destructuring'),
    ...getRule('apply-async-formatter'),
    ...getRule('apply-create-test'),
    ...getRule('apply-remove'),
    ...getRule('convert-putout-test-to-create-test'),
    ...getRule('convert-to-no-transform-code'),
    ...getRule('convert-find-to-traverse'),
    ...getRule('convert-destructuring-to-identifier'),
    ...getRule('convert-number-to-numeric'),
    ...getRule('convert-replace-with'),
    ...getRule('convert-replace-with-multiple'),
    ...getRule('convert-replace-to-function'),
    ...getRule('convert-match-to-function'),
    ...getRule('convert-babel-types'),
    ...getRule('convert-node-to-path-in-get-template-values'),
    ...getRule('convert-traverse-to-include'),
    ...getRule('convert-traverse-to-replace'),
    ...getRule('convert-process-to-find'),
    ...getRule('convert-method-to-property'),
    ...getRule('convert-add-argument-to-add-args'),
    ...getRule('convert-dirname-to-url'),
    ...getRule('convert-url-to-dirname'),
    ...getRule('convert-report-to-function'),
    ...getRule('replace-test-message'),
    ...getRule('rename-operate-to-operator'),
    ...getRule('replace-operate-with-operator'),
    ...getRule('shorten-imports'),
    ...getRule('check-replace-code'),
    ...getRule('declare'),
    ...getRule('add-args'),
    ...getRule('add-push'),
    ...getRule('move-require-on-top-level'),
    ...getRule('includer'),
};

var pluginPutout = /*#__PURE__*/_mergeNamespaces({
    __proto__: null,
    rules: rules,
    'default': lib
}, [lib]);

export { pluginPutout as default };
