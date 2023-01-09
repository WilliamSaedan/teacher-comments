import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Support() {
    const [post, setPost] = useState({
        message: '',
    });

    const sendFeedback = async (e) => {
        e.preventDefault();

        await emailjs
            .send(
                process.env.NEXT_PUBLIC_SERVICE_ID,
                process.env.NEXT_PUBLIC_TEMPLATE_ID,
                post,
                process.env.NEXT_PUBLIC_PUBLIC_KEY
            )
            .then((result) => {
                setPost({ message: '' });
            });
    };

    return (
        <div className='md:pt-32 sm:items-start sm:pt-16 justify-center sm:flex-row flex py-8 items-center text-gray-700 flex-col gap-4'>
            <div className='md:px-8 max-w-md flex flex-col gap-4 p-4'>
                <h1 className='md:text-2xl font-merriweather font-black italic text-xl'>
                    Feedback
                </h1>
                <p className='md:text-base text-sm'>
                    What do you think about this prototype? Feel free to leave
                    any comments.
                </p>
            </div>
            <form
                onSubmit={sendFeedback}
                className='max-w-md flex flex-col w-full gap-4'>
                <textarea
                    name='message'
                    className='lg:h-32 md:mx-8 xs:text-base mx-4 p-4 h-24 text-sm bg-slate-300 rounded-lg'
                    placeholder='Your feedback'
                    value={post.message}
                    onChange={(e) => {
                        setPost({ message: e.target.value });
                    }}></textarea>
                <button
                    className='md:mx-8 mx-4 bg-black text-white p-2 rounded-full'
                    type='submit'>
                    Send Message
                </button>
            </form>
        </div>
    );
}
