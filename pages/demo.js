import { Listbox } from '@headlessui/react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ImLock, ImUnlocked } from 'react-icons/im';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import {
    feedbackOptions,
    formatTime,
} from '../components/constants/feedbackOptions';
import Message from '../components/message';
import Support from '../components/Support';
import { auth, db } from '../utils/firebase';

const colorFeedback = (feedback) => {
    if (feedback == 'idea') return 'bg-yellow-600 text-white';
    if (feedback == 'question') return 'bg-blue-600 text-white';
    if (feedback == 'glow') return 'bg-green-600 text-white';
    if (feedback == 'grow') return 'bg-red-600 text-white';
    return 'bg-white';
};

export default function Demo() {
    const [post, setPost] = useState({
        feedback: '',
        time: 0,
        description: '',
    });
    const [selectedFeedback, setSelectedFeedback] = useState(
        feedbackOptions[0]
    );
    useEffect(() => {
        setPost((post) => ({ ...post, feedback: selectedFeedback.value }));
    }, [selectedFeedback]);

    const [timer, setTimer] = useState(0);
    const [lockTime, setLockTime] = useState(false);
    const onLockChange = useCallback(() =>
        setLockTime((lockTime) => !lockTime)
    );

    const onDescriptionChange = useCallback((value) => {
        setPost((post) => ({ ...post, description: value.target.value }));
    }, []);

    const vid = useRef();
    const descriptionRef = useRef();
    const feedbackRef = useRef();
    const [triedSubmit, setTriedSubmit] = useState(false);
    const [errorState, setErrorState] = useState({
        description: false,
        feedback: false,
    });

    const [allPosts, setAllPosts] = useState([]);
    const [user, loading] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    };
    const route = useRouter();
    const routeData = route.query;

    const submitPost = async (e) => {
        e.preventDefault();

        let errorFlag = false;
        setTriedSubmit(true);
        setErrorState({
            description: !post.description,
            feedback: !post.feedback,
        });

        if (!post.feedback) {
            feedbackRef.current.focus();
            errorFlag = true;
        }
        if (!post.description) {
            descriptionRef.current.focus();
            errorFlag = true;
        }
        if (errorFlag) return;

        if (post?.hasOwnProperty('id')) {
            const docRef = doc(db, 'posts', post.id);
            const updatedPost = { ...post, timestamp: serverTimestamp() };
            await updateDoc(docRef, updatedPost);
            return route.push('/demo');
        } else {
            //Make a new post
            const collectionRef = collection(db, 'posts');
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });
            setPost({ feedback: '', time: 0, description: '' });
            setSelectedFeedback(feedbackOptions[0]);
            setTriedSubmit(false);
            return route.push('/demo');
        }
    };

    const handleTimeUpdate = () => {
        setTimer(vid.current.currentTime);
    };

    const getPosts = async () => {
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, orderBy('time', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllPosts(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        return unsubscribe;
    };

    useEffect(() => {
        vid.current.addEventListener('timeupdate', () => {
            handleTimeUpdate();
        });
        getPosts();
    }, []);

    useEffect(() => {
        if (lockTime) return;
        setPost({ ...post, time: timer });
    }, [timer]);

    useEffect(() => {
        if (!triedSubmit) return;
        setErrorState({
            description: !post.description,
            feedback: !post.feedback,
        });
    }, [post]);

    return (
        <div>
            <Head>
                <title>Glow & Grow | Demo</title>
                <link
                    rel='icon'
                    href='/favicon.ico'
                />
            </Head>

            <div className='lg:grid-cols-10 lg:grid-rows-1 grid grid-rows-2'>
                <div className='xl:pl-8 lg:px-4 lg:col-start-1 lg:col-span-6 w-full h-full'>
                    <div className='lg:px-0 p-4'>
                        <h1 className='xl:text-3xl md:text-2xl text-lg font-merriweather font-black italic'>
                            The Film Experience Lecture 1
                        </h1>
                        <h2 className='xl:text-lg md:text-base text-sm'>
                            David Thorburn
                        </h2>
                    </div>
                    <video
                        ref={vid}
                        id='video1'
                        controls
                        className='w-full'>
                        <source
                            src='/video/MIT21L_011F13_L13_300k.mp4'
                            type='video/mp4'
                        />
                    </video>
                    <form onSubmit={submitPost}>
                        <div className='lg:px-0 p-4'>
                            <div className='flex w-full justify-between'>
                                <div className='relative min-w-[170px]'>
                                    <Listbox
                                        value={selectedFeedback}
                                        onChange={setSelectedFeedback}>
                                        <Listbox.Button
                                            ref={feedbackRef}
                                            className={twMerge(
                                                `py-2 px-4 rounded-full w-full text-left border-2 transition-all duration-200 ${
                                                    errorState.feedback
                                                        ? 'text-red-600 border-red-600'
                                                        : 'border-inherit'
                                                } ${
                                                    selectedFeedback.styles
                                                        ? selectedFeedback.styles
                                                        : 'bg-white'
                                                } `
                                            )}>
                                            {selectedFeedback.icon}
                                            {selectedFeedback.label}
                                        </Listbox.Button>
                                        <Listbox.Options className='absolute rounded-lg w-full bg-white border-2 mt-2 ml-4'>
                                            {feedbackOptions.map((option) => (
                                                <Listbox.Option
                                                    key={option.id}
                                                    value={option}
                                                    as={Fragment}>
                                                    {({ active, selected }) => (
                                                        <li
                                                            key={option.id}
                                                            className={`flex items-center cursor-pointer px-3 py-2 transition-colors duration-200 ${
                                                                active
                                                                    ? option.styles
                                                                    : ''
                                                            }`}>
                                                            {option.icon}
                                                            {option.label}
                                                        </li>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Listbox>
                                </div>
                                <div
                                    className='flex items-center p-2 px-4 cursor-pointer'
                                    onClick={onLockChange}>
                                    {formatTime(post.time)}
                                    {lockTime ? (
                                        <ImLock className='ml-2' />
                                    ) : (
                                        <ImUnlocked className='ml-2' />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='lg:px-0 p-4 pt-0 flex flex-col gap-4'>
                            <textarea
                                ref={descriptionRef}
                                value={post.description}
                                onChange={onDescriptionChange}
                                placeholder='Write a comment'
                                className={twMerge(
                                    `w-full p-2 rounded-lg border-2 min-h-[150px] focus:outline-none transition-colors duration-300 ${
                                        errorState.description
                                            ? 'placeholder:text-red-600 border-red-600'
                                            : 'border-inherit'
                                    }`
                                )}
                            />
                            {user ? (
                                <button
                                    type='submit'
                                    className={twMerge(
                                        `self-end rounded-full py-2 px-4 border-2 
                                    ${
                                        selectedFeedback.styles
                                            ? selectedFeedback.styles
                                            : 'bg-white'
                                    }
                                    ${
                                        errorState.feedback ||
                                        errorState.description
                                            ? 'text-red-600 border-red-600 bg-white'
                                            : ''
                                    } `
                                    )}>
                                    Send
                                </button>
                            ) : (
                                <button
                                    type='button'
                                    onClick={GoogleLogin}
                                    className='self-end py-2 px-4 text-sm bg-lime-900 text-white rounded-full ml-8 whitespace-nowrap'>
                                    Sign in to comment
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className='xl:mt-[96px] lg:col-start-7 lg:col-span-4 lg:mt-[88px] px-4 pb-4'>
                    <div className='relative h-full overflow-y-scroll'>
                        <div className='absolute px-4'>
                            {allPosts.map((mPost) => (
                                <div className='pb-4'>
                                    <Message
                                        videoTime={vid.current.currentTime}
                                        onClick={(e) => {
                                            vid.current.currentTime =
                                                mPost.time;
                                        }}
                                        key={mPost.id}
                                        {...mPost}></Message>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Support />
        </div>
    );
}
