import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'


export default function FooterComponent() {
    return (
        <div className='p-2 lg:p-6 flex items-center'>
            <Footer container className='dark:bg-bgDarkSecondary bg-bgLightSecondary'>
                <div className="w-full">
                    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                        <Link to='/' className='text-2xl font-bold dark:text-primary text-accent'>Faves Tracker</Link>
                        <Footer.LinkGroup className='dark:text-textDark'>
                            <Footer.Link href='/'>Home</Footer.Link>
                            <Footer.Link href='/'>About</Footer.Link>
                            <Footer.Link href='/'>Contact</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <Footer.Divider  className='text-accent bg-accent'/>
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright  href='/' by='Lizmery' year={2024} />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon href="#" icon={BsFacebook} className='dark:text-secondary text-secondaryDark' />
                            <Footer.Icon href="#" icon={BsInstagram} className='dark:text-secondary text-secondaryDark' />
                            <Footer.Icon href="#" icon={BsTwitter} className='dark:text-secondary text-secondaryDark' />
                            <Footer.Icon href="#" icon={BsGithub} className='dark:text-secondary text-secondaryDark' />
                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    )
}