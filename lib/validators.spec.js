'use strict';

/*!
 * V4Fire Pzlr
 * https://github.com/V4Fire/Pzlr
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Pzlr/blob/master/LICENSE
 */

describe('validators', () => {
	const {
		declaration,

		componentName,
		baseComponentName,

		componentNameRegExp,
		componentDepRegExp,

		componentTypeMap,
		componentTypes
	} = require('./validators');

	it('api', () => {
		expect(typeof baseComponentName).toBe('string');
		expect(componentNameRegExp).toBeInstanceOf(RegExp);
		expect(componentDepRegExp).toBeInstanceOf(RegExp);
		expect(componentTypeMap).toBeInstanceOf(Object);
		expect(componentTypes).toBeInstanceOf(Array);
	});

	describe('componentName', () => {
		it('valid names', () => {
			expect(componentName('i-block')).toBeTrue();
			expect(componentName('b-block')).toBeTrue();
			expect(componentName('p-block')).toBeTrue();
			expect(componentName('g-block')).toBeTrue();
			expect(componentName('v-block')).toBeTrue();
		});

		it('invalid names', () => {
			expect(componentName('block')).toBeFalse();
			expect(componentName('z-block')).toBeFalse();
			expect(componentName('p2-block')).toBeFalse();
		});
	});

	describe('declaration', () => {
		it('valid declarations', () => {
			expect(declaration({name: 'b-example'})).toEqual({
				name: 'b-example',
				mixin: false,
				parent: null,
				dependencies: [],
				libs: []
			});

			expect(declaration({
				name: 'b-example',
				parent: 'i-block',
				dependencies: ['b-dep1', 'g-dep2'],
				libs: ['jquery']
			}))
				.toEqual({
					name: 'b-example',
					mixin: false,
					parent: 'i-block',
					dependencies: ['b-dep1', 'g-dep2'],
					libs: ['jquery']
				});

			expect(declaration({
				name: 'b-example',
				mixin: true
			}))
				.toEqual({
					name: 'b-example',
					mixin: true,
					parent: null,
					dependencies: [],
					libs: []
				});
		});

		it('invalid declarations', () => {
			expect(() => declaration({name: 'example'}))
				.toThrow(new TypeError('Invalid declaration object: "name" with value "example" fails to match the component name pattern'));

			expect(() => declaration({
				name: 'b-example',
				parent: 'block'
			}))
				.toThrow(new TypeError('Invalid declaration object: "parent" with value "block" fails to match the component name pattern'));

			expect(() => declaration({
				name: 'b-example',
				dependencies: ['dep2']
			}))
				.toThrow(new TypeError('Invalid declaration object: "dependencies[0]" with value "dep2" fails to match the component name pattern'));

			expect(() => declaration({
				name: 'b-example',
				mixin: 1
			}))
				.toThrow(new TypeError('Invalid declaration object: "mixin" must be a boolean'));
		});
	});
});
