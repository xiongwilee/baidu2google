var setTheme = (function () {
	var _init = function(){
		// 载入CSS
		_initCSS();

		// 设置头部
		_setTitle();
	}
	var _initCSS = function(){
		var cssURL = chrome.extension.getURL('static/main.css'),
			linkDOM = document.createElement('link');

		linkDOM.rel = 'stylesheet';
		linkDOM.href = cssURL;

		document.body.appendChild(linkDOM);
	}
	var _setTitle = function(){
		document.title = 'Google';
	}

	return {
		init : _init
	}
})();

setTheme.init();