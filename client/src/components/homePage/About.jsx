import heroImg from '../../assets/heroImg.png'
import {
    HiChartBar,
    HiChartPie,
    HiTable,
  } from 'react-icons/hi'

export default function About() {
    return (
        <section id='about' className="relative py-20 p-10 bg-[#f0f0eb] text-center">
            <span className='text-sm font-semibold text-primary rounded-full'>
                About
            </span>
            <h2 className="lg:text-6xl text-3xl font-bold mb-4">Everything you need</h2>
            <p className="text-grayLine mb-10">All the tools you need to track your media</p>
            
            <div className="relative mx-auto max-w-3xl mb-8">
                <img src={heroImg} alt="Product Preview" className="rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f0f0eb] rounded-lg"></div>
            </div>

            <div>
                <div className='flex flex-col lg:flex-row gap-4 text-left'>
                    <div className='flex gap-4 bg-[#f0f0eb] p-5 rounded-md'>
                        <div className=''>
                            <HiTable className='text-primary text-3xl' />
                        </div>
                        <div>
                            <p className='text-grayLine'>
                                <span className='text-black font-bold pr-1'>Title. </span>
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-4 bg-[#f0f0eb] p-5 rounded-md'>
                        <div className=''>
                            <HiChartPie className='text-primary text-3xl' />
                        </div>
                        <div>
                            <p className='text-grayLine'>
                                <span className='text-black font-bold pr-1'>Title. </span>
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-4 bg-[#f0f0eb] p-5 rounded-md'>
                        <div className=''>
                            <HiChartBar className='text-primary text-3xl' />
                        </div>
                        <div>
                            <p className='text-grayLine'>
                                <span className='text-black font-bold pr-1'>Title. </span>
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}