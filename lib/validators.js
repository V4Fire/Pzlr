'use strict';

/*!
 * V4Fire Pzlr
 * https://github.com/V4Fire/Pzlr
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Pzlr/blob/master/LICENSE
 */

const
	joi = require('joi');

const componentTypeMap = {
	i: 'interface or abstract class',
	b: 'regular',
	p: 'page',
	g: 'global',
	v: 'virtual'
};

const
	componentTypes = Object.keys(componentTypeMap);

const
	baseComponentName = `[${componentTypes.join('')}]-[a-z0-9][a-z0-9-_]*`,
	componentNameRegExp = new RegExp(`^${baseComponentName}$`),
	componentDepRegExp = new RegExp(`^(@|[a-z][a-z0-9-_]*\\/)?${baseComponentName}$`);

/**
 * Returns true if the specified name is valid for a component
 *
 * @param {string} name
 * @returns {boolean}
 */
function componentName(name) {
	return componentNameRegExp.test(name);
}

const declarationSchema = joi.object().keys({
	name: joi
		.string()
		.description('Component name')
		.pattern(componentNameRegExp, 'component name')
		.required(),

	mixin: joi
		.boolean()
		.description('Mixin mode')
		.allow(null)
		.default(false),

	parent: joi
		.string()
		.description('Parent component')
		.pattern(componentDepRegExp, 'component name')
		.allow(null)
		.default(null),

	dependencies: joi
		.array()
		.description('Dependencies of the component')
		.default(() => [])
		.items(joi.string().pattern(componentDepRegExp, 'component name')),

	libs: joi
		.array()
		.description('Additional libraries of the component')
		.default(() => [])
		.items(joi.string())
});

/**
 * Validates the specified package declaration
 *
 * @template T
 * @param {T} obj
 * @returns {T}
 */
function declaration(obj) {
	const
		{error, value} = declarationSchema.validate(obj);

	if (error) {
		throw new TypeError(`Invalid declaration object: ${error.message}`);
	}

	return value;
}

module.exports = {
	declaration,

	componentName,
	baseComponentName,

	componentNameRegExp,
	componentDepRegExp,

	componentTypeMap,
	componentTypes
};
