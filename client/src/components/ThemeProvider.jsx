import { useSelector } from 'react-redux'

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme)

    return (
        <div className={theme}>
            <div className='bg-[#DAD3EE] text-gray-800 dark:text-gray-200 dark:bg-bgDark min-h-screen'>
                {children}
            </div>
        </div>
    )
}