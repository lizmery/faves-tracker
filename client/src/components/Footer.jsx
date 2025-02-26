import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'
import { useSelector } from 'react-redux'

export default function FooterComponent() {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <>
            {currentUser ? '' : (
                 <div className='bg-white flex items-center border-t border-lightGray px-0'>
                    <Footer container className='border-none bg-white rounded-none shadow-none px-4 lg:px-8'>
                        <div className="w-full border-none">
                            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                                <Link to='/' className='text-2xl font-bold text-black'>Media Tracker</Link>
                                <Footer.LinkGroup className=' mt-4 lg:mt-auto text-darkGray'>
                                    <Footer.Link href='/#hero'>Home</Footer.Link>
                                    <Footer.Link href='/#features'>Features</Footer.Link>
                                    <Footer.Link href='/#about'>About</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div className="w-full sm:flex sm:items-center sm:justify-between mt-8 border-t pt-8">
                                <span className='opacity-30 text-sm'>©2024 Lizmery</span>
                                <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                                    <Footer.Icon href="#" icon={BsFacebook} className='text-darkPruple' />
                                    <Footer.Icon href="#" icon={BsInstagram} className='text-darkPruple' />
                                    <Footer.Icon href="#" icon={BsTwitter} className='text-darkPruple' />
                                    <Footer.Icon href="#" icon={BsGithub} className='text-darkPruple' />
                                </div>
                            </div>
                        </div>
                    </Footer>
                </div>
            )}
        </>
    )
}