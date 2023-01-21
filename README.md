## Getting Started

First, run the development server:

```bash
npm run dev
```

## 如何切换路由

除了 Root 和 App 组件，其他组件均使用 next router

```typescript
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Events() {
  return <Link href='/#/orders'>Orders</Link>;
}
```

## 如何识别多语言？

项目使用的是 next-i18next，不同语言的场景体现在 pathname 的变化上，由于全局使用 hash 路由，所以不需要在意 path 的变化

### 如何修改语言包？

在 public 目录的 locales 下是不同语言包的 json

理论上我们同语言的所有词条都写在 common.json 里，因为我们只有一个单页，切换菜单路由仅仅是切换客户端组件修改 hash

### 在 react 组件中如何使用？

useTranslation 的依赖由 react-i18next 改成 next-i18next 即可

```typescript
import { useTranslation } from 'next-i18next';
export default function Header() {
  const { t } = useTranslation();

  console.log(t('title'));
  return (
    <div>
      <ConnectButton />
    </div>
  );
}
```
