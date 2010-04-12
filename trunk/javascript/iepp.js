/*@cc_on@if(@_jscript_version<9)
(function(win, doc) {

win.iepp = {
	_elements: 'abbr|article|aside|audio|canvas|command|datalist|details|dialog|figure|figcaption|footer|header|hgroup|keygen|mark|meter|nav|output|progress|section|source|summary|time|video',

	_protect: [],

	_parseSheets: function (stylesheets) {
		var root = win.iepp,
			imports,
			rules,
			selectors,
			selectorsMatch = new RegExp('\\b(' + root._elements + ')\\b', 'gi'),
			selectorsReplace = function (m) {
				return '.iepp_' + m;
			},
			declarationBlock,
			a = -1,
			b;

		while (++a < stylesheets.length) {
			imports = stylesheets[a].imports;
			rules = stylesheets[a].rules;
			b = -1;

			if (imports.length) {
				root._parseSheets(imports);
			}

			while (++b < rules.length) {
				selectors = rules[b].selectorText;
				declarationBlock = rules[b].style.cssText;

				if (selectors.match(selectorsMatch)) {
					root._stylesheet.styleSheet.addRule(selectors.replace(selectorsMatch, selectorsReplace), declarationBlock);
				}
			}
		}
	},

	shim: function () {
		var root = win.iepp,
			els = root._elements.split('|'),
			fragment = doc.createDocumentFragment(),
			div = doc.createElement('div'),
			i = -1;

		fragment.appendChild(div);

		while (++i < els.length) {
			doc.createElement(els[i]);
			fragment.createElement(els[i]);
		}

		root._fragment = div;

		win.attachEvent('onbeforeprint', root.addSafeHTML);
		win.attachEvent('onafterprint', root.removeSafeHTML);
	},

	addSafeCSS: function () {
		var root = win.iepp,
			head = doc.documentElement.firstChild,
			safeStylesheet = doc.createElement('style'),
			stylesheets = doc.styleSheets;

		head.insertBefore(safeStylesheet, head.firstChild);

		root._stylesheet = safeStylesheet;

		root._parseSheets(stylesheets);
	},

	removeSafeCSS: function () {
		doc.documentElement.firstChild.removeChild(win.iepp._stylesheet);
	},

	addSafeHTML: function () {
		var root = win.iepp,
			els = doc.getElementsByTagName('*'),
			node_match = new RegExp('^' + root._elements + '$', 'i'),
			node_name,
			node_replace,
			node_safe,
			safe_element,
			protect,
			i = -1;

		root.addSafeCSS();

		while (++i < els.length) {
			node_name = els[i].nodeName.match(node_match);

			if (node_name) {
				node_replace = new RegExp('^\\s*<' + node_name + '(.*)\\/' + node_name + '>\\s*$', 'i');
				node_safe = (els[i].currentStyle.display == 'block') ? 'div' : 'span'; 

				root._fragment.innerHTML = els[i].outerHTML.replace(/\r|\n/g, ' ').replace(node_replace, '<' + node_safe + '$1/' + node_safe + '>');

				safe_element = root._fragment.childNodes[0];

				safe_element.className += ' iepp_' + node_name;

				protect = root._protect[root._protect.length] = {
					before: els[i],
					after: root._fragment.childNodes[0]
				};

				els[i].parentNode.replaceChild(protect.after, protect.before);
			}
		}
	},

	removeSafeHTML: function () {
		var root = win.iepp,
			els = root._protect,
			i = -1;

		root.removeSafeCSS();

		while (++i < els.length) {
			els[i].after.parentNode.replaceChild(els[i].before, els[i].after);
		}

		root._protect = [];
	}
};

win.iepp.shim();

})(this, document);
@end@*/