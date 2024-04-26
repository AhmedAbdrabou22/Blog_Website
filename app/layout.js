import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { FaHome } from "react-icons/fa";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  // useClient(); // Mark this component as a client component

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='font navbar'>
          <div>
            <div>
              <Link href="/" className='logo'>
                <h1>Serv5</h1>
              </Link>
            </div>
          </div>
          <div>
            <Link className='tabs' href="/">
              <FaHome />
              <span className='navDetails'>Home</span>
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
