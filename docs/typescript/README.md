## 教程

https://github.com/wangdoc/typescript-tutorial

<<<<<<< Updated upstream
https://github.com/gibbok/typescript-book

https://github.com/dzharii/awesome-typescript

https://github.com/semlinker/awesome-typescript

https://github.com/type-challenges/type-challenges
=======
## 基础数据类型

`any > unknown > 其他具体类型 > never`

1. any

- 是最顶层类型，包含所有其他类型
- 任何类型都可以赋值给 any
- any 也可以赋值给任何类型（除了 never）

1. unknown

- 是仅次于 any 的顶层类型
- 任何类型都可以赋值给 unknown
- unknown 只能赋值给 unknown 和 any
- 需要类型检查或类型断言后才能赋值给其他类型

1. void

- 表示没有返回值，可以看作只包含 undefined 和 null（启用 strictNullChecks 时只包含 undefined）
- void 可以赋值给 any
- 只有 undefined 和 null 可以赋值给 void（启用 strictNullChecks 时只有 undefined）

1. never

- 是最底层类型，是所有类型的子类型
- never 可以赋值给任何类型
- 没有任何类型可以赋值给 never（除了 never 自身）

```typescript
// any
let anyVal: any = 123;
anyVal = "string";
anyVal = true;

// unknown
let unknownVal: unknown = 123;
let str: string = unknownVal; // 错误
if(typeof unknownVal === "string") {
    str = unknownVal; // 正确，经过类型检查
}

// void
function fn(): void {
    return undefined; // 正确
    return null;      // 在非严格模式下正确
    return 123;       // 错误
}

// never
function error(): never {
    throw new Error();
}
function infiniteLoop(): never {
    while(true) {}
}

const x:5 = 4 + 1; // 报错
// 等号左侧的类型是数值5，等号右侧4 + 1的类型，TypeScript 推测为number。由于5是number的子类型，number是5的父类型，父类型不能赋值给子类型
```

>>>>>>> Stashed changes
