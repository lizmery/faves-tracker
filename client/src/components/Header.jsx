import { useEffect, useState } from 'react'
import { Button, Navbar } from 'flowbite-react'

export default function Header() {
    
  return (
    <Navbar className='border-b border-zinc-200'>
        <Navbar.Brand href='/' className='dark:text-accent text-xl text-primary font-semibold'>
            Faves Tracker
        </Navbar.Brand>
        <div className='flex md:order-2 gap-2'>
            <Button className='border-accent text-darkPurple'>Sign In</Button>
            <Button className='text-darkPurple bg-accent'>Sign Up</Button>
            <Navbar.Toggle />
        </div>
    </Navbar>
  )
}