/*@cc_on@if(@_jscript_version<9)
(function () {

var win = window,
	doc = document,
	doc_frag = doc.createDocumentFragment(),
	html5_stylesheet,
	elementsArray = 'abbr article aside audio canvas command datalist details figure figcaption footer header hgroup keygen mark meter nav output progress section source summary time video'.split(' '),
	elementsCache = [],
	parse_style_sheet_list = function (styleSheetList) {
		var cssRuleList,
			selectorText,
			selectorTextMatch = new RegExp('\\b(' + elementsArray.join('|') + ')\\b', 'gi'),
			selectorTextReplace = function (m) {
				return '.iepp_' + m;
			},
			a = -1,
			b;

		while (++a < styleSheetList.length) {
			b = -1;

			parse_style_sheet_list(styleSheetList[a].imports);

			cssRuleList = styleSheetList[a].rules;

			while (++b < cssRuleList.length) {
				selectorText = cssRuleList[b].selectorText;

				if (selectorText.match(selectorTextMatch)) {
					html5_stylesheet.styleSheet.addRule(selectorText.replace(selectorTextMatch, selectorTextReplace), cssRuleList[b].style.cssText);
				}
			}
		}
	},
	on_before_print = function () {
		var head = doc.documentElement.firstChild,
			element,
			elements = doc.getElementsByTagName('*'),
			elementCache,
			elementName,
			elementMatch = new RegExp('^' + elementsArray.join('|') + '$', 'i'),
			elementReplace,
			elementReplaced,
			a = -1;

		while (++a < elements.length) {
			if ((element = elements[a]) && (elementName = element.nodeName.match(elementMatch))) {
				elementReplace = new RegExp('^\\s*<' + elementName + '(.*)\\/' + elementName + '>\\s*$', 'i');

				doc_frag.innerHTML = element.outerHTML.replace(/\r|\n/g, ' ').replace(elementReplace, (element.currentStyle.display == 'block') ? '<div$1/div>' : '<span$1/span>');

				elementReplaced = doc_frag.childNodes[0];
				elementReplaced.className += ' iepp_' + elementName;

				elementCache = elementsCache[elementsCache.length] = [element, elementReplaced];

				element.parentNode.replaceChild(elementCache[1], elementCache[0]);
			}
		}

		head.insertBefore((html5_stylesheet = doc.createElement('style')), head.firstChild);

		parse_style_sheet_list(doc.styleSheets);
	},
	on_after_print = function () {
		var a = -1;

		while (++a < elementsCache.length) {
			elementsCache[a][1].parentNode.replaceChild(elementsCache[a][0], elementsCache[a][1]);
		}

		doc.documentElement.firstChild.removeChild(html5_stylesheet);

		elementsCache = [];
	},
	a = -1;

while (++a < elementsArray.length) {
	doc.createElement(elementsArray[a]);
	doc_frag.createElement(elementsArray[a]);
}

doc_frag = doc_frag.appendChild(doc.createElement('div'));

win.attachEvent('onbeforeprint', on_before_print);
win.attachEvent('onafterprint', on_after_print);

}());
@end@*/