import heroImg from '../../assets/heroImg.png'
import {
    HiChartBar,
    HiChartPie,
    HiTable,
  } from 'react-icons/hi'

export default function Features() {
    return (
        <section id='features' className="relative py-10 p-10  text-center mb-10">
            <span className='text-sm md:text-md lg:text-lg font-semibold text-darkPurple rounded-full'>
                Everything you need in one place
            </span>
            <h2 className="lg:text-6xl text-3xl font-bold mb-4 text-black">Features at a Glance</h2>
            <p className="text-grayLine mb-10 max-w-2xl mx-auto ">
                Unlock a seamless experience with all the tools you need to manage your media consumption effectively.
            </p>
            
            <div className="relative mx-auto  mb-16 bg-lightestPink rounded-lg">
                <img src={heroImg} alt="Product Preview" className="rounded-lg relative top-5 left-5 lg:top-10 lg:left-10 border border-black p-2" />
                <div className="absolute -inset-6 lg:-inset-12 bg-gradient-to-b from-transparent to-white rounded-lg"></div>
            </div>

            <div>
                <div className='flex flex-col lg:flex-row gap-4 items-center'>
                    <div className='flex-col gap-4 p-5 rounded-md  flex items-center'>
                        <div className='bg-lightestPurple flex items-center justify-center rounded-full h-12 w-12'>
                            <HiTable className='text-darkPurple text-3xl ' />
                        </div>
                        <div>
                        <span className='text-black font-bold pr-1'>Dashboard Overview. </span>
                            <p className='text-grayLine'>
                                
                                Visualize trends in your media consumption. Track and analyze your media habits over time, from viewing patterns to preferences, all in one easily accessible dashboard.
                            </p>
                        </div>
                    </div>
                    <div className='flex-col gap-4 p-5 rounded-md  flex items-center'>
                        <div className='bg-lightestGreen flex items-center justify-center rounded-full h-12 w-12'>
                            <HiChartPie className='text-darkGreen text-3xl ' />
                        </div>
                        <div>
                        <span className='text-black font-bold pr-1'>Tracker Management. </span>
                            <p className='text-grayLine'>
                                Create, edit, and remove media entries effortlessly. Organize your media library with ease, adding, updating, or deleting entries without any hassle to keep your list up to date.
                            </p>
                        </div>
                    </div>
                    <div className='flex-col gap-4 p-5 rounded-md  flex items-center '>
                        <div className='bg-lightestPink flex items-center justify-center rounded-full h-12 w-12'>
                            <HiChartBar className='text-darkPink text-3xl ' />
                        </div>
                        <div>
                        <span className='text-black font-bold pr-1'>CSV Import & Mapping. </span>
                            <p className='text-grayLine'>
                                
                                Auto-import structured lists or map CSV headers for unsupported platforms. Seamlessly import your media data from external sources and map CSV columns to the correct fields for accurate tracking.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}