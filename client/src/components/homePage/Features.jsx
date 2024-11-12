import {
    HiOutlineBookOpen,
    HiOutlineFilm,
    HiOutlineDesktopComputer,
  } from 'react-icons/hi'

export default function Features() {
    return (
        <section id='features' className='mt-20 p-10 flex-col mb-10 bg-white'>
            <div className='flex flex-col justify-center items-center text-center mb-14'>
                <span className='text-sm font-semibold text-primary rounded-full'>
                    App Features
                </span>
                <h1 className='mt-2 text-4xl lg:text-6xl font-bold leading-tight text-black max-w-xl'>
                    Lorem ipsum, dolor sit amet consectetur
                </h1>
                <p className='mt-4 text-grayLine max-w-xl'>
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                </p>
            </div>
            <div className='flex flex-col lg:flex-row gap-4'>
                <div className='flex flex-col gap-4 bg-[#f0f0eb] p-5 rounded-md'>
                    <div className='bg-black p-1 w-11 h-11 rounded-lg flex items-center justify-center'>
                        <HiOutlineBookOpen className='text-white text-2xl font-light' />
                    </div>
                    <div>
                        <h1 className='font-semibold text-black'>Card Title</h1>
                        <p className=' text-grayLine pt-1'>
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-[#f0f0eb] p-5 rounded-md'>
                    <div className='bg-black p-1 w-11 h-11 rounded-md flex items-center justify-center'>
                        <HiOutlineFilm className='text-white text-2xl' />
                    </div>
                    <div>
                        <h1 className='font-semibold text-black'>Card Title</h1>
                        <p className=' text-grayLine pt-1'>
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col gap-4 bg-[#f0f0eb] p-5 rounded-md'>
                    <div className='bg-black p-1 w-11 h-11 rounded-md flex items-center justify-center'>
                        <HiOutlineDesktopComputer className='text-white text-2xl' />
                    </div>
                    <div>
                        <h1 className='font-semibold text-black'>Card Title</h1>
                        <p className=' text-grayLine pt-1'>
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}