/**
 * baidu2google:通过chrome浏览器插件修改百度首页为谷歌主题样式：用谷歌百度一下！
 * @author xiongwilee
 */
var setTheme = (function () {
	var Base = {
		// 当前是否为已经登录的页面
		isLogindPage : function(){
			return !!(document.getElementById('s_username_top') || document.getElementById('user'));
		},
		// 当前是否为搜索结果页
		isResultPage : function(){
			return !!document.getElementById('wrapper').classList.contains('wrapper_l');
		}
	};

	var SetTheme = function(){};

	SetTheme.prototype.init = function(){
		// 获取默认状态并存到this.stat变量中
		this.stat = this.getStatus();
		// 载入CSS
		this.initCSS();
		// 设置头部：标题等
		this.setTitle();
		// 设置favicon
		this.setFavicon();
		// 事件监听
		this.bindEvent();
		// 在百度搜索框里输入完之后，回车会删除所有DOM，设置轮询检测是否CSS DOM是否已经删除
		// this.setTimer();
	};
	/**
	 * 获取当前状态
	 */
	SetTheme.prototype.getStatus = function(){
		var curStatus = {};

		curStatus.isLogind = Base.isLogindPage();
		curStatus.isResult = Base.isResultPage();

		if(!curStatus.isLogind && !curStatus.isResult){
			curStatus.css = chrome.extension.getURL('static/css/main_index_no_login.css');
		}else if(curStatus.isResult){
			curStatus.css = chrome.extension.getURL('static/css/main_result.css');
		}else{
			curStatus.css = '';
		}

		return curStatus;
	};
	/**
	 * 当状态发生变化时
	 */
	SetTheme.prototype.onChangeStatus = function(){
		var curStatus = this.getStatus();
		if(	curStatus.isLogind != this.stat.isLogind || curStatus.isResult != this.stat.isResult){
			this.linkDOM.href = curStatus.css;
			this.stat = curStatus;
		}
	};
	/**
	 * 载入CSS
	 */
	SetTheme.prototype.initCSS = function(){			
		this.linkDOM = this.linkDOM || document.createElement('link');
		this.linkDOM.rel = 'stylesheet';
		this.linkDOM.href = this.stat.css;

		// 把link文件放在</body>和</html>之间，以避免回车搜索时干掉DOM
		document.body.parentElement.appendChild(this.linkDOM);
	};
	/**
	 * 设置头部：标题等
	 */
	SetTheme.prototype.setTitle = function(){
		var title;
		switch(true){
			case document.title.indexOf('_百度搜索') > -1:
				title = document.title.replace('_百度搜索','_Google');
				break;
			case document.title == '百度一下，你就知道':
				title = 'Google';
				break;
			default:
				title = document.title;
				break;
		}

		document.title = title;
	};
	/**
	 设置favicon
	 */
	SetTheme.prototype.setFavicon = function () {
		var oldIcon = document.querySelector('link[type="image/x-icon"]');
		var newIcon = chrome.extension.getURL('icons/favicon.ico');

		if( !oldIcon ){
			oldIcon = document.createElement('link');
			oldIcon.type = 'image/x-icon';
			oldIcon.rel = 'shortcut icon';
			document.head.appendChild(oldIcon);
		}

		if( this.stat.isResult || !this.stat.isLogind ){ 
			oldIcon.href = newIcon;
		}
	};
	/**
	 * 监听事件
	 */
	SetTheme.prototype.bindEvent = function(){
		var me = this;

		// 当输入内容，切搜索视图变化的时候就删掉CSS
		document.getElementById('kw').addEventListener('keyup', function(){
			me.onChangeStatus();
		});

		document.getElementById('form').addEventListener('submit', function(){
			setTimeout(function(){
				me.setTitle();
			},500);
			me.setFavicon();
		});
	};
	/**
	 * 在百度搜索框里输入完之后，回车会删除所有DOM，设置轮询检测是否CSS DOM是否已经删除
	 */
	SetTheme.prototype.setTimer = function(){
		var me = this;

		clearInterval(this.timer);
		me.timer = setInterval(function(){
			if (!!me.linkDOM.parentNode) {return;}

			me.initCSS();
			me.setTitle();
			me.setFavicon();
		},500);
	};

	return (new SetTheme());
})();

setTheme.init();