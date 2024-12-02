"use client"

import { Input } from '@/components/ui/input'
import PeopleType from './PeopleType'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { personSortingOptions } from '@/lib/constants';


const FilterBar = ({ types, showTypeFilter = true, queryTextPlaceholder = 'Search People...' }) => {

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSorting = (e) => {

    if (e === 'all') {
      params.delete('sort');
    } else {
      params.set('sort', e);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='container px-4 lg:px-8'>
      <div className='flex justify-between items-center gap-2'>
        <div className='flex justify-start items-center gap-2'>
          <Input
            className={'w-40'}
            id={'q'}
            placeholder={queryTextPlaceholder}
            type={'search'}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('q')?.toString()}
          />
          {showTypeFilter && <PeopleType types={types.map(x => ({ id: x._id, label: x.title }))} />}
        </div>
        <div className='flex items-center justify-between gap-2'>
          <Select onValueChange={(e) => handleSorting(e)}>
            <SelectTrigger>
              <SelectValue placeholder={'Select Sorting: Z-A'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={'---'} value={'all'}>{'All'}</SelectItem>
              {personSortingOptions.map(option => <SelectItem key={option.slug} value={option.slug}>{option.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
