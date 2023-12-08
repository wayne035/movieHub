import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Hub',
  description: 'Movie Hub 是一項串流媒體服務，可在數千種連網裝置上提供各種屢獲殊榮的電視節目、電影、動漫、紀錄片等，您可以隨時隨地隨心所欲地觀看，沒有任何廣告，每週都會增加新的電視節目和電影！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
