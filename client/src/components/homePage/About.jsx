  import {
    HiOutlineBookOpen,
    HiOutlineFilm,
    HiOutlineDesktopComputer,
  } from 'react-icons/hi'

export default function About() {
    return (
        <section id='about' className=' mt-20 lg:mt-40 p-10 flex-col mb-20 lg:mb-40 bg-white'>
            <div className='flex flex-col justify-center items-center text-center mb-14'>
                <span className='text-sm md:text-md lg:text-lg font-semibold text-darkPurple rounded-full'>
                    Stay organized and in control
                </span>
                <h1 className='mt-2 text-4xl lg:text-6xl font-bold leading-tight text-black max-w-xl'>
                    Why Media Tracker?
                </h1>
                <p className='mt-4 text-grayLine max-w-2xl'>
                    Keeping track of books, movies, and shows across different platforms is a hassle.
                    Media Tracker brings everything together in one place for easy organization and insights.
                </p>
            </div>
            <div className='flex flex-col lg:flex-row gap-8'>
                <div className='flex flex-col gap-4 bg-lightestPurple p-5 rounded-md flex-1 outline-1 outline outline-offset-8'>
                    <div className=''>
                        <HiOutlineBookOpen className='text-darkPurple text-4xl lg:text-5xl font-light' />
                    </div>
                    <div>
                        <h1 className='font-bold text-black lg:text-lg'>All-in-One-Tracking</h1>
                        <p className=' text-darkGray pt-1'>
                            No more switching between apps. Track and manage books, movies, and TV series all in one platform, 
                            keeping your media collection organized effortlessly.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-lightestGreen p-5 rounded-md flex-1 outline-1 outline outline-offset-8'>
                    <div className=''>
                        <HiOutlineFilm className='text-darkGreen text-4xl lg:text-5xl' />
                    </div>
                    <div>
                        <h1 className='font-bold text-black lg:text-lg'>Smart Insights</h1>
                        <p className=' text-darkGray pt-1'>
                            Get a deeper understanding of your media habits with interactive charts and tables that showcase 
                            your most-watched genres, highest-rated content, and more.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-lightestPink p-5 rounded-md flex-1 outline-1 outline outline-offset-8'>
                    <div className=''>
                        <HiOutlineDesktopComputer className='text-darkPink text-4xl lg:text-5xl' />
                    </div>
                    <div>
                        <h1 className='font-bold text-black lg:text-lg'>Seamless Import</h1>
                        <p className=' text-darkGray pt-1'>
                            Transfer your existing media lists from Goodreads, IMDb, MyAnimeList, and other platforms with a 
                            simple CSV upload, saving time and effort.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}