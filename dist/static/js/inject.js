var setTheme=function(){var t={isLogindPage:function(){return!(!document.getElementById("s_username_top")&&!document.getElementById("user"))},isResultPage:function(){return!!document.getElementById("wrapper").classList.contains("wrapper_l")}},e=function(){};return e.prototype.init=function(){this.stat=this.getStatus(),this.initCSS(),this.setTitle(),this.setFavicon(),this.bindEvent()},e.prototype.getStatus=function(){var e={};return e.isLogind=t.isLogindPage(),e.isResult=t.isResultPage(),e.isLogind||e.isResult?e.isResult?e.css=chrome.extension.getURL("static/css/main_result.css"):e.css="":e.css=chrome.extension.getURL("static/css/main_index_no_login.css"),e},e.prototype.onChangeStatus=function(){var t=this.getStatus();(t.isLogind!=this.stat.isLogind||t.isResult!=this.stat.isResult)&&(this.linkDOM.href=t.css,this.stat=t)},e.prototype.initCSS=function(){this.linkDOM=this.linkDOM||document.createElement("link"),this.linkDOM.rel="stylesheet",this.linkDOM.href=this.stat.css,document.body.parentElement.appendChild(this.linkDOM)},e.prototype.setTitle=function(){var t;switch(!0){case document.title.indexOf("_\u767e\u5ea6\u641c\u7d22")>-1:t=document.title.replace("_\u767e\u5ea6\u641c\u7d22","_Google");break;case"\u767e\u5ea6\u4e00\u4e0b\uff0c\u4f60\u5c31\u77e5\u9053"==document.title:t="Google";break;default:t=document.title}document.title=t},e.prototype.setFavicon=function(){var t=document.querySelector('link[type="image/x-icon"]'),e=chrome.extension.getURL("icons/favicon.ico");t||(t=document.createElement("link"),t.type="image/x-icon",t.rel="shortcut icon",document.head.appendChild(t)),(this.stat.isResult||!this.stat.isLogind)&&(t.href=e)},e.prototype.bindEvent=function(){var t=this;document.getElementById("kw").addEventListener("keyup",function(){t.onChangeStatus()}),document.getElementById("form").addEventListener("submit",function(){setTimeout(function(){t.setTitle()},500),t.setFavicon()})},e.prototype.setTimer=function(){var t=this;clearInterval(this.timer),t.timer=setInterval(function(){t.linkDOM.parentNode||(t.initCSS(),t.setTitle(),t.setFavicon())},500)},new e}();setTheme.init();