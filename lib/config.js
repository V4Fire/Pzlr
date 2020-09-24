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
		const
			customConfig = fs.readJsonSync(configPath);

		// Support of the old @pzlr/build-core config format
		$C.extend(true, config, customConfig, {
			src: {
				root: customConfig.sourceDir,
				client: customConfig.blockDir,
				server: customConfig.serverDir,
				entries: customConfig.entriesDir,
				assets: {
					src: $C(customConfig).get('assets.dir'),
					sprite: $C(customConfig).get('assets.sprite')
				}
			}
		});

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
