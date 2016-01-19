/**
 * baidu2google:通过chrome浏览器插件修改百度首页为谷歌主题样式：用谷歌百度一下！
 * @author xiongwilee
 */
var setTheme = (function () {
	var Base = {
		isLogindPage : function(){
			return !!(document.getElementById('s_username_top') || document.getElementById('user'))
		},
		isResultPage : function(){
			return !!document.getElementById('page')
		},
		isShowTheme : function(){
			var isLogind = Base.isLogindPage(),
				isResult = Base.isResultPage();

			return !isLogind && !isResult;
		}
	}

	var SetTheme = function(){
		this.linkDOM;
	}

	SetTheme.prototype.init = function(){
		// 载入CSS
		this.initCSS();
		// 设置头部：标题等
		this.setTitle();
		// 设置favicon
		this.setFavicon();
		// 事件监听
		this.bindEvent();
	}
	/**
	 * 载入CSS
	 */
	SetTheme.prototype.initCSS = function(){
		// 如果已经登录就不加载CSS
		if( !Base.isShowTheme() ){
			return;
		}

		var cssURL = chrome.extension.getURL('static/css/main_index_no_login.css');
			
		this.linkDOM = document.createElement('link');
		this.linkDOM.rel = 'stylesheet';
		this.linkDOM.href = cssURL;

		document.body.appendChild(this.linkDOM);
	}
	/**
	 * 删除CSS
	 */
	SetTheme.prototype.removeCSS = function(){
		this.linkDOM && this.linkDOM.remove();
	}
	/**
	 * 设置头部：标题等
	 */
	SetTheme.prototype.setTitle = function(){
		document.title = 'Google';
	}
	/**
	 设置favicon
	 */
	SetTheme.prototype.setFavicon = function () {
		var oldIcon = document.getElementsByTagName('link')[0];
		var newIcon = chrome.extension.getURL('static/image/new_baidu_favicon.ico');

		if( Base.isShowTheme() ){ 
			oldIcon,oldIcon.href = newIcon;
		}
	}
	/**
	 * 监听事件
	 */
	SetTheme.prototype.bindEvent = function(){
		var me = this;

		// 当输入内容，切搜索视图变化的时候就删掉CSS
		document.getElementById('kw').addEventListener('keyup', function(){
			if( Base.isResultPage() ){
				me.removeCSS();
			}
		})
	}

	return (new SetTheme());
})();

setTheme.init();