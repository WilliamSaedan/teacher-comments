import {
    formatTime,
    feedbackStyles,
    margin,
} from './constants/feedbackOptions';
import { twMerge } from 'tailwind-merge';

export default function Message({
    children,
    onClick,
    videoTime,
    feedback,
    time,
    avatar,
    username,
    description,
    className,
}) {
    return (
        <>
            <div
                onClick={onClick}
                className={twMerge(
                    `rounded-lg border-2 cursor-pointer transition-all duration-500 ${
                        videoTime - margin < time && time < videoTime + margin
                            ? feedbackStyles[feedback].border
                            : ''
                    } ${className}`
                )}>
                <div
                    className={`flex justify-between w-full transition-all duration-500 ${
                        videoTime - margin < time && time < videoTime + margin
                            ? feedbackStyles[feedback].styles
                            : ''
                    }`}>
                    <div className='relative min-w-[170px]'>
                        <div className='flex items-center cursor-pointer px-3 py-2 text-lg'>
                            {feedbackStyles[feedback].icon}
                            {feedbackStyles[feedback].label}
                        </div>
                    </div>
                    <div className='p-2 px-4'>{formatTime(time)}</div>
                </div>
                <div className='flex items-center gap-4 m-2'>
                    <img
                        src={avatar}
                        className='w-8 rounded-full'
                    />
                    <h2>{username}</h2>
                </div>
                <p className='m-2 ml-14'>{description}</p>
                {children}
            </div>
        </>
    );
}
