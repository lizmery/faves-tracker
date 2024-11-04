import { Button } from 'flowbite-react'
export default function CallToAction() {
    return (
        <section className="relative py-40 p-10 bg-black text-center flex-col flex items-center">
            <h2 className="lg:text-6xl text-3xl font-bold mb-4 text-white">Everything you need</h2>
            <p className="text-lightGray mb-6">All the tools you need to deploy your app efficiently</p>
            <Button className='bg-white text-black'>Get Started</Button>
        </section>

    )
}