import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <div className='bg-yellow-200 h-full gap-8 xs:flex'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='md:gap-8 md:pl-16 flex flex-col gap-4 p-8'>
                        <h1 className='lg:text-7xl md:text-5xl sm:text-3xl relative text-xl font-merriweather font-black italic'>
                            The Teacher Peer Review Platform
                        </h1>
                        <p className='lg:text-lg md:text-base sm:text-sm relative text-gray-500 text-xs'>
                            Glow & Grow is a platform for teachers to review
                            each other's lessons and provide feedback.
                        </p>
                        <Link
                            className='hover:text-white transition-colors duration-300 lg:text-md lg:p-4 md:p-3 md:text-sm xs:block hidden whitespace-nowrap text-xs bg-teal-400 text-teal-900 p-2 rounded-full w-fit font-medium'
                            href='/demo'>
                            Try it out
                        </Link>
                    </div>
                </div>
                <div className='relative w-full'>
                    <Link
                        className='hover:text-white transition-colors duration-300 xs:hidden absolute left-8 bottom-1/2 whitespace-nowrap text-xs bg-teal-400 text-teal-900 p-2 rounded-full w-fit font-medium'
                        href='/demo'>
                        Try it out
                    </Link>
                    <img
                        className='xs:left-0 xs:w-full relative h-full w-2/3 top-6 left-1/3 object-cover object-left-bottom'
                        src='/images/home/glow-grow-landing.svg'
                    />
                </div>
            </div>
        </div>
    );
}
