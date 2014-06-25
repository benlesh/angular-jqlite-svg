(function(angular){
	if(!angular) {
		throw new Error('unable to patch svg, angular not found');
	}

	var SINGLE_TAG_REGEXP = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
	var TAG_NAME_REGEXP = /<([\w:]+)/;
	var SVG_ELEMENTS = ['altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 
	'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 
	'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 
	'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 
	'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 
	'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'linearGradient', 'marker', 'mask', 'metadata', 
	'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'set', 'stop', 'svg', 'switch', 
	'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'use', 'view', 'vkern'];

	var elementFn = angular.element;
	var tmpDiv;
	var tmpSvg;

	angular.element = function(elem){
		var parsed;

		if(angular.isString(elem)) {
			if(parsed = SINGLE_TAG_REGEXP.exec(elem) && isSvgTag(parsed[1])) {
				elem = [ 
					document.createElementNS('http://www.w3.org/2000/svg', parsed[1]) 
				];
			} else if (parsed = buildSvgNodes(elem)) {
				elem = parsed;
			}
		}

		return elementFn.call(elem);
	};

	function isSvgTag(tagName) {
		return SVG_ELEMENTS.indexOf(tagName) >= 0;
	}

	function buildSvgNodes(html) {
		var parsed;

		if(parsed = TAG_NAME_REGEXP.exec(html) && isSvgTag(parsed[1])) {
			tmpDiv = tmpDiv || document.createElement('div');
			tmpDiv.innerHTML = '<svg>' + html + '</svg>';
			return tmpDiv.childNodes;
		}

		return null;
	}
}(angular));