"use client"
import { fetchFilteredPersonsPagination } from '@/actions/person.action';
import PersonCard from '@/components/PersonCard';
import { Loader, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

const LoadMore = ({ q,born, typeIds }) => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const { ref, inView } = useInView();
  const [hasLoadMore, setHasLoadMore] = useState(true);

  useEffect(() => {
    const loadPersons = async () => {

      // const q = searchParams?.q || '';
      // const born = searchParams?.born || '';
      // const typeIds = searchParams?.type ? searchParams.type.split(',').map(Number) : [];

      setLoading(true)
      const data = await fetchFilteredPersonsPagination({ query: q, person_type_id: typeIds, born, currentPage: page });
      setLoading(false)

      setHasLoadMore(data.persons.length >= 12)
      setPersons(prevPersons => [...prevPersons, ...data.persons]);
      setPage(prev => prev + 1);

    };
    if (inView && hasLoadMore) {
      loadPersons();
    }

    // return setPersons([])
  }, [q,born, typeIds, page, inView, setHasLoadMore, hasLoadMore]);

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {persons.map((person, index) => {
            return (
              <PersonCard
                index={page === 1 ? 0 : index % 18}
                key={person._id}
                person={person}
              />
            );
          })}
        </div>
      </div>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && loading && (
            <Loader2 className='animate-spin mx-auto' />
          )}
        </div>
      </section>
    </>
  )
}

export default LoadMore
