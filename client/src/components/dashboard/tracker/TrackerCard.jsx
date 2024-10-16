import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'

const cardTheme = {
    root: {
        children: 'flex h-full flex-col justify-center gap-4 py-6 px-4'
    }
}

export default function TrackerCard({ tracker }) {
    return (
        <Card
            className='w-full 2xl:max-w-sm lg:max-w-xs shadow-none'
            theme={cardTheme}
        >
            <Link to='/'>
                <img 
                    src={tracker.image}
                    alt={`${tracker.title} cover`}
                    className='h-[230px] w-full object-fill group-hover:h-[200px] transition-all duration-300 z-20'
                />
            </Link>
            <h5 className='text-lg font-semibold line-clamp-2'>{tracker.title}</h5>
            <div>
                <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tracker.status  === 'Completed' ? 'bg-lightGreen dark:bg-accent text-black' : tracker.status  === 'In Progress' ? ' bg-lightPurple dark:bg-primary text-black' : 'bg-black text-white opacity-60 dark:bg-white dark:text-black'} `} 
                >
                    {tracker.status}
                </span>
            </div>
            
        </Card>
    )
}