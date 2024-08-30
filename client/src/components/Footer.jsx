import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'


export default function FooterComponent() {
    return (
        <div className='bg-[#eee] border-none'>
            <Footer container className='bg-[#eee]'>
                <div className="w-full">
                    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                        <Footer.Brand 
                            href='/'
                            name='FavesTracker'
                        />
                        <Footer.LinkGroup>
                            <Footer.Link href='/'>Home</Footer.Link>
                            <Footer.Link href='/'>About</Footer.Link>
                            <Footer.Link href='/'>Contact</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <Footer.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright  href='/' by='Lizmery' year={2024} />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon href="#" icon={BsFacebook} />
                            <Footer.Icon href="#" icon={BsInstagram} />
                            <Footer.Icon href="#" icon={BsTwitter} />
                            <Footer.Icon href="#" icon={BsGithub} />
                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    )
}