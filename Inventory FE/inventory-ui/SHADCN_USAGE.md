# Cách sử dụng shadcn/ui trong project

## Setup đã hoàn tất ✅

1. ✅ Tailwind CSS đã được cài đặt và cấu hình
2. ✅ CRACO đã được setup để hỗ trợ path aliases
3. ✅ shadcn/ui dependencies đã được cài đặt
4. ✅ `components.json` đã được tạo
5. ✅ `src/lib/utils.js` đã được tạo với hàm `cn()`
6. ✅ Example Button component đã được tạo

## Cách thêm components từ shadcn/ui

### Option 1: Sử dụng CLI (khuyến nghị)

1. Cài đặt shadcn CLI globally:
```bash
npm install -g shadcn-ui
```

2. Thêm component:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

### Option 2: Copy thủ công

1. Truy cập https://ui.shadcn.com/docs/components
2. Chọn component bạn muốn
3. Copy code và paste vào `src/components/ui/[component-name].jsx`

## Cách sử dụng components

```jsx
import { Button } from "@/components/ui/button"

function MyComponent() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  )
}
```

## Lưu ý

- Tất cả components sẽ được lưu trong `src/components/ui/`
- Sử dụng `@/` để import (đã được cấu hình trong `craco.config.js` và `jsconfig.json`)
- Sử dụng hàm `cn()` từ `@/lib/utils` để merge Tailwind classes

## Chạy project

```bash
npm start
```

Project sẽ chạy với CRACO và hỗ trợ đầy đủ Tailwind CSS + shadcn/ui!

