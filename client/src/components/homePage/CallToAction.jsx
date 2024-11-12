import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function CallToAction() {
    return (
        <section className="relative py-40 p-10 bg-black text-center flex-col flex items-center">
            <h2 className="lg:text-6xl text-3xl font-bold mb-4 text-white">Lorem ipsum, dolor sit amet</h2>
            <p className="text-lightGray mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam placeat</p>
            <Link to='/sign-up'>
                <Button className='bg-white text-black'>Get Started</Button>
            </Link>
        </section>

    )
}