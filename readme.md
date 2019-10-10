#### 前言
> 因为自己有写博客的习惯，有个人博客，之前用过新浪图床，感觉挺不错的。但是图片没有办法自己管理，感觉不太稳妥，后来发现Git可以作为图床，于是有了这个小工具。

#### 功能
UI 借鉴了微博图床
目前只有单上传，支持选择上传，拖拽上传，粘贴上传（这个功能现在很奇怪，复制本地的图片无效，但是复制浏览器中的图片就好使）

#### 原理
GitHub 和 Gitee 我都试过，在你的仓库里上传一张图片。例如 https://gitee.com/yintianwen7/img-rep/blob/master/test/1568210113.jpg

将上述链接中的 `blob` 替换为 `raw` 再试一下

这时候我们就有了这张图片的外链引用了。https://gitee.com/yintianwen7/img-rep/raw/master/test/1568210113.jpg


#### 安装
github上发布了windows的压缩包，解压即用。

其他平台的用户，可以下载源码编译

#### 使用
1. 在你喜欢的Git平台建立一个仓库

2. 将仓库克隆到本地
强烈推荐使用ssh，因为ssh比https要快一些，而且也免去了输入账号密码的环节

3. 进入设置页面
![](https://gitee.com/yintianwen7/img-rep2/raw/master/new/721F280D-9C74-4E54-B4CF-E3FA4D7469B5.png)

4. 然后就可以使用图床功能了
![](https://gitee.com/yintianwen7/img-rep2/raw/master/new/F9008610-95ED-4F70-B08B-4CDD08F6B974.png)