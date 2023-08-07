## RegExp

[正则表达式(个人笔记)](https://blog.csdn.net/tinfengyee/article/details/102551273)

[正则表达式不要背](https://juejin.cn/post/6844903845227659271)

----

**捕获分组**

模式 `/(foo) (bar) \1 \2/` 中的 '`(foo)`' 和 '`(bar)`' 匹配并记住字符串 "foo bar foo bar" 中前两个单词。模式中的 `\1` 和 `\2` 表示第一个和第二个被捕获括号匹配的子字符串，即 `foo` 和 `bar`，匹配了原字符串中的后两个单词。注意 `\1`、`\2`、...、`\n` 是用在正则表达式的匹配环节，详情可以参阅后文的 [\n](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions#special-backreference) 条目。而在正则表达式的替换环节，则要使用像 `$1`、`$2`、...、`$n` 这样的语法，例如，`'bar foo'.replace(/(...) (...)/, '$2 $1')`。`$&` 表示整个用于匹配的原字符串。

**非捕获分组**

 匹配 'x' 但是不记住匹配项。这种括号叫作*非捕获括号*，使得你能够定义与正则表达式运算符一起使用的子表达式。看看这个例子 `/(?:foo){1,2}/`。如果表达式是 `/foo{1,2}/`，`{1,2}` 将只应用于 'foo' 的最后一个字符 'o'。如果使用非捕获括号，则 `{1,2}` 会应用于整个 'foo' 单词。更多信息，可以参阅下文的 [使用括号的子字符串匹配](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions#使用括号的子字符串匹配) 条目。

[`\*n*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions#special-backreference)

在正则表达式中，它返回最后的第 n 个子捕获匹配的子字符串 (捕获的数目以左括号计数)。

比如 `/apple(,)\sorange\1/` 匹配"apple, orange, cherry, peach."中的'apple, orange,' 。`$&`表示整个被匹配的字符串

> 不是 `\n` 换行，这个是 n 是 number