import { fetchLocations } from '@/src/config/functions';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ErrorLoading, Loading } from './loading';
import Image from 'next/image';

export const LocationForm = ({
  checkOut,
  locationDetails,
}: {
  checkOut: () => void;
  locationDetails: (area: string, street: string, description: string) => void;
}) => {
  const [area, setArea] = useState('');
  const [street, setStreet] = useState('');
  const [description, setDescription] = useState('');
  const [check, setCheck] = useState(false);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  const handleSubmit = async () => {
    await locationDetails(area, street, description);
    setCheck(true);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      {!check && (
        <div>
          <div className='font-bold mb-3'>Please Select Delivery Details</div>
          <form
            className='h-[400px] w-[300px] flex flex-col justify-between rounded-xl border-2 border-black p-2'
            onSubmit={handleSubmit}>
            <div>
              <div>Area</div>
              <select
                required
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                }}>
                <option
                  value=''
                  disabled>
                  Select Area
                </option>
                {data?.map((selection) => (
                  <option
                    key={selection.id}
                    value={selection.area}>
                    {selection.area}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Street</div>
              {area && (
                <select
                  required
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}>
                  <option
                    value=''
                    disabled>
                    Select Street
                  </option>
                  {data
                    ?.filter((section) => section.area === area)
                    .map((selection) =>
                      selection.streets.map((street) => (
                        <option key={street}>{street}</option>
                      ))
                    )}
                </select>
              )}
            </div>
            <div>
              <div>Description</div>
              <textarea
                className='h-[200px] rounded-xl border-black border-2 p-5'
                maxLength={100}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <button className='h-[40px] bg-green-500 text-white font-bold rounded-xl'>
              Submit
            </button>
          </form>
        </div>
      )}
      {check && (
        <button
          onClick={checkOut}
          className='justify-end mt-5 md:mt-10 '>
          <div className='flex w-100px md:w-[200px] p-1 md:p-2 rounded-xl justify-evenly items-center bg-green-300 text-black'>
            <Image
              src={'/checkOut.svg'}
              alt={'checkout'}
              height={30}
              width={30}
            />
            <p>Confirm Order</p>
          </div>
        </button>
      )}
    </div>
  );
};
