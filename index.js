var through = require('through2');
var css = require('css');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-css-single';

function obj2CSS(obj,indent,hasSpace) {

    var indentStr = (function() {
        var tempStr = '';
        for (var i = 0;i<indent;i++) {
            tempStr += ' ';
        }
        return tempStr;
    }());

    var space = (function() {
        if (hasSpace) {
            return ' ';
        } else {
            return '';
        }
    }());

    var cssStr = '';

    var processRule = function(item) {
        var singleLine = '';
        var declarationStr = '';
        item.declarations.forEach(function(rule,i,arr) {
            declarationStr += rule.property + ':' + space + rule.value + ';'
        });
        singleLine += item.selectors + '{' + indentStr + declarationStr + indentStr + '}\r';
        return singleLine;
    };

    obj.stylesheet.rules.forEach(function(item,index,array) {
        var type = item.type;
        if (type !== 'rule') {
            switch (type) {
                case 'charset':
                    cssStr += '@charset ' + item.charset + ';\r';
                    return;
                case 'comment':
                    cssStr += '/* ' + item.comment + ' */\r';
                    return; 
                case 'import':
                    cssStr += '@import ' + item.import + ';\r';
                    return;
                case 'media':
                    cssStr += '@media ' + item.media + '{\r';
                    item.rules.forEach(function(it) {
                        cssStr += indentStr + processRule(it);
                    });
                    cssStr += '}\r';
                    return;

            }
        } else {
            cssStr += processRule(item);
        }
    });

    return cssStr;
}

function mainProcesser(optionObj) {
    var op = {
        indent:1,
        hasSpace:true
    };

    if (!!optionObj) {
        if ((typeof optionObj.indent !== 'number') || (typeof optionObj.hasSpace !== 'boolean')) {
            throw new PluginError(PLUGIN_NAME, 'Wrong Option Property Type!');
        }
        op = optionObj;
    };
    return through.obj(function(file,enc,cb) {
        var content = file.contents.toString();
        var cssObj = css.parse(content);
        if (!!cssObj.parsingErrors) {
            throw new PluginError(PLUGIN_NAME, 'Wrong CSS Syntax!');
        }
        content = obj2CSS(cssObj,op.indent,op.hasSpace);
        file.contents = new Buffer(content);
        this.push(file);
        cb();
    })
}

module.exports = mainProcesser;