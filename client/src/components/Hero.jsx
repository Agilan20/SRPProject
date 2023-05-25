import React from 'react';

const Hero = () => {
  return (
    <div className='text-white bg-gray-800'>
      <div className='max-w-[800px] mt-[-6px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-bg-indigo-600 font-bold p-2'>
          Welcome to IST Scholarship portal
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Grow with us.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Fast, flexible financial aid for you
          </p>
        </div>
        {/* <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p>
         */}
        <button className='bg-indigo-600 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;