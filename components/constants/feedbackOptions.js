import {
    RiLightbulbLine,
    RiQuestionLine,
    RiStarSLine,
    RiPlantLine,
} from 'react-icons/ri';

export const margin = 5;

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
};

export const feedbackStyles = {
    idea: {
        label: 'Idea',
        icon: <RiLightbulbLine className='inline-block mr-2' />,
        styles: 'bg-yellow-600 text-white border-transparent',
        border: 'border-yellow-600',
    },
    question: {
        label: 'Question',
        icon: <RiQuestionLine className='inline-block mr-2' />,
        styles: 'bg-blue-600 text-white border-transparent',
        border: 'border-blue-600',
    },
    glow: {
        label: 'Glow',
        icon: <RiStarSLine className='inline-block mr-2' />,
        styles: 'bg-green-600 text-white border-transparent',
        border: 'border-green-600',
    },
    grow: {
        label: 'Grow',
        icon: <RiPlantLine className='inline-block mr-2' />,
        styles: 'bg-red-600 text-white border-transparent',
        border: 'border-red-600',
    },
};

export const feedbackOptions = [
    {
        id: -1,
        value: '',
        label: 'Select Feedback',
    },
    {
        id: 0,
        value: 'idea',
        label: 'Idea',
        icon: <RiLightbulbLine className='inline-block mr-2' />,
        styles: 'bg-yellow-600 text-white border-transparent',
    },
    {
        id: 1,
        value: 'question',
        label: 'Question',
        icon: <RiQuestionLine className='inline-block mr-2' />,
        styles: 'bg-blue-600 text-white border-transparent',
    },
    {
        id: 2,
        value: 'glow',
        label: 'Glow',
        icon: <RiStarSLine className='inline-block mr-2' />,
        styles: 'bg-green-600 text-white border-transparent',
    },
    {
        id: 3,
        value: 'grow',
        label: 'Grow',
        icon: <RiPlantLine className='inline-block mr-2' />,
        styles: 'bg-red-600 text-white border-transparent',
    },
];
