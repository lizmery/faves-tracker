import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { cardTheme } from '../../../flowbiteThemes/customThemes'

export default function TrackerCard({ tracker }) {
    return (
        <Card
            className='w-full 2xl:max-w-sm lg:max-w-xs shadow-none dark:bg-[#1f1f1f] dark:border-darkGray'
            theme={cardTheme}
        >
            <Link to={`/tracker/${tracker._id}`}>
                <img 
                    src={tracker.image}
                    alt={`${tracker.title} cover`}
                    className='h-[230px] w-full object-fill group-hover:h-[200px] transition-all duration-300 z-20'
                />
            </Link>
            <p className='font-light text-xs opacity-60'>{new Date(tracker.createdAt).toLocaleDateString('en-US', { timeZone: 'UTC' }) }</p>
            <h5 className='text-lg font-semibold line-clamp-2'>
                <Link to={`/tracker/${tracker._id}`}>
                    {tracker.title}
                </Link>
            </h5>
            <div>
                <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tracker.status  === 'Completed' ? 'bg-lightGreen dark:bg-accent text-black' : tracker.status  === 'In Progress' ? ' bg-lightPurple dark:bg-primary text-black' : 'bg-black text-white opacity-60 dark:bg-white dark:text-black'} `} 
                >
                    {tracker.status}
                </span>
                <p className='pt-5 text-3xl'>{tracker.rating}</p>
            </div>
        </Card>
    )
}