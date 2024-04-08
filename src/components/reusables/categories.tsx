'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/src/config/functions';
import { ErrorLoading, Loading } from './loading';

export default function CategoriesComponent() {
  const pathname = usePathname();
  const { isLoading, isError, data } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <div className='flex h-fit overflow-x-auto'>
      {data!.map((e) => (
        <Link
          key={e.category_id}
          href={`/myShop/Category/${e.category_id}`}>
          <div
            className={`flex flex-col items-center justify-center ml-2 mr-2 md:mr-10 md:ml-10  ${
              pathname.includes(e.category_id)
                ? 'border-b-[5px] border-purple-600'
                : ''
            } `}
            key={e.category_id}>
            <img
              src={e.url}
              alt={'icon'}
              height={50}
              width={50}
            />
            <h3 className='text-center'>{e.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
