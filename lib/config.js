'use strict';

/*!
 * V4Fire Pzlr
 * https://github.com/V4Fire/Pzlr
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Pzlr/blob/master/LICENSE
 */

const
	$C = require('collection.js'),
	Sugar = require('sugar');

const
	path = require('upath'),
	fs = require('fs-extra-promise');

const
	packagePath = path.join(process.cwd(), 'package.json'),
	configPath = path.join(process.cwd(), '.pzlrrc'),
	configExists = fs.existsSync(configPath),
	superLink = '@super';

const config = $C.extend(true, {}, require('./pzrlrc-default.json'), {
	super: superLink,
	superRgxp: new RegExp(`^${Sugar.RegExp.escape(superLink)}(?:[/\\\\]|$)`)
});

if (configExists) {
	try {
		$C.extend(true, config, fs.readJsonSync(configPath));

	} catch {
		throw new TypeError('.pzlrrc should be a valid JSON');
	}

} else {
	console.warn('Warning: .pzlrrc doesn\'t exist');
}

try {
	const p = fs.readJsonSync(packagePath);
	config.projectName = p.name;

} catch {
	throw new TypeError('package.json should be a valid JSON');
}

/**
 * Config object
 * @type {!Object}
 */
module.exports = config;
