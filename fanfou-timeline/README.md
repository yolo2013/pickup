偶然看到张小龙在10年到12年微信开发阶段在饭否的记录，写下这个脚本爬下来供自己阅读。

## 参数说明
配置文件在config.js
### userId
如果你想爬饭否其他人的数据，将userId替换即可，userId直接从浏览器地址栏就能取到，假如地址栏中是：http://fanfou.com/~RLhcIDBjZBB/p.1，那么userId就是`RLhcIDBjZBB`

### cookie
打开开发者工具，在网络请求中，可以看到请求头中的cookie，粘贴过来即可。

### target
生成文件的位置