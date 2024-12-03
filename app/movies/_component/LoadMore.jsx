"use client"
import { fetchFilteredRecordsPagination } from '@/actions/titles.action';
import MovieCard from '@/components/MovieCard';
import { Loader, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';

const LoadMore = ({ q,released_year, genreIds, column, sort }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const { ref, inView } = useInView();
  const [hasLoadMore, setHasLoadMore] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {

      // const q = searchParams?.q || '';
      // const released_year = searchParams?.released_year || '';
      // const genreIds = searchParams?.type ? searchParams.type.split(',').map(Number) : [];

      setLoading(true)
      const data = await fetchFilteredRecordsPagination({ query: q, genres: genreIds, released_year, currentPage: page, column, sort });
      setLoading(false)

      setHasLoadMore(data.records.length >= 12)
      setRecords(prev => [...prev, ...data.records]);
      setPage(prev => prev + 1);

    };
    if (inView && hasLoadMore) {
      loadRecords();
    }

    // return setRecords([])
  }, [q,released_year, genreIds, page, inView, setHasLoadMore, hasLoadMore]);

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {records.map((record, index) => {
            return (
              <MovieCard
                index={page === 1 ? 0 : index % 18}
                key={record.id}
                title={record}
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
