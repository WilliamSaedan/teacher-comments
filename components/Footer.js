import { RiGithubFill } from 'react-icons/ri';

export default function Footer() {
    return (
        <footer className='text-center text-base pb-4 pt-28'>
            <p className='flex justify-center items-center'>
                Check the project out on GitHub <a className='hover:text-lime-900' href='https://github.com/WilliamSaedan/teacher-comments'><RiGithubFill className='inline-block ml-5 text-2xl'/></a>
            </p>
        </footer>
    );
}
