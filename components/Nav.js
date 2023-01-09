import Link from 'next/link';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { TiStarFullOutline } from 'react-icons/ti';
import { MdOutlineAccountCircle, MdLogout, MdOutlineSmartToy } from 'react-icons/md';
import { Menu } from '@headlessui/react';

export default function Nav() {
    const [user, loading] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className='flex justify-between items-center p-8'>
            <Link href='/'>
                <button className='group flex items-center text-lg font-merriweather font-black italic whitespace-nowrap'>
                    <TiStarFullOutline className='inline-block text-2xl mr-2 group-hover:text-yellow-500 transition-colors duration-200' />
                    <span className='group-hover:text-lime-900 transition-colors duration-200'>
                        Glow & Grow
                    </span>
                </button>
            </Link>
            <ul className='flex items-center gap-10'>
                {!user && (
                    <button
                        onClick={GoogleLogin}
                        className='py-2 px-4 text-sm bg-lime-900 text-white rounded-full ml-8 whitespace-nowrap'>
                        Sign in
                    </button>
                )}
                {user && (
                    <div className=''>
                        <Menu>
                            <Menu.Button className='relative'>
                                <img
                                    className='w-8 rounded-full cursor-pointer'
                                    src={user.photoURL}
                                />
                            </Menu.Button>
                            <Menu.Items className='absolute shadow-md right-0 mr-4 bg-white py-1 z-10 rounded-lg flex flex-col gap-2 items-start justify-start'>
                            <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            className={`w-full p-2 text-left ${
                                                active
                                                    ? 'bg-lime-900 text-white'
                                                    : ''
                                            }`}
                                            href='/demo'>
                                            <MdOutlineSmartToy className='inline-block mr-2 text-2xl' />
                                            Try Demo
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            className={`w-full p-2 text-left ${
                                                active
                                                    ? 'bg-lime-900 text-white'
                                                    : ''
                                            }`}
                                            href='/dashboard'>
                                            <MdOutlineAccountCircle className='inline-block mr-2 text-2xl' />
                                            Manage posts
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`w-full text-left p-2 ${
                                                active
                                                    ? 'bg-lime-900 text-white'
                                                    : ''
                                            }`}
                                            onClick={() => auth.signOut()}>
                                            <MdLogout className='inline-block mr-2 text-2xl' />
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                )}
            </ul>
        </nav>
    );
}
