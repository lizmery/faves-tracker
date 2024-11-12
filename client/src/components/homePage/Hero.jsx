import heroImg from '../../assets/heroImg.png'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <section id='hero' className='relative flex flex-col lg:flex-row items-center lg:items-start justify-between p-10 lg:p-20 bg-[#f0f0eb] text-white overflow-hidden'>
            <div className='flex-1 max-w-xl 2xl:max-w-5xl'>
                <span className='text-sm font-semibold text-primary rounded-full py-1'
                    >What's New
                </span>
                <h1 className='mt-4 text-4xl lg:text-6xl font-bold leading-tight text-black'>
                    Keep track of everything in one place
                </h1>
                <p className='mt-4 text-grayLine'>
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                </p>
                <div className='mt-6 flex space-x-4 items-center'>
                    <Link to='/sign-up'>
                        <Button className='bg-black text-white rounded-md' size='lg'>Get Started</Button>
                    </Link>
                    <a href='/#features'>
                        <Button className='bg-white text-black border border-black rounded-md' size='lg'>Learn More</Button>
                    </a>
                    
                </div>
            </div>
            <div className='flex-1 relative mt-10 lg:mt-0 lg:ml-10'>
                <img src={heroImg} alt='Product Preview' className=' rounded-md w-[550px] min-h-[350px] lg:w-[700px] 2xl:w-[900px] lg:min-h-[500px] max-w-none object-fill relative -right-20 lg:-right-40 2xl:-right-80' />
            </div>
        </section>
    )
}