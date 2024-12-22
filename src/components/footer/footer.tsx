import Link from 'next/link';

const footer = () => {
    return (
        <footer className="py-6 px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    &copy; 2024 
                    <Link className="hover:underline mx-2" href="/">
                    KenkoNav 
                    </Link>
                    | All rights reserved.
                </p>
                <nav className="flex gap-4 mt-4 sm:mt-0">
                    <Link className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" href="/privacy_policy">
                        <p>Privacy Policy</p> 
                    </Link>
                    <Link className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" href="/tos">
                        <p>Terms of Service</p>
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default footer