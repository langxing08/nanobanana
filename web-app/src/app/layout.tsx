import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nano Banana - 像素级复刻（Next + Tailwind）',
  description: '依据提供的长图截图复刻首页布局与样式（静态）。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
