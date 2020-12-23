<p align="center">
    <img src="https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/img/cover.png"
        height="310">
</p>
<p align="center">
    <a href="https://github.com/superBoyJack/CSDN-helper/releases"><img alt="Version" src="https://img.shields.io/badge/release-1.1.5-blue"/></a>
<a href="https://superboyjack.github.io/"><img alt="Author" src="https://img.shields.io/badge/author-ZainCheung-blueviolet"/></a>
  <a href="https://cn.vuejs.org/"><img alt="Vue" src="https://img.shields.io/badge/vue-2.6.11-success"/></a>
  <a href="https://element.eleme.cn/#/zh-CN/"><img alt="Element" src="https://img.shields.io/badge/element-2.13.0-blue"/></a>
</p>

[💡 简介](#简介)

[:octocat: 安装](#安装)

[📚 功能](#功能)

[📖 使用文档](https://zaincheung.github.io/CSDN-helper/)

[🐛 版本历史与更新日志](https://github.com/ZainCheung/CSDN-helper/releases)

[👻 责任说明](#责任说明)

# 简介
这是一款可以全自动点赞评论刷积分刷等级的插件，进入到CSDN博客页面后便可以自动点赞评论

可以选定点赞评论的范围，比如文章字数，浏览数或者文章的发布日期等等

# 安装

安装并使用这款插件，需要你的浏览器装有油猴[Tampermonkey](https://tampermonkey.net/)插件

| [正式版](https://greasyfork.org/zh-CN/scripts/401373-csdn%E5%8D%9A%E5%AE%A2%E5%88%B7%E7%A7%AF%E5%88%86%E5%88%B7%E7%AD%89%E7%BA%A7%E5%8A%A9%E6%89%8B) | [GitHub版](https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/main.js) |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|         在油猴上正式发布的版本, 最稳定, 更新频率较低         |         新增内容测试的地方, 更新频率高, 但功能不稳定         |


**本脚本的点赞评论均需要在登陆之后的环境下进行，否则没反应属于正常**

# 功能
1. 快速刷积分刷等级
2. 当天点赞次数用尽之后会帮你关闭自动点赞
3. 评论的内容你来提前设定,此后便会随机抽选一条内容评论
4. 纯模拟用户操作,安全并且不会引发账号异常
5. 营造博客内大家热情友好的一面
6. 增加互动,为自己的博客带来流量收益

# 评论市场

* 评论市场提供评论模板，可以快速导入到你的插件中
* 欢迎提交你的评论库到评论市场

## 使用方法

找到你感兴趣的评论，可浏览内容，可复制链接导入进你的插件

## 所有评论

|                    作者                     |                             预览                             | 类别 | 条目 | 版本 |                           导入链接                           |
| :-----------------------------------------: | :----------------------------------------------------------: | :--: | :--: | ---- | :----------------------------------------------------------: |
| [ZainCheung](https://github.com/ZainCheung) | [helloWorld](https://github.com/ZainCheung/CSDN-helper/blob/master/market/helloWorld.md) | 所有 |  28  | 1.0  | **[https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/market/file/ZainCheung/HelloWorld/helloWorld@1.0.json](https://cdn.jsdelivr.net/gh/superBoyJack/CSDN-helper/market/file/ZainCheung/HelloWorld/helloWorld@1.0.json)** |
| [ZainCheung](https://github.com/ZainCheung) | [马保国](https://github.com/ZainCheung/CSDN-helper/blob/master/market/马保国.md) | 随机 |  1   | 1.0  | **[https://cdn.jsdelivr.net/gh/ZainCheung/CSDN-helper/market/file/ZainCheung/马保国/马保国@1.0.json](https://cdn.jsdelivr.net/gh/ZainCheung/CSDN-helper/market/file/ZainCheung/马保国/马保国@1.0.json)** |
| [ZainCheung](https://github.com/ZainCheung) | [网友评论](https://github.com/ZainCheung/CSDN-helper/blob/master/market/网友评论.md) | 随机 |  13  | 1.0  | **[https://cdn.jsdelivr.net/gh/ZainCheung/CSDN-helper/market/file/ZainCheung/网友评论/网友评论@1.0.json](https://cdn.jsdelivr.net/gh/ZainCheung/CSDN-helper/market/file/ZainCheung/网友评论/网友评论@1.0.json)** |

## 加入我们

欢迎参与开源项目，提交自己制作的评论库，为开源贡献自己的一份力量。

### 提交流程：

1. 在项目的`market`目录下新建一个以你的名字（用户名或者花名都可以）为名的文件夹，里面存放的就是你的评论库。
2. 为每个库建立一个独立的文件夹，以评论库名命名，库下面放置的是各个版本的json文件以及一个README文件。
3. 提交到项目，作者会帮你更新到主页面列表中。

### json结构：

```json
{
  "commentList": {
      "type": "random",
      "count": 2,
      "author": "作者",
      "name": "评论库名",
      "version": "1.0",
      "R": [
          {
              "text": "这是第一条评论"
          }，
          {
              "text": "这是第二条评论"
          }
      ]
  }
}
```

`commentList`：最外层结构

`type`：库的类型，小写字母，推荐 `random`

|  所有   |  随机  |   分段   | 少等字数 | 中等字数 | 多等字数 |
| :-----: | :----: | :------: | :------: | :------: | :------: |
| ~~all~~ | random | ~~word~~ |  ~~s~~   |  ~~m~~   |  ~~l~~   |

注意：目前只使用**随机评论**，其他所有类型将在下一个版本废弃，请不要使用！！！

`count`： 评论数量

`author`： 作者

`name`： 评论库名

`version`： 版本，建议从1.0开始

评论内容：从示例中可以看到，在`R`列表里面有2条评论

### README结构

```
### 评论库：评论库名 

### 作者：作者名

### 类别：随机

### 条目：2

### 版本：1.0

### 导入链接：[https://cdn.jsdelivr.net/gh/ZainCheung/CSDN-helper/market/作者名/评论库名/评论库@版本.json](https://cdn.jsdelivr.net/gh/ZainCheung/CSDN-helper/market/作者名/评论库名/评论库@版本.json)

#### 随机：

1. 这是第一条评论
2. 这是第二条评论
```



# 责任说明
该脚本仅用于学习开发,请不要借此发布不良内容,如因被举报导致关进小黑屋与此项目无关
