import { Link } from 'react-router-dom'
import TrackerTable from '../tracker/TrackerTable'

export default function CardWidget({data, title, desc, category}) {
    return (
        <div className='row-span-3 col-span-3 border dark:border-darkGray dark:bg-[#1f1f1f] p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold'>{title}</h1>
                <Link 
                    className='text-black dark:text-white font-semibold text-sm underline-offset-4 hover:underline'
                    to='/search?sortBy=rating&sortDirection=desc'
                >
                    View All
                </Link>
            </div>
            <p className='text-sm font-light opacity-60 mb-2'>{desc}</p>
            <TrackerTable userTrackers={data} trackerCategory='media' />
        </div>
    )
}