import { Card } from 'flowbite-react'

export default function SummaryCard({ 
    cardTitle,
    trackerData,
    cardColor,
    cardHoverColor,
    onClick,
    icon
}) {
    return ( 
        <Card 
            href="#" 
            className={`w-full shadow-none ${cardColor ? 'bg-' + cardColor + ' dark:bg-' + cardColor : 'bg-[#A0A0A0] dark:bg-[#a0a0a0]'} ${cardHoverColor ? ' hover:bg-' + cardHoverColor + ' dark:hover:bg-' + cardHoverColor : 'hover:bg-[#D6D6D6] dark:hover:bg-[#D6D6D6]'}`}
            onClick={onClick}
        >
            <div className='text-3xl mb-2 dark:text-black'>
                {icon}
            </div>
            <div>
                <h5 className="text-md font-semibold lg:text-lg tracking-tight text-darkGray capitalize mb-1">
                    {cardTitle}
                </h5>
                <p className="font-bold text-black text-6xl lg:text-8xl">
                    {trackerData}
                </p>
            </div>
        </Card>
    )
}