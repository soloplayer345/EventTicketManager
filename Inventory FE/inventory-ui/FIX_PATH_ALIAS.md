# Fix Path Alias Issue

## Vấn đề
Lỗi: `Can't resolve '@/components/ui/button'`

## Giải pháp đã áp dụng:

1. ✅ Đã cập nhật `craco.config.js` để đảm bảo webpack resolve đúng extensions và aliases
2. ✅ Đã thay đổi import tạm thời sang relative path để test
3. ✅ Đã fix import trong `button.jsx` để dùng relative path

## Các bước tiếp theo:

### Option 1: Sử dụng relative imports (đang dùng)
```jsx
import { Button } from "../components/ui/button";
```

### Option 2: Sử dụng path alias (sau khi restart server)
1. **Dừng dev server** (Ctrl+C)
2. **Xóa cache:**
   ```bash
   rm -rf node_modules/.cache
   ```
   Hoặc trên Windows:
   ```powershell
   Remove-Item -Recurse -Force node_modules\.cache
   ```
3. **Restart dev server:**
   ```bash
   npm start
   ```
4. **Sau đó có thể dùng:**
   ```jsx
   import { Button } from "@/components/ui/button";
   ```

### Option 3: Đổi file extension từ .jsx sang .js
Nếu vẫn lỗi, có thể đổi `button.jsx` thành `button.js` vì React 19 hỗ trợ JSX trong .js files.

## Kiểm tra:

1. Đảm bảo `craco.config.js` có đúng cấu hình
2. Đảm bảo `jsconfig.json` có đúng paths
3. Restart dev server sau khi thay đổi config files
4. Clear cache nếu cần

