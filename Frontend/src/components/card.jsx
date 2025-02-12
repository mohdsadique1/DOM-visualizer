import React from 'react'

const card = ({ title, description }) => {
  return (
    <div className='border rounded-md p-10 bg-blue-200'>
     
    <h1 className='text-3xl mb-4 text-blue-500'>{title}</h1>
    <p className='text-blue-500 bg'>{description}</p>

   <div className='mt-10 flex gap-4'>
        <button className='bg-blue-500 px-3 py-1 rounded-full text-white'>Primary</button>
        <button className='border-blue-500 px-3 py-1 rounded-full text-blue-500'>Secondary</button>
   </div>

 </div>
  )
}

export default card;