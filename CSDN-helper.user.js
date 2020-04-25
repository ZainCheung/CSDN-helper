// ==UserScript==
// @name         CSDN博客自动点赞评论
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  打开任意一个CSDN博客页面,就可以进行自动点赞评论,可以自定义策略与评论内容,高度可定制化
// @author       ZainCheung
// @match        *://blog.csdn.net/*/article/details/*
// @grant        GM.xmlHttpRequest
// @connect      csdn.net
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js
// @resource html      https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/dist/app@0.2.html
// @resource css      https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/dist/app@0.2.css
// @resource js      https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/dist/app@0.2.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        unsafeWindow
// @grant  GM_getResourceText
// ==/UserScript==
        
        // 获取网页的网址
        var articalUrl = window.location.href;
        var host = articalUrl.split("article/details/")[0]; // 域名
        var artId = articalUrl.split("article/details/")[1].split("?")[0];
        // 从页面获取评论列表,但是只能获取第一页
        var commentList = document.querySelectorAll('#mainBox > main > div.comment-box > div.comment-list-container > div.comment-list-box > ul');
        let commentListLength = commentList.length;
        // 组装评论请求
        var getCommentUrl = host + "phoenix/comment/list/" + artId + "?page=1&size=1000&tree_type=1";
        // 当前登陆用户的账号
        var myName = document.querySelector("#csdn_container_tool > div > ul > li:nth-child(5) > div.userControl > div:nth-child(2) > div:nth-child(1) > a").href.split("blog.csdn.net/")[1];
        // 文章的作者账号
        var UserName = document.querySelector("#mainBox > main > div.blog-content-box > div > div > div.article-info-box > div.article-bar-top > a.follow-nickName").href.split("csdn.net/")[1];
        // 文章全文字数
        var blogLength = document.querySelector("#article_content").innerText.replace(/\ +/g,"").replace(/[\r\n]/g,"").length;
        // 文章阅读量
        var blogRead = document.querySelector("#mainBox > main > div.blog-content-box > div > div > div.article-info-box > div.article-bar-top > span.read-count").innerText.slice(4);
        // 文章最后发布日期
        var blogDate = document.querySelector("#mainBox > main > div.blog-content-box > div > div > div.article-info-box > div.article-bar-top > span.time").innerText.slice(5,15);
        // 评论文本框
        var commentArea = document.querySelector("#comment_content");
        // 评论按钮
        var commentBtn = document.querySelector("#commentform > div > div.right-box > a > input");
        // 是否评论,默认评论
        var toComment = true;
        var text = "欢迎你回访我的博客哦";

    function init(){
        // 新的一天会自动打开点赞开关
        if(localStorage.today){
            var today = new Date();
            if(localStorage.today != today.getDate()){
                localStorage.likeSwitch = 100;
                localStorage.likeCustom = 100;
                localStorage.today = today.getDate();
            }
        }

        if(localStorage.likeSwitch == 100){
            if(localStorage.likeCustom == 100){
                console.log("blogLength:" + blogLength);
                console.log("blogRead:" + blogRead);
                console.log("localStorage.likeWordNumber:" + localStorage.likeWordNumber);
                console.log("localStorage.likeReadNumber:" + localStorage.likeReadNumber);
                if((parseInt(blogLength) >= parseInt(localStorage.likeWordNumber)) && (parseInt(blogRead) >= parseInt(localStorage.likeReadNumber))){
                    if((new Date(blogDate).getTime()) >= (new Date(localStorage.likeDate).getTime())){
                        likeEvent();
                    }
                }
            }else{
                likeEvent();
            }
        }

        if(localStorage.commentSwitch == 100){
            if(localStorage.commentCustom == 100){
                if((parseInt(blogLength) >= parseInt(localStorage.commentWordNumber)) && (parseInt(blogRead) >= parseInt(localStorage.commentReadNumber))){
                    if((new Date(blogDate).getTime()) >= (new Date(localStorage.commentDate).getTime())){
                        commentEvent();
                    }
                }
            }else{
                commentEvent();
            }
        }

    }
    // 点赞事件
    function likeEvent(){
        //没有点赞才自动点赞并且延迟100毫秒后进行评论
        var zhan = document.querySelector("body > div.tool-box.vertical > ul > li.btn-like-box > button");
        if(zhan.getAttribute("class").search("liked") == -1){
            zhan.click();
            setTimeout(function(){
                if(document.querySelector("body > div.skin-boxshadow").style.display == "block"){localStorage.likeSwitch = 0}
                console.log(document.querySelector("body > div.skin-boxshadow").style.display);
            },500);
        }else{
            console.warn("已经点过赞了");
        }
    }

    // 评论事件
    function commentEvent(){
        var commentTextList = JSON.parse(localStorage.commentList);
        var commentText;
        if(localStorage.commentRangeSwitch==0){
            commentText = commentTextList.R[Math.floor(Math.random()*commentTextList.R.length)].text;
        }else{
            var count_S = localStorage.commentRange.split(",")[0];
            var count_L = localStorage.commentRange.split(",")[1];
            if(blogLength<count_S){
                commentText = commentTextList.S[Math.floor(Math.random()*commentTextList.S.length)].text;
            }else if(blogLength>count_L){
                commentText = commentTextList.L[Math.floor(Math.random()*commentTextList.L.length)].text;
            }
        }
        for (let i=0; i<commentListLength; i++){
            // 在页面的评论列表找到当前登陆用户账号
            if(commentList[i].querySelector("li > a").href.split("csdn.net/")[1]==myName){
                toComment = false;
                console.log("已经评论过,无需重复评论");
                break;
            }
        }
        setTimeout(function(){
            if(toComment && myName!=UserName){
                console.log(commentText);
                document.querySelector("#comment_content").value= commentText;
                document.querySelector("#commentform > div > div.right-box > a > input").click();
                console.log("评论成功!");
            }
        },300);
    }

(function() {
    init();
})();

// 添加Link
function addGlobalLink(rel,href) {
	var head, link;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	link = document.createElement('link');
    link.rel = rel;
    link.href = href;
	head.appendChild(link);
}
// 添加Script
function addGlobalScript(src) {
	var body, script;
	body = document.getElementsByTagName('body')[0];
	if (!body) { return; }
	script = document.createElement('script');
    script.src = src;
	body.appendChild(script);
}

addGlobalLink('stylesheet','https://cdn.jsdelivr.net/gh/superBoyJack/CDN/css/element-ui-index.css');
addGlobalLink('stylesheet','https://at.alicdn.com/t/font_1776564_biuc05tmt1k.css');
addGlobalLink('stylesheet','https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/dist/app@0.2.css');
addGlobalScript("https://cdn.jsdelivr.net/gh/superBoyJack/CDN/js/element-ui-index.js");
addGlobalScript("https://cdn.jsdelivr.net/npm/vue/dist/vue.js");

  window.addEventListener(
	'load', 
	function(){
        var appMenu = document.createElement("div");
        var vueScript = document.createElement("script");
        appMenu.innerHTML = GM_getResourceText("html");
        vueScript.innerHTML = GM_getResourceText("js");
        var navbar,body;
        navbar = document.getElementById('csdn-toolbar');
        body = document.getElementsByTagName('body')[0];
        if (navbar && body) {
            navbar.parentNode.insertBefore(appMenu, navbar.nextSibling);
            body.parentNode.insertBefore(vueScript, body.nextSibling);
        }
    },true);
