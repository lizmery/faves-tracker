import { Card } from 'flowbite-react'

export default function SummaryCards({ 
    trackerType, 
    trackersCompleted, 
    trackersInProgress, 
    trackersNotStarted 
}) {
    return (
        <div className='flex flex-col md:flex-row gap-4 lg:gap-5 w-full'>
            <Card href="#" className="w-full shadow-none  dark:bg-accent bg-lightGreen hover:bg-lightestGreen dark:hover:bg-lightGreen">
                <h5 className="text-lg font-light tracking-tight text-darkGray capitalize">
                    Total {trackerType} Completed
                </h5>
                <p className="font-bold text-black text-5xl lg:text-8xl">
                    {trackersCompleted}
                </p>
            </Card>
            <Card href="#" className="w-full shadow-none  dark:bg-primary bg-lightPurple hover:bg-lightestPurple dark:hover:bg-lightPurple">
                <h5 className="text-lg font-light tracking-tight text-darkGray">
                    Total {trackerType} In Progress
                </h5>
                <p className="font-bold text-black text-5xl lg:text-8xl">
                    {trackersInProgress}
                </p>
            </Card>
            <Card href="#" className="w-full shadow-none bg-[#A0A0A0] dark:bg-[#A0A0A0] hover:bg-[#D6D6D6] dark:hover:bg-[#D6D6D6]">
                <h5 className="text-lg font-light tracking-tight text-darkGray">
                    Total {trackerType} Not Yet Started
                </h5>
                <p className="font-bold text-black text-5xl lg:text-8xl">
                    {trackersNotStarted}
                </p>
            </Card>
        </div>
    )
}