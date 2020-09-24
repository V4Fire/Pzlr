'use strict';

/*!
 * V4Fire Pzlr
 * https://github.com/V4Fire/Pzlr
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Pzlr/blob/master/LICENSE
 */

describe('config', () => {
	const
		path = require('path'),
		fs = require('fs-extra-promise'),
		config = require('./config');

	it('uses the default config', () => {
		expect(fs.readJSONSync(path.join(__dirname, '../.pzlrrc')).entries).toBeUndefined();
		expect(config.src.entries).toBe('entries');
	});

	it('parsing of a mixed format', () => {
		expect(config).toEqual({
			projectName: '@v4fire/pzlr',
			projectType: 'ts',

			blockDir: 'blocks',

			super: '@super',
			superRgxp: /^@super(?:[/\\]|$)/,

			src: {
				root: 'src',
				client: 'blocks',
				server: 'server-scripts',
				entries: 'entries',
				assets: {
					src: 'static',
					sprite: 'svg'
				}
			},

			assets: {
				dir: 'static',
				sprite: 'svg'
			},

			dependencies: ['my-project'],
			disclaimer: 'disclaimer.txt'
		});
	});
});
