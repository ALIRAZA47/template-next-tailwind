# Next.js + Tailwind CSS Template 🚀

A production-ready Next.js 15 template with **App Router**, **Pure Tailwind CSS**, TypeScript, and best practices architecture. This template uses pure Tailwind CSS without any component library dependencies.

## ✨ Features

- ⚡️ **Next.js 15** - Latest Next.js with App Router
- ⚛️ **React 18** - Server & Client Components
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Dark/Light Theme** - System preference support
- 📱 **Responsive** - Mobile-first design
- 🔒 **TypeScript** - Full type safety
- 🏗️ **Clean Architecture** - Scalable structure
- 🎯 **Services Layer** - Clean API integration
- 🪝 **Custom Hooks** - Reusable logic
- 🔧 **Utilities** - Helper functions
- 📦 **Zustand** - Lightweight state management
- 🚀 **Server Components** - Optimal performance
- 🔄 **App Router** - File-based routing
- 💎 **Pure Tailwind** - No component library dependencies

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── dashboard/
│   ├── users/
│   ├── analytics/
│   └── settings/
│
├── components/
│   ├── ui/                 # Pure Tailwind UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Avatar.tsx
│   ├── common/             # Shared components
│   ├── layout/             # Layout components
│   └── views/              # View components
│
├── services/               # API Services
├── hooks/                  # Custom Hooks
├── utils/                  # Utilities
├── types/                  # TypeScript Types
├── constants/              # Constants
└── store/                  # State Management
```

## 🏗️ Architecture Patterns

### 1. Pure Tailwind Components

All UI components built with pure Tailwind CSS:

```tsx
// components/ui/Button.tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors'
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border-2 border-gray-300 hover:bg-gray-100'
    }
    return <button className={cn(baseStyles, variants[variant])} ref={ref} {...props} />
  }
)
```

### 2. Server & Client Components

```tsx
// Server Component (default)
export default async function Page() {
  const data = await fetchData()
  return <ClientView data={data} />
}

// Client Component
'use client'
export function ClientView({ data }) {
  // Client-side interactivity
}
```

### 3. App Router Layout System

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## 🎨 Theme System

```tsx
'use client'

export function ThemeProvider({ children }) {
  const { theme } = useThemeStore()
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  
  return <>{children}</>
}
```

## 🛠️ Development

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Next.js Tailwind Template
```

### Code Quality

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📦 Build

```bash
# Build for production
npm run build

# Output: .next/
```

## 🎯 Best Practices

✅ **Server Components**: Default for better performance
✅ **Client Components**: Only when needed
✅ **Pure Tailwind**: No component library dependencies
✅ **Type Safety**: Full TypeScript coverage
✅ **App Router**: File-based routing
✅ **Metadata API**: SEO optimization
✅ **Image Optimization**: Next.js Image component
✅ **Font Optimization**: Next.js Font optimization

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 📄 License

MIT

---

**Happy Coding!** 🚀

