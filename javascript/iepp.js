// iepp v1.6.2 MIT @jon_neal
(function(win, doc) {
	var elems = 'abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video',
		elemsArr = elems.split('|'),
		elemsArrLen = elemsArr.length,
		elemRegExp = new RegExp('(^|\\s)('+elems+')', 'gi'), 
		tagRegExp = new RegExp('<(\/*)('+elems+')', 'gi'),
		ruleRegExp = new RegExp('(^|[^\\n]*?\\s)('+elems+')([^\\n]*)({[\\n\\w\\W]*?})', 'gi'),
		docFrag = doc.createDocumentFragment(),
		html = doc.documentElement,
		head = html.firstChild,
		bodyElem = doc.createElement('body'),
		styleElem = doc.createElement('style'),
		body;
	function shim(doc) {
		var a = -1;
		while (++a < elemsArrLen)
			doc.createElement(elemsArr[a]);
	}
	function getCSS(styleSheetList, mediaType) {
		var a = -1,
			len = styleSheetList.length,
			styleSheet,
			cssTextArr = [];
		while (++a < len) {
			styleSheet = styleSheetList[a];
			mediaType = styleSheet.media || mediaType;
			cssTextArr.push(getCSS(styleSheet.imports, mediaType));
			cssTextArr.push(styleSheet.cssText);
		}
		return cssTextArr.join('');
	}
	shim(doc);
	shim(docFrag);
	head.insertBefore(styleElem, head.firstChild);
	styleElem.media = 'all';
	win.attachEvent(
		'onbeforeprint',
		function() {
			var a = -1,
				cssText = getCSS(doc.styleSheets, 'all'),
				cssTextArr = [],
				rule;
			body = body || doc.body;
			while ((rule = ruleRegExp.exec(cssText)) != null)
				cssTextArr.push((rule[1]+rule[2]+rule[3]).replace(elemRegExp, '$1.iepp_$2')+rule[4]);
			styleElem.styleSheet.cssText = cssTextArr.join('\n');
			while (++a < elemsArrLen) {
				var nodeList = doc.getElementsByTagName(elemsArr[a]),
					nodeListLen = nodeList.length,
					b = -1;
				while (++b < nodeListLen)
					if (nodeList[b].className.indexOf('iepp_') < 0)
						nodeList[b].className += ' iepp_'+elemsArr[a];
			}
			docFrag.appendChild(body);
			html.appendChild(bodyElem);
			bodyElem.innerHTML = body.innerHTML.replace(tagRegExp, '<$1bdo');
			bodyElem.className = body.className;
		}
	);
	win.attachEvent(
		'onafterprint',
		function() {
			bodyElem.innerHTML = '';
			html.removeChild(bodyElem);
			html.appendChild(body);
			styleElem.styleSheet.cssText = '';
		}
	);
})(this, document);