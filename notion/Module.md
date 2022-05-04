# Module(模块引入)

模块设计模式目前应用得比较多的是 CJS, AMD, UMD 和 ESM 

## 模块设计

### CJS（CommonJS）

```js
// @filename: util.cjs 
module.exports.sum = (x, y) => x + y; 
// @filename: main.cjs 
const {sum} = require('./util.cjs'); 
console.log(sum(2, 4));
```

```js
// @filename: util.cjs 
module.exports = (x, y) => x + y; 
// @filename: main.cjs 
const whateverWeWant = require('./util.cjs'); 
console.log(whateverWeWant(2, 4));
```

CJS 的 require() 是同步的，实际执行的时候会从磁盘或者网络中读取文件，然后立即返回执行结果。被读取的模块有自己的执行逻辑，执行完成后通过 module.exports 返回结果。

- 很多人可以从 Node 中立刻认出 CJS 的语法。这是因为 Node 就是使用 CJS 模块的
- CJS 是同步导入模块
- 你可以从 `node_modules` 中引入一个库或者从本地目录引入一个文件 。如 `const myLocalModule = require('./some/local/file.js')` 或者 `var React = require('react'); `，都可以起作用
- 当 CJS 导入时，它会给你一个导入对象的副本
- CJS 不能在浏览器中工作。它必须经过转换和打包

### AMD

AMD 代表异步模块定义。下面是一个示例代码

```js
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});
```

```js
// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');
    return function () {};
});
```

- AMD 是异步(asynchronously)导入模块的(因此得名)
- 一开始被提议的时候，AMD 是为前端而做的(而 CJS 是后端)
- AMD 的语法不如 CJS 直观。我认为 AMD 和 CJS 完全相反

### UMD（Universal Module Definition）

UMD 代表通用模块定义（Universal Module Definition）。下面是它可能的样子

```js
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { 
        // ... 
    };

    return Requester;
}));
```

- 在前端和后端都适用（“通用”因此得名）
- 与 CJS 或 AMD 不同，UMD 更像是一种配置多个模块系统的模式。
- 当使用 Rollup/Webpack 之类的打包器时，UMD 通常用作备用模块


### ESM（ES Modules）

```js
// @filename: util.mjs 
export const sum = (x, y) => x + y; 
// @filename: main.mjs 
import {sum} from './util.mjs' 
console.log(sum(2, 4));
```

```js
// @filename: util.mjs 
export default (x, y) => x + y; 
// @filename: main.mjs 
import whateverWeWant from './util.mjs' 
console.log(whateverWeWant(2, 4));
```

- 在很多现代浏览器可以使用
- 它兼具两方面的优点：具有 CJS 的简单语法和 AMD 的异步
- 得益于 ES6 的静态模块结构，可以进行  Tree Shaking
- ESM 允许像 Rollup 这样的打包器，删除不必要的代码，减少代码包可以获得更快的加载
- 可以在 HTML 中调用，只要如下

```html
<script type="module">
  import {func1} from 'my-lib';

  func1();
</script>
```

ESM 的模块加载是基于 Top-level await 设计的，首先解析 import 和 export 指令，再执行代码，所以可以在执行代码之前检测到错误的依赖。

ESM 模块加载器在解析当前模块依赖之后，会下载这些依赖模块并在此解析，构建一个模块依赖图，直到依赖全部加载完成。最后，按照编写的代码，顺序对应的依赖。

根据 ESM 约定，这些依赖的 ES 模块都是并行下载最后顺序执行。


## 总结

- 由于 ESM 具有简单的语法，异步特性和可摇树性，因此它是最好的模块化方案
- UMD 随处可见，通常在 ESM 不起作用的情况下用作备用
- CJS 是同步的，适合后端
- AMD 是异步的，适合前端


## ESM vs Webpack

最近的 snowpack / vite 等基于 ESM 的构建工具为什么比 Webpack 快？

### 为什么需要打包

`打包`是为了把各个模块化设计模式转化为浏览器可以解读的模式。

`模块化设计`是为了隔离和管理我们复杂的项目内的函数和变量作用域。


### 为什么 ESM 的构建工具比 Webpack 快？

而现在主流的浏览器都支持了都支持 ESM 

- 首先它们的构建复杂度非常低，修改任何组件都只需做单文件编译，时间复杂度永远是 O(1)
- 借助 ESM 的能力，模块化交给浏览器端，不存在资源重复加载问题，如果不是涉及到 jsx 或者 typescript 语法，甚至可以不用编译直接运行

### esbuild 

esbuild使用golang开发，在打包的速度上非常快，我们熟悉的vite工具在dev模式下就是使用esbuild进行打包。

- 在没有缓存的情况也能有极致的性能
- 支持ES6的Tree shaking
- 原生支持typescript和jsx打包
- 支持Source Map
- 代码压缩
- 支持定义插件

## 相关引用及更详细的了解

- [【译】Node 模块之战：为什么 CommonJS 和 ES Module 不能共存](https://juejin.cn/post/6865557155102064648) - 这个文章说的比较清楚

- [ESM vs Webpack 面向高性能构建的探索](https://juejin.cn/post/6947890290896142350)

- [【面试说】Javascript 中的 CJS, AMD, UMD 和 ESM是什么？](https://juejin.cn/post/6935973925004247077)

- [umd](https://github.com/umdjs/umd/)

- [哪些版本的浏览器支持ESM](https://jakearchibald.com/2017/es-modules-in-browsers/)

- [新一代打包工具esbuild](https://juejin.cn/post/6992860503278092302)