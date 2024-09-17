import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'

export default function FooterComponent() {
    return (
        <div className=' lg:px-6 flex items-center border-t border-lightGray dark:border-darkGray'>
            <Footer container className='border-none bg-transparent dark:bg-transparent rounded-none shadow-none'>
                <div className="w-full border-none">
                    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                        <Link to='/' className='text-2xl font-bold'>Faves Tracker</Link>
                        <Footer.LinkGroup className='dark:text-grayLine mt-4 lg:mt-auto text-darkGray'>
                            <Footer.Link href='/'>Home</Footer.Link>
                            <Footer.Link href='/'>About</Footer.Link>
                            <Footer.Link href='/'>Contact</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div className="w-full sm:flex sm:items-center sm:justify-between mt-8 border-t dark:border-darkGray pt-8">
                        <span className='dark:text-lightGray opacity-30 text-sm'>©2024 Lizmery</span>
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon href="#" icon={BsFacebook} className='text-primary' />
                            <Footer.Icon href="#" icon={BsInstagram} className='text-primary' />
                            <Footer.Icon href="#" icon={BsTwitter} className='text-primary' />
                            <Footer.Icon href="#" icon={BsGithub} className='text-primary' />
                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    )
}