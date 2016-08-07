# gulp-css-single
一个可以将你的任何风格的CSS代码转为符合NEC代码规范的形式的Gulp插件

大致原理：
1. 将CSS代码解析为AST（抽象语法树）；
2. 根据AST按NEJ风格生成新代码；
3. 返回新代码的Stream给下一个pipe；

使用方法：
1. 从npm上安装本插件：
```
npm install --save-dev gulp-css-single
```

2. gulpfile.js
```javascript
var gulp = require('gulp');
var single = require('gulp-css-single');
gulp.task('single', function() {
    gulp.src(['src.css'])
        .pipe(single({
            indent:1,
            hasSpace:true
        }))
        .pipe(gulp.dest('dist'));
});
```

3. 命令行：
```
gulp single
```

经过以上两个步骤，你可以将当前目录下的```src.css```转换成NEC风格代码,设置缩进为1且“:”后有空格，并输出到```dist```目录中。

其中，配置项可选。格式为：
```JavaScript
{
    indent: {number}  //缩进空格数,默认为1
    hasSpace: {boolean}  //属性key-value对的冒号后是否加空格，默认为true 
}
```

本插件采用```MIT```协议开源，
可以再此处获取源码[gulp-css-single](https://github.com/paoloo1995/gulp-css-single)。
欢迎fork，也欢迎contribute。

如果你觉得本插件不错，不妨来[gulp-css-single](https://github.com/paoloo1995/gulp-css-single)给个star吧！
