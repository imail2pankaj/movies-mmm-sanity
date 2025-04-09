import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='border-t border-gray-800'>
      <div className='container my-8 mx-auto border-t-1'>
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Image src={`/icons/logo-white.png`} height={60} width={60} alt="Movie Database Logo" />
          <span className="sr-only">Movie Database</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 w-full justify-center my-8">
          {/* <Link href="/movies" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Movies
        </Link> */}
          <Link href="/movies" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Movies
          </Link>
          <Link href="/peoples/directors" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Directors
          </Link>
          <Link href="/peoples" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Peoples
          </Link>
          <Link href="/sitemap" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Sitemap
          </Link>
          <Link href="/privacy-policy" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
          {/* <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link> */}
        </nav>
        <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground">
        <p className="w-full text-center">Design & Developed by <Link href="https://scenicitsolutions.com" target="_blank">Scenic IT Solutions</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Footer
