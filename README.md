<p align="center">
    <img src="https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/img/cover.png"
        height="300">
</p>
<p align="center">
    <a href="https://github.com/superBoyJack/CSDN-helper/releases"><img alt="Version" src="https://img.shields.io/badge/release-0.2-blue"/></a>
<a href="https://superboyjack.github.io/"><img alt="Author" src="https://img.shields.io/badge/author-ZainCheung-blueviolet"/></a>
  <a href="https://cn.vuejs.org/"><img alt="Vue" src="https://img.shields.io/badge/vue-2.6.11-success"/></a>
  <a href="https://element.eleme.cn/#/zh-CN/"><img alt="Element" src="https://img.shields.io/badge/element-2.13.0-blue"/></a>
</p>

[💡 简介](#简介)

[:octocat: 安装](#安装)

[🔑 使用方法](#使用方法)

[📚 功能](#功能)

[🐛 版本历史与更新日志](https://github.com/superBoyJack/CSDN-helper/releases)

[📖 使用文档](https://github.com/superBoyJack/CSDN-helper/wiki)

[👻 责任说明](#责任说明)

# 简介
这是一款可以全自动点赞评论的插件，进入到CSDN博客页面后便可以自动点赞评论

可以选定点赞评论的范围，比如文章字数，浏览数或者文章的发布日期等等

# 安装
需要浏览器拥有[Tampermonkey](https://tampermonkey.net/)插件.

## [Tampermonkey](https://tampermonkey.net/) / [Violentmonkey](https://violentmonkey.github.io/)
完全兼容, 但在较旧的浏览器中 Violentmonkey 可能无法运行此脚本.

## [Greasemonkey](https://www.greasespot.net/)
可以安装, 但是由于 Greasemonkey 4 只允许脚本在页面完全加载后运行, 样式相关功能体验会比较糟糕, 比如打开夜间模式后每个页面在完全加载之前都是亮色的. 所以还是强烈建议您使用上述的两种脚本管理器.

点击名称即可安装👇

| [正式版](https://greasyfork.org/scripts/401373-csdn%E5%8D%9A%E5%AE%A2%E8%87%AA%E5%8A%A8%E7%82%B9%E8%B5%9E%E8%AF%84%E8%AE%BA/code/CSDN%E5%8D%9A%E5%AE%A2%E8%87%AA%E5%8A%A8%E7%82%B9%E8%B5%9E%E8%AF%84%E8%AE%BA.user.js)                                      | [GitHub版](https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/CSDN-helper.user.js)                                     |
| -------------------------------------------- | -------------------------------------------- |
| 在油猴上正式发布的版本, 最稳定, 更新频率较低 | 新增内容测试的地方, 更新频率高, 但功能不稳定 |

> 使用过程中脚本管理器可能会提示"脚本试图访问跨域资源", 请选择"始终允许".

> 某些破坏性的大更新会使旧版脚本**完全**无法运行, 请及时检查更新.

# 使用方法
安装脚本后,打开任意一篇CSDN博客文章页面,屏幕左边会出现齿轮标识,点进去进行配置.
**大多数设置, 需要保存后并刷新网页才能生效. 只有自定义的评论可以立即保存.**

# 功能
1. 对于自己的文章不会评论
2. 当天点赞次数用尽之后会帮你关闭自动点赞
3. 评论的内容你来提前设定,此后便会随机抽选一条内容评论
4. 纯模拟用户操作,安全并且不会引发账号异常
5. 营造博客内大家热情友好的一面
6. 增加互动,为自己的博客带来流量收益

# 责任说明
该脚本仅用于学习开发,请不要借此发布不良内容,如因被举报导致关进小黑屋与此项目无关
