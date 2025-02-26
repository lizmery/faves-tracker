import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function CallToAction() {
    return (
        <section className="relative py-40 p-10 bg-lightestPurple">
            
            <div className='bg-white text-center flex-col flex items-center rounded-md lg:p-16 p-8 border border-black'>
            <h2 className="lg:text-6xl text-3xl font-bold mb-4 text-black">Track Your Media Like a Pro</h2>
            <p className="text-darkGray mb-6">Join today and easily organize, analyze, and enjoy your media consumption with personalized tools designed for seamless management.</p>
            <Link to='/sign-up'>
                <Button className='bg-black'>Get Started</Button>
            </Link>
            </div>
            
        </section>

    )
}