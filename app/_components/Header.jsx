import { Input } from '@/components/ui/input'
import { MenuIcon, SearchIcon } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header className="container flex items-center justify-between h-18 px-4 bg-background border-b md:px-6 py-2">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
          <Image src={'/icons/logo-white.png'} className='h-6 w-6 md:h-12 md:w-12'  height={60} width={60} alt="Movie Database Logo" />
        </Link>
        <SearchBar />
      </div>
      <nav className="hidden gap-6 text-sm font-medium md:flex">
        <Link href="/" className="px-2 py-1 rounded-md hover:text-accent-foreground" prefetch={false}>
          Home
        </Link>
        <Link href="/movies" className="px-2 py-1 rounded-md hover:text-accent-foreground">
          Movies
        </Link>
        <Link href="/peoples/directors" className="px-2 py-1 rounded-md hover:text-accent-foreground">
          Directors
        </Link>
        <Link href="/peoples" className="px-2 py-1 rounded-md hover:text-accent-foreground">
          Peoples
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs bg-background">
          <div className="grid gap-4 p-4">
            <Link
              href="/"
              className="px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className="px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground"
              // prefetch={false}
            >
              Movies
            </Link>
            <Link
              href="/peoples/directors"
              className="px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground"
              // prefetch={false}
            >
              Directors
            </Link>
            <Link
              href="/peoples"
              className="px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground"
              // prefetch={false}
            >
              Peoples
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Header