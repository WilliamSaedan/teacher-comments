import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    collection,
    doc,
    deleteDoc,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import Message from '../components/message';
import { BsTrash2Fill } from 'react-icons/bs';
import { IoMdTrash } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import Link from 'next/link';

export default function Dashboard() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    //See if user is logged
    const getData = async () => {
        if (loading) return;
        if (!user) return route.push('/');

        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where('user', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        return unsubscribe;
    };

    //Delete Post
    const deletePost = async (id) => {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef);
    };

    //Get users data
    useEffect(() => {
        getData();
    }, [user, loading]);

    return (
        <div className='lg:flex-row flex flex-col m-4 border-2 rounded-lg'>
            <div className='flex flex-col p-4'>
                <div>
                    <h1 className='xl:text-3xl md:text-2xl text-lg font-merriweather font-black italic'>
                        The Film Experience Lecture 1
                    </h1>
                    <h2 className='xl:text-lg md:text-base text-sm'>
                        David Thorburn
                    </h2>
                </div>
            </div>
            <div class='lg:mt-4 relative h-[700px] w-full mr-4 overflow-y-scroll'>
                <div className='absolute px-4'>
                    {posts.map((post) => (
                        <div className='pb-4'>
                            <Message
                                className='cursor-auto'
                                {...post}
                                key={post.id}>
                                <div className='flex justify-end gap-4'>
                                    <button
                                        onClick={() => deletePost(post.id)}
                                        className='text-red-600 flex item-center border-2 rounded-lg m-2 pr-4 hover:border-red-600 hover:bg-red-600 hover:text-white pl-2 justify-center gap-2 py-2 text-sm'>
                                        <IoMdTrash className='text-2xl' />
                                        Delete
                                    </button>
                                </div>
                            </Message>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
