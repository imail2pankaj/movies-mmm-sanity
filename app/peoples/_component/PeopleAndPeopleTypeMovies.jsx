"use client"
import { getPersonsInPersonTypeInTitles } from "@/actions/common.action";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getImageURL } from "@/lib/functions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PeopleAndPeopleTypeMovies = ({ personType, personId, fullName }) => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    getPersonsInPersonTypeInTitles(personType.value, personId).then(response => {
      setMovies(response)
    })
  }, [personType, personId])

  return (
    <>
      <AccordionItem value={personType.value} className="border p-4">
        <AccordionTrigger className="text-xl hover:no-underline">{fullName} as {personType.label} ({movies.length})</AccordionTrigger>
        <AccordionContent>
          {movies.map(x => (
            <Link href={`/movies/${x.titles.slug}`} className="flex justify-between py-2 border-b border-gray-500" key={x.id}>
              <div className="flex flex-start">
                <Image src={getImageURL('titles', x.titles.image)} height={80} width={55} alt={x.titles.title} priority={false} loading="lazy" />
                <div className="ml-4">
                  <p className="text-lg">{x.titles.title}</p>
                  <p className="text-sm text-gray-400">{x.title}</p>
                  <p className="text-sm text-gray-400">{x.titles.release_date > new Date() ? 'Upcoming' : "Previous"}</p>
                </div>
              </div>
              <div>
                {x.titles.year}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default PeopleAndPeopleTypeMovies;