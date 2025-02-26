import { Card } from 'flowbite-react'

export default function SummaryCard({ 
    cardTitle,
    trackerData,
    cardColor,
    darkModeCardColor,
    cardHoverColor,
    darkCardHoverColor,
    onClick,
    icon
}) {
    return ( 
        <Card 
            href="#" 
            className={`w-full shadow-none 
                        dark:bg-${darkModeCardColor} 
                        bg-${cardColor} 
                        hover:bg-${cardHoverColor} 
                        dark:hover:bg-${darkCardHoverColor}`}
            onClick={onClick}
        >
            <div className='text-3xl mb-2 dark:text-white'>
                {icon}
            </div>
            <div>
                <h5 className={`text-md font-semibold lg:text-lg tracking-tight text-darkGray dark:text-${cardHoverColor} capitalize mb-1`}>
                    {cardTitle}
                </h5>
                <p className={`font-bold text-black dark:text-white text-6xl lg:text-8xl`}>
                    {trackerData}
                </p>
            </div>
        </Card>
    )
}