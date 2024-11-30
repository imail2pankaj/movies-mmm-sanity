"use client"

import { fetchPersonsBirthdayToday } from "@/actions/person.action";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const BirthdayCarousel = dynamic(() => import('./BirthdayCarousel'), {
  loading: () => <p></p>
})

const Birthdays = () => {
  const [bdays, setBdays] = useState([])

  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  useEffect(() => {

    const getBdays = async () => {
      const b = await fetchPersonsBirthdayToday(day, month);
      setBdays(b)
    }
    getBdays()
  }, [day, month])


  if (!bdays) {
    return null;
  }

  return (
    <div className="container mb-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">Star Birthdays: Celebrate with the Stars</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover which celebs are blowing out candles today {(new Date().getDate())} {(new Date()).toLocaleString('default', { month: 'long' })}!
          </p>
        </div>
      </div>
      {
        bdays.length > 0 ?
          <div className=" p-6 text-center">
            <BirthdayCarousel bdays={bdays} />
            <Button asChild className="my-8 p-4">
              <Link href={`/peoples?born=${(new Date()).toLocaleString('default', { month: '2-digit' })}-${(new Date().getDate())}`} className="btn-primary">View All</Link>
            </Button>
          </div>
          :
          <p className="text-center my-8">No birthdays for this day</p>
      }

    </div>
  )
}

export default Birthdays