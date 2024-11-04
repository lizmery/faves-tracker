import heroImg from '../../assets/heroImg.png'
import { Button } from 'flowbite-react'

export default function Hero() {
    return (
        <section id='hero' className='relative flex flex-col lg:flex-row items-center lg:items-start justify-between p-10 lg:p-20 bg-[#f0f0eb] text-white overflow-hidden'>
            <div className='flex-1 max-w-xl'>
                <span className='text-sm font-semibold text-primary rounded-full py-1'
                    >What's New
                </span>
                <h1 className='mt-4 text-4xl lg:text-6xl font-bold leading-tight text-black'>
                    Deploy to the cloud with confidence
                </h1>
                <p className='mt-4 text-grayLine'>
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                </p>
                <div className='mt-6 flex space-x-4 items-center'>
                    <Button className='bg-black text-white rounded-md' size='lg'>Get Started</Button>
                    <Button className='bg-white text-black border border-black rounded-md' size='lg'>Learn More</Button>
                </div>
            </div>
            <div className='flex-1 relative mt-10 lg:mt-0 lg:ml-10'>
                <img src={heroImg} alt='Product Preview' className=' rounded-md w-[550px] min-h-[350px] lg:w-[700px] lg:min-h-[500px] max-w-none object-fill relative -right-10 lg:-right-40' />
            </div>
        </section>
    )
}