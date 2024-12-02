
import { fetchFilteredPersonsPagination } from '@/actions/person.action';
import { getPersonTypes } from '@/actions/common.action';
import { setPersonSortingOption } from '@/lib/functions';
import dynamic from 'next/dynamic';
// import FilterBar from '../_component/FilterBar';
// import PersonCard from '@/components/PersonCard';
// import LoadMore from '../_component/LoadMore';

const PersonCard = dynamic(() => import('@/components/PersonCard'), {
  loading: () => <p>Loading...</p>,
})

const FilterBar = dynamic(() => import('../_component/FilterBar'), {
  loading: () => <p>Loading...</p>,
})

const LoadMore = dynamic(() => import('../_component/LoadMore'), {
  loading: () => <p>Loading...</p>,
})

export const metadata = {
  title: "Popular Directors | Best Directors | MMM : Movie - Magic - Mania",
  description: "Popular Directors | Best Directors | MMM : Movie - Magic - Mania",
};

const Directors = async ({ searchParams }) => {

  const q = searchParams?.q || '';
  const born = searchParams?.born || '';
  const died = searchParams?.died || '';
  const typeIds = searchParams?.type ? searchParams.type.split(',').map(Number) : [10];
  const { column, sort } = searchParams?.sort ? setPersonSortingOption(searchParams.sort) : setPersonSortingOption("");

  const { persons } = await fetchFilteredPersonsPagination({ query: q, person_type_id: typeIds, column, sort, born, died, currentPage: 1 });

  const types = await getPersonTypes({});

  return (
    <>
      <section className="py-3 md:py-4 lg:py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Directors</h1>
        </div>
      </section>
      <FilterBar types={types} showTypeFilter={false} queryTextPlaceholder="Search Directors..." />
      <section className="py-3 md:py-4 lg:py-5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {persons.map((person, index) => {
              return (
                <PersonCard
                  index={index}
                  key={person.id}
                  person={person}
                />
              );
            })}
          </div>
        </div>
        <LoadMore key={q + died + born + typeIds.join()} q={q} born={born} died={died} typeIds={typeIds} />
      </section>
    </>
  );
};

export default Directors;
