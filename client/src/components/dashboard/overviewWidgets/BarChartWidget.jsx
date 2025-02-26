import { 
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip, 
    ResponsiveContainer 
} from 'recharts'

export default function BarChartWidget({data, title, desc}) {
    return (
        <div className='p-4 row-span-2 col-span-3 border dark:border-darkGray dark:bg-[#1f1f1f] rounded-md max-h-[600px]'>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p className='text-sm font-light opacity-60 mb-4'>{desc}</p>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip />

                    {/* Series category */}
                    <Bar dataKey='Series_Completed' stackId='Series' fill='#63BB95' />
                    <Bar dataKey='Series_In Progress' stackId='Series' fill='#826EBF' />
                    <Bar dataKey='Series_Not Started' stackId='Series' fill='#D4D2D2' />

                    {/* Books category */}
                    <Bar dataKey='Books_Completed' stackId='Books' fill='#63BB95' />
                    <Bar dataKey='Books_In Progress' stackId='Books' fill='#826EBF' />
                    <Bar dataKey='Books_Not Started' stackId='Books' fill='#D4D2D2' />

                    {/* Movies category */}
                    <Bar dataKey='Movies_Completed' stackId='Movies' fill='#63BB95' />
                    <Bar dataKey='Movies_In Progress' stackId='Movies' fill='#826EBF' />
                    <Bar dataKey='Movies_Not Started' stackId='Movies' fill='#D4D2D2' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}