export const navTheme = {
    toggle: {
        base: 'inline-flex items-center rounded-lg p-2 text-sm text-black focus:outline-none dark:text-lightGray md:hidden dark:hover:text-grayLine hover:text-grayLine'
    },
    root: {
        base: 'py-2.5',
        inner: {
            base: 'flex flex-wrap items-center justify-between px-4 lg:px-6'
        }
    }
}

export const navDropdownTheme = {
    floating: {
        divider: 'my-1 h-px bg-gray-100 dark:bg-grayLine',
        item: {
            base: 'flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-grayLine dark:hover:text-white dark:focus:bg-grayLine dark:focus:text-white',
        },
        style: {
            auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-darkGray dark:text-white'
        }
    }
}

export const dashNavTheme = {
    toggle: {
        base: 'lg:p-3 p-2 inline-flex items-center text-sm text-black focus:outline-none dark:text-lightGray dark:hover:text-grayLine hover:text-grayLine'
    },
    root: {
        base: 'py-2.5',
        inner: {
            base: 'flex items-center justify-between px-2 lg:px-6'
        }
    }
}

export const dashDrawerTheme = {
    root: {
        base: 'fixed z-40 overflow-y-auto bg-white py-1 px-4 transition-transform',
        position: {
            left: {
                on: 'left-0 top-0 h-screen lg:w-80 w-full transform-none',
                off: 'left-0 top-0 h-screen lg:w-80 w-full -translate-x-full',
            }
        }
    }
}

export const dashSidebarTheme = {
    root: {
        inner: 'bg-transparent p-2 overflow-y-auto overflow-x-hidden',
    },
    item: {
        base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal  dark:hover:text-white opacity-60 hover:opacity-100 py-3 px-5',
        active: 'dark:bg-white bg-black text-white rounded-2xl dark:text-black opacity-100 rounded-full',
        icon: {
          base: 'h-6 w-6 flex-shrink-0 text-bgDark transition duration-75 group-hover:text-gray-900 text-primary dark:group-hover:text-white',
          active: ''
        },
    },
    logo: {
        base: 'mb-24 lg:mb-16 flex items-center'
    }
}

export const inputTheme = {
    field: {
        input: {
            colors: {
                gray: 'dark:bg-transparent border text-darkGray dark:text-lightGray border-lightGray dark:border-grayLine dark:placeholder:text-lightGray placeholder:text-darkGray placeholder:opacity-60 focus:ring-1 focus:border-primary focus:ring-primary dark:focus:ring-primary'
            },
        },
        select: {
            colors: {
                gray: 'dark:bg-transparent border text-darkGray dark:text-lightGray border-lightGray dark:border-grayLine dark:placeholder:text-lightGray placeholder:text-darkGray placeholder:opacity-60 focus:ring-1 focus:ring-primary dark:focus:ring-primary focus:border-primary',
            },
        },
    },
}

export const fileInputTheme = {
    field: {
        base: 'relative w-full',
        input: {
            colors: {
                gray: 'border-lightGray border bg-transparent text-darkGray focus:border-primary focus:ring-primary dark:border-grayLine dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500'
            }
        }
    }
}

export const modalTheme = {
    root: {
        base: 'fixed inset-x-0 top-0 z-[100] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full'
    }
}

export const drawerTheme = {
    root: {
        base: 'fixed z-[100] overflow-y-auto bg-white py-1 px-4 transition-transform',
        position: {
            right: {
                'on': 'right-0 top-0 h-screen lg:w-[35rem] w-full transform-none',
                'off': 'right-0 top-0 h-screen lg:w-[35rem] w-full translate-x-full',
            },
        },
    },
    header: {
        inner: {
            titleText: 'mb-4 inline-flex items-center text-base font-semibold text-lg'
        }
    }
}

export const cardTheme = {
    root: {
        children: 'flex h-full flex-col justify-center gap-4 py-6 px-4'
    }
}

export const tableTheme = {
    head: {
        base: 'font-normal',
        cell: {
            base: 'lg:px-5 lg:py-4 p-4 2xl:px-[2rem] text-grayLine text-left'
        }
    },
    body: {
        cell: {
            base: 'lg:px-5 lg:py-6 p-4 2xl:px-[2rem]'
        }
    },
    root: {
        base: 'lg:text-sm text-xs'
    }
}

export const overviewTableTheme = {
    head: {
        base: 'font-normal',
        cell: {
            base: 'p-4 text-grayLine 2xl:px-[1.5rem]'
        }
    },
    body: {
        cell: {
            base: 'p-4 2xl:px-[1.5rem]'
        }
    },
    root: {
        base: 'text-left lg:text-sm text-xs'
    }
}
