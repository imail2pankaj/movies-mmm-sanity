
import { getGenres } from '@/actions/common.action';
import { fetchFilteredRecordsPagination } from '@/actions/titles.action';
import { setTitleSortingOption } from '@/lib/utils';
import dynamic from 'next/dynamic';

const FilterBar = dynamic(() => import('./_component/FilterBar'), {
  loading: () => <p>Loading...</p>,
})

const LoadMore = dynamic(() => import('./_component/LoadMore'), {
  loading: () => <p>Loading...</p>,
})

const MovieCard = dynamic(() => import('@/components/MovieCard'), {
  loading: () => <p>Loading...</p>,
})

const Movies = async ({ searchParams }) => {

  const q = searchParams?.q || '';
  const released_year = searchParams?.released_year || '';
  const genreIds = searchParams?.genres ? searchParams.genres.split(',') : [];
  const { column, sort } = searchParams?.sort ? setTitleSortingOption(searchParams.sort) : setTitleSortingOption("a-z");

  const { records } = await fetchFilteredRecordsPagination({ query: q, genre_id: genreIds, released_year, currentPage: 1, column, sort });
console.log(records)
  const genres = ['Action',"Comedy", 'Family','Fantasy',"Crime",'Drama','Animation','Adventure','Sci-fi'];

  return (
    <>
      <section className="py-3 md:py-4 lg:py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Movies</h1>
        </div>
      </section>
      <FilterBar genres={genres} />
      <section className="py-3 md:py-4 lg:py-5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {records.map((record, index) => {
              return (
                <MovieCard
                  index={index}
                  key={record.id}
                  title={record}
                />
              );
            })}
          </div>
        </div>
        <LoadMore key={q + released_year + column + sort + genreIds.join()} q={q} released_year={released_year} genreIds={genreIds} column={column} sort={sort} />
      </section>
    </>
  );
};

export default Movies;
