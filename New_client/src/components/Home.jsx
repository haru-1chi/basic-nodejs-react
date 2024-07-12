import React from 'react'

function Home() {
  return (
    <div className='Home-page flex justify-center mt-32'>
        <div className="content w-[769px] h-[423px] bg-white dark:bg-[#3D2C8D] rounded-[20px] pt-24 px-12 shadow-lg">
            <h1 className='text-5xl text-[#03AED2] dark:text-[#C996CC] text-center mb-14'>Welcome to User's Playground!</h1>
            <p className='text-xl text-[#03AED2] dark:text-[#C996CC] text-left'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        </div>
    </div>

  )
}

export default Home