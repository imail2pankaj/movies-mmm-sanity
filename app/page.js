import { getPopularPersons } from "@/actions/common.action";
import { HOME_POPULAR_PERSONS } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import dynamic from "next/dynamic";

export const metadata = {
  title: "MMM : Movie Magic Mania | Your Ultimate Movie Database",
  description: "Discover MMM : Movie Magic Mania, your go-to platform for comprehensive movie information. Explore detailed insights on your favorite films including genres, directors, cast, ratings, and more. Stay updated with the latest releases and timeless classics.",
  openGraph: {
    title: "MMM : Movie Magic Mania | Your Ultimate Movie Database",
    description: "Discover MMM : Movie Magic Mania, your go-to platform for comprehensive movie information. Explore detailed insights on your favorite films including genres, directors, cast, ratings, and more. Stay updated with the latest releases and timeless classics.",
  },
};

const Browse = dynamic(() => import('./_components/Home/Browse'), {
  loading: () => <p></p>,
  ssr: false
})

const SearchSection = dynamic(() => import('./_components/Home/SearchSection'), {
  loading: () => <p></p>,
  ssr: false
})

const PopularPersons = dynamic(() => import('./_components/Home/PopularPersons'), {
  loading: () => <p></p>,
  ssr: false
})

const UpcomingMovies = dynamic(() => import('./_components/Home/UpcomingMovies'), {
  loading: () => <p></p>,
  ssr: false
})

const PopularMovies = dynamic(() => import('./_components/Home/PopularMovies'), {
  loading: () => <p></p>,
  ssr: false
})

const Birthdays = dynamic(() => import('./_components/Home/Birthdays'), {
  loading: () => <p></p>,
  ssr: false
})

export default async function Home() {

  const persons = await getPopularPersons(['Actor','Actress']);

  return (
    <>
      <Browse />
      <SearchSection />
      <UpcomingMovies />
      <PopularPersons persons={persons.length ? persons : []} />
      <PopularMovies />
      <Birthdays />
    </>
  );
}
