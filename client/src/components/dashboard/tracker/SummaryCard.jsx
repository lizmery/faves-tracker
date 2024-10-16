import { Card } from 'flowbite-react'

export default function SummaryCard({ 
    cardTitle,
    trackerData,
    cardColor,
    cardHoverColor
}) {
    return ( 
        <Card href="#" className={`w-full shadow-none ${cardColor ? 'bg-' + cardColor + ' dark:bg-' + cardColor : 'bg-[#A0A0A0] dark:bg-[#a0a0a0]'} ${cardHoverColor ? ' hover:bg-' + cardHoverColor + ' dark:hover:bg-' + cardHoverColor : 'hover:bg-[#D6D6D6] dark:hover:bg-[#D6D6D6]'}`}>
            <h5 className="text-lg font-light tracking-tight text-darkGray capitalize">
                {cardTitle}
            </h5>
            <p className="font-bold text-black text-5xl lg:text-8xl">
                {trackerData}
            </p>
        </Card>
    )
}