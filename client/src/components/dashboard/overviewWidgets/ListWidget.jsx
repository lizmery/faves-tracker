import { Link } from 'react-router-dom'

export default function ListWidget({data, title, desc}) {
    return (
        <div className='row-span-3 p-4 border dark:border-darkGray dark:bg-[#1f1f1f] rounded-md flex flex-col w-full col-span-3 lg:col-span-1'>
            <div className='flex justify-between items-center'> 
                <h1 className='text-xl font-bold'>{title}</h1>
                <Link 
                    className='text-black dark:text-white font-semibold text-sm underline-offset-4 hover:underline'
                    to='/search?sortDirection=desc'
                >
                    View All
                </Link>
            </div>
            {desc && (
                <p className='text-sm font-light opacity-60'>{desc}</p>
            )}
            <div className='flow-root w-full mt-4'>
                <ul className='divide-y divide-lightGray dark:divide-grayLine'>
                    {data.map((tracker) => (
                        <li className='py-3 sm:py-4' key={tracker._id}>
                            <Link to={`/tracker/${tracker._id}`}>
                                <div className='flex items-center space-x-4'>
                                    <div className='shrink-0 p-1'>
                                        <img src={tracker.image} className='h-[40px] w-[40px] rounded-full' />
                                    </div>
                                    <div className=''>
                                        <p className='truncate text-sm font-medium'>{tracker.title}</p>
                                        <p className='truncate text-sm font-light opacity-60'>{tracker.by}</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}