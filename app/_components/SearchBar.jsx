"use client"
import { getNavbarSearch } from '@/actions/common.action';
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchBar = () => {

  const { replace } = useRouter();

  const [records, setRecords] = useState([]);
  const [q, setQ] = useState("");


  useEffect(() => {
    const handleSearch = (term) => {
      if (term.length > 2) {
        getNavbarSearch(term).then(response => {
          setRecords(response);
        })
      } else {
        setRecords([]);
      }
    };

    handleSearch(q)
  }, [q])

  const redirectUrl = (url) => {
    setQ("")
    replace(url);
  }

  return (
    <form className="relative flex-1 max-w-md">
      <SearchIcon className="absolute z-[99] left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <div className='relative'>
        <Input
          type="search"
          placeholder="Search..."
          className="w-full pl-10 pr-4 rounded-md bg-muted focus:ring-2 focus:ring-primary focus:outline-none"
          onChange={(e) => {
            setQ(e.target.value);
          }}
          value={q}
        />
      </div>
      {q.length > 0 && <ul className='w-full bg-black absolute top-10 left-0 border-1 border-white'>
        {records.map(record => (
          <li key={record.slug} className='p-2 pointer-cursor'>
            <div onClick={() => redirectUrl(record.slug)} className=' flex items-center gap-2'>
              <Image
                src={record.image}
                alt={record.name}
                width={40}
                height={80}
                className="w-12 h-18"
              />
              {record.name}
            </div>
          </li>
        ))}
      </ul>}
    </form>
  )
}

export default SearchBar