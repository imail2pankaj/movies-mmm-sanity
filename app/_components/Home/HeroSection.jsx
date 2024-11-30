import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <Image
          src="/placeholder.webp"
          width={600}
          height={900}
          alt="Movie Poster"
          className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover sm:w-full"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Movie Database</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover the latest movies, TV shows, actors, and directors. Search, browse, and explore our
            comprehensive database.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Input
              type="text"
              placeholder="Search for a movie, TV show, actor, or director"
              className="max-w-lg flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-[#87ceeb] dark:focus:ring-gray-300"
            />
            <Button size="lg" className="w-full min-[400px]:w-auto">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection