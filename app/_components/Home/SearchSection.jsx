// import AdBanner from '@/components/AdSense/AdBanner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SearchSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Browse Movies
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Find the Perfect Movie</h2>
            <p className="max-w-[900px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Search our extensive movie database and filter by genre, rating, or release year to find the perfect
              film for your next movie night.
            </p>
          </div>
          <div className="w-full max-w-3xl">
            <form className="flex space-x-2" action='/movies'>
              <Input type="search" placeholder="Search movies..." name="q" className="flex-1 bg-white text-black placeholder:text-black" />
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className='container'>
        <AdBanner dataAdSlot="7540782661" dataAdFormat="auto" dataFullWidthResponsive={true} pId="ca-pub-6282693958918202" />
      </div> */}
    </section>
  )
}

export default SearchSection