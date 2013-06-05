/** 这种方式开发扩展不需要一次又一次的去点击那个重新载入，并且能充分利用宿主页面已经有的js函数 */
(function() {
	function injectScript(src, sync) {
		/** 脚本 **/
		var script = document.createElement('script');
		script.type = 'text/javascript';

		if (!sync) {
			script.async = true;
		}

		script.src = src;

		var s = document.getElementsByTagName("head")[0];
		s.appendChild(script);
	}

	function injectCss(src) {
		/** 样式 **/
		var c = document.getElementsByTagName("head")[0],
		addStyle = document.createElement("link");
		addStyle.rel = "stylesheet";
		addStyle.type = "text/css";
		addStyle.media = "screen";
		addStyle.href = src;

		c.appendChild(addStyle);
	}

	/* 调试的时候加上时间戳 */
	injectCss(chrome.extension.getURL('shortcut.css') + '?t=' + new Date().valueOf());

	/* 延时载入js */
	setTimeout(function() {
		injectScript(chrome.extension.getURL('keymaster.js') + '?t=' + new Date().valueOf(), 1);
		injectScript(chrome.extension.getURL('shortcut.js') + '?t=' + new Date().valueOf(), 1);
	}, 0);
})();

