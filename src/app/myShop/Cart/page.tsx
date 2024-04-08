'use client';
import { ItemsToggle } from '@/src/components/reusables/ItemsToggle';
import { LocationForm } from '@/src/components/reusables/locationForm';
import useCartStore from '@/src/store/cartStore';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Cart() {
  const {
    items,
    removeItems,
    checkOut,
    updateTotalAndAmount,
    locationDetails,
  } = useCartStore();
  const [location, setLocation] = useState(false);

  return (
    <main className='p-2 md:p-10 h-[100dvh] w-full'>
      <p className='text-purple-600 font-[800] text-xl mb-2 md:mb-10'>
        Shopping Cart
      </p>
      {items.length > 0 ? (
        <section>
          {!location && (
            <>
              <ul className='w-full'>
                <div className='grid grid-cols-4 md:grid-cols-6 mb-1 md:mb-5'>
                  <div className=' md:col-span-3 font-bold'>Item</div>
                  <div className='font-bold'>Amount</div>
                  <div className='font-bold'>Items</div>
                  <div className='flex justify-center font-bold'>Remove</div>
                </div>
                {items.map((item) => (
                  <li
                    key={item.item_id}
                    className='grid grid-cols-4 md:grid-cols-6 mb-1 md:mb-5 items-center'>
                    <div className='flex flex-col md:flex-row md:col-span-3  md:items-center'>
                      <img
                        src={item.image}
                        height={50}
                        width={50}
                      />
                      <p className='line-clamp-2'>{item.name} </p>
                    </div>
                    <div>{item.newAmount}</div>
                    <div>
                      <ItemsToggle
                        items={item.total}
                        itemId={item.item_id}
                        updateTotalAndAmount={updateTotalAndAmount}
                      />
                    </div>
                    <div className='flex justify-center '>
                      <button onClick={() => removeItems(item.item_id)}>
                        {' '}
                        <Image
                          src={'/cancel.svg'}
                          alt={'checkout'}
                          height={30}
                          width={30}
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setLocation(true)}
                className='justify-end mt-5 md:mt-10 '>
                <div className='flex w-100px md:w-[200px] p-1 md:p-2 rounded-xl justify-evenly items-center bg-green-300 text-black'>
                  <Image
                    src={'/checkOut.svg'}
                    alt={'checkout'}
                    height={30}
                    width={30}
                  />
                  <p>Check Out</p>
                </div>
              </button>
            </>
          )}
          {location && (
            <LocationForm
              checkOut={checkOut}
              locationDetails={locationDetails}
            />
          )}
        </section>
      ) : (
        <div>No Items Yet....</div>
      )}
    </main>
  );
}
