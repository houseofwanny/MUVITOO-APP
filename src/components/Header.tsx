import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    ChartBarIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/Auth";
import logo from "../assets/logo.svg";

const solutions = [
    {
        name: 'Favourites',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: '/favourites',
        icon: ChartBarIcon,
    },
]

export default function Header() {
    const {user, signOut} = useAuth()
    const navigate = useNavigate()
    async function handleSignOut() {
        if (signOut) {
            await signOut()
        }
        // Redirects the user to Login page
        navigate('/login')
    }
    return (
        <Popover className="relative bg-slate-600/50 z-20">
            <div className="container">
                <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="mx-auto h-12 w-auto"
                                src={logo}
                                alt="Your Company"
                            />
                        </Link>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button
                            className="inline-flex items-center justify-center rounded-md bg-slate-500 p-2 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </Popover.Button>
                    </div>


                    <div className="hidden items-center justify-end gap-4 md:flex md:flex-1 lg:w-0">
                        {
                            user ? (
                                <>
                                    <p className={'capitalize text-white  hidden md:block'}>{user?.email}</p>
                                </>
                            ) : (
                                <>
                                    <Link to="/login"
                                          className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                        Sign in
                                    </Link>
                                    <Link
                                        to="/create-account"
                                        className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )
                        }
                        {solutions.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                <item.icon className="h-6 w-6 flex-shrink-0 text-white" aria-hidden="true"/>
                                <div className="ml-4">
                                    <p className="text-base font-medium text-white">{item.name}</p>
                                </div>
                            </Link>
                        ))}
                        <button
                            onClick={handleSignOut}
                            className="ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700"
                        >
                            <div className="">
                                <p className="text-base font-medium text-white">Log out</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus
                               className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div
                        className="divide-y-2 divide-gray-50 rounded-lg bg-dark shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <Link to={'/'} className={'block'}>
                                    <img
                                        className="mx-auto h-8 w-auto"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </Link>
                                <div className="-mr-2">
                                    <Popover.Button
                                        className="inline-flex items-center justify-center rounded-md bg-slate-700 p-2 text-white hover:bg-slate-700  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {solutions.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="-m-3 flex items-center rounded-md p-3 transition duration-150 hover:bg-slate-500"
                                        >
                                            <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600"
                                                       aria-hidden="true"/>
                                            <span
                                                className="ml-3 text-base font-medium text-gray-200">{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">
                            {
                                user ? (
                                    <>
                                        <pre className={'capitalize text-slate-100 text-center'}>{user?.email}</pre>
                                        <div>
                                            <button
                                                onClick={handleSignOut}
                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <Link
                                                to="/create-account"
                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Sign up
                                            </Link>
                                            <p className="mt-6 text-center text-base font-medium text-gray-500">
                                                Existing customer?{' '}
                                                <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                                                    Sign in
                                                </Link>
                                            </p>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
