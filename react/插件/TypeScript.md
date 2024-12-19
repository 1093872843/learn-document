# [react 项目中使用 Type Script](https://zh-hans.react.dev/learn/typescript)

TypeScript 是一种向 JavaScript 代码添加类型定义的常用方法。TypeScript 天然支持 JSX——只需在项目中添加 @types/react 和 @types/react-dom 即可获得完整的 React Web 支持。

所有的 生产级 React 框架 都支持使用 TypeScript。

## 向现有 react 项目中添加 Type Script

1. 安装最新版本的 React 类型定义

   ```linux
   npm install @types/react @types/react-dom
   ```

2. 在 tsconfig.json 中包含以下选项

   ```json
   {
     "compilerOptions": {
       //必须在 lib 中包含 dom
       "lib": ["DOM"],
       //jsx 必须设置为一个有效的选项。
       "jsx": "react-jsx"
     }
   }
   ```

## react 项目中使用 TypeScript

```tsx
function MyButton({ title }: { title: string }) {
  return <button>{title}</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>欢迎来到我的应用</h1>
      <MyButton title="我是一个按钮" />
    </div>
  );
}
```

这种内联语法是为组件提供类型最简单的方法，但是一旦字段数量变多，他可能会变得难以管理。这时可以使用 `interface` 或 `type` 来描述.

```tsx
interface MyButtonProps {
  /** 按钮文字 */
  title: string;
  /** 按钮是否禁用 */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="我是一个禁用按钮" disabled={true} />
    </div>
  );
}
```
