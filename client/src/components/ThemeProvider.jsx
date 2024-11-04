import { useSelector } from 'react-redux'

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme)

    return (
        <div className={`${theme} scroll-smooth`}>
            <div className='bg-white text-black dark:text-white dark:bg-bgDark min-h-screen scroll-smooth'>
                {children}
            </div>
        </div>
    )
}