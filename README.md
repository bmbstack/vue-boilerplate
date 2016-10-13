#vue-boilerplate

## 注意事项
- windows 系统使用`npm run dev`会发生奇怪的事情[^win-webapck-dashboard], 请使用`npm run dev:win`;


## History
- 2016年09月23日 
    添加less-loader, 加载vue文件之外的less文件;

- 2016年09月24日
    1. 添加工作平台操作系统识别,windows在以下情况下需要特殊处理:
        - 在开发时引用compatible.js文件,需要手动require, 无法在模板中通过script引入
    2. 验证编译条件环境标识通过
    3. 添加JSON-loader

[^win-webapck-dashboard]:就是webpack-dashboard暂时不支持windows系统导致的.
