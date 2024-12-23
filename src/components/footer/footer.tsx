import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="py-6 px-4 md:px-6 border-t bg-gray-900 border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-gray-200 dark:text-gray-400">
                    &copy; 2024 
                    <Link className="hover:underline mx-2" to="/">
                    KenkoNav 
                    </Link>
                    | All rights reserved.
                </p>
                <nav className="flex gap-4 mt-4 sm:mt-0">
                    {/* <Link className="text-sm text-gray-200 hover:underline hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100" to="/privacy_policy">
                        <p>Privacy Policy</p> 
                    </Link>
                    <Link className="text-sm text-gray-200 hover:underline hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100" to="/tos">
                        <p>Terms of Service</p>
                    </Link> */}
                    <PolicyLinks route="/privacy_policy" text="Privacy Policy"/>
                    <PolicyLinks route="/tos" text="Terms of Service"/>

                </nav>
            </div>
        </footer>
    )
}

const PolicyLinks = ({route, text} : {route: string, text: string}) => {
    return (
        <Link className='text-sm text-gray-200 hover:underline hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-100' to={route}>
            <p>{text}</p>
        </Link>
    )
}
    

export default Footer