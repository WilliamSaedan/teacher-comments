const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
};

const formatFeedback = (feedback) => {
    if (feedback == "idea") return '💡 Idea';
    if (feedback == "question") return '❓ Question';
    if (feedback == "glow") return '🌟 Glow';
    if (feedback == "grow") return '🌱 Grow';
    return 'Feedback';
}

export default function Message({children, onClick, feedback, time, avatar, username, description, className}) {
    return (
        <div onClick={onClick} className={`rounded-lg border-2 m-2 cursor-pointer p-4 ${className}`}>
            <div className="flex items-center gap-4 justify-between mb-2 border-b-2">
                <div className="flex items-center gap-4 my-2">
                    <img src={avatar} className="w-10 rounded-full"/>
                    <h2>{username}</h2>
                </div>
                <div className="px-4 py-2">{formatTime(time)}</div>
            </div>
            <div className="flex items-center gap-2">
                <div className="py-2">{formatFeedback(feedback)}</div>
            </div>
            <div className="py-4">
                <p>{description}</p>
            </div>
            {children}
        </div>
    );
}