import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ToastContainer } from "@/components/ui/toast-container"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Construction Management Dashboard",
  description: "A dashboard for managing construction projects",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer>
          {children}
        </ToastContainer>
      </body>
    </html>
  )
}
