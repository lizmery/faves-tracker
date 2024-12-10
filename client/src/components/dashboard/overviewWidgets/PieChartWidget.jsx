import { 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts'

const COLORS = ['#A1E091', '#5E48A3', '#826EBF', '#DAD4EC', '#D4D2D2']

export default function PieChartWidget({data, title, desc}) {
    return (
        <div className='row-span-3 lg:col-span-1 col-span-3 border dark:border-darkGray dark:bg-[#1f1f1f] p-4 rounded-md w-full max-h-[600px] h-full'>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p className='text-sm font-light opacity-60 w-full'>{desc}</p>
            <ResponsiveContainer width='100%' height='90%'>
                <PieChart height={200}>
                    <Pie
                        data={data}
                        dataKey='value'
                        nameKey='name'
                        cx='50%'
                        cy='50%'
                        outerRadius={80}
                        innerRadius={60}
                        paddingAngle={2}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconType='circle' />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}