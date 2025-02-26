import heroImg from '../../assets/heroImg.png'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <section id='hero' className='relative flex flex-col lg:flex-row items-center lg:items-start justify-between p-10 lg:p-20  overflow-hidden'>
            <div className='flex-1 max-w-xl 2xl:max-w-5xl'>
                <span className='text-sm md:text-md lg:text-lg font-semibold text-darkPurple rounded-full py-1'> 
                    One app for all your media
                </span>
                <h1 className='mt-4 text-4xl lg:text-6xl font-bold leading-tight text-black'>
                    Track Your Media Effortlessly
                </h1>
                <p className='mt-4 text-grayLine'>
                Tired of juggling multiple accounts just to keep track of your favorite media?  <b>Media Tracker</b> simplifies your media consumption by bringing everything into one place
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
            <div className='flex-1 relative mt-10 lg:mt-0 left-10 2xl:left-2 2xl:ml-20 bg-lightestGreen rounded-lg'>
                <img src={heroImg} alt='Product Preview' className='p-1 border border-black rounded-md w-[550px] min-h-[350px] lg:w-[700px] 2xl:w-[900px] lg:min-h-[500px] max-w-none object-fill relative -right-5 lg:-right-10 2xl:-right-30 top-5 lg:top-10' />
                <div className="absolute -inset-5 lg:-inset-10 bg-gradient-to-b from-transparent to-white rounded-lg"></div>
            </div>
        </section>
    )
}