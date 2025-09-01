import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

function Player({
    type = "video",
    video = ""
}) {
    const videoRef = useRef()
    const [play, setPlay] = useState(true);
    const [mute, setMute] = useState(false);
    const [animation, setAnimation] = useState({
        isShown: false,
        icon: null,
    })

    useEffect(() => {
        if (!videoRef) {
            return <h3>Error Occur While Video Play</h3>
        }
    })

    function togglePlay() {
        setPlay((prev) => {
            if (prev) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            showAnimation(prev ? "pause" : "play");
            return !prev;
        });
    }

    function toggleMute() {
        setMute((prev) => {
            showAnimation(prev ? "unmute" : "mute");
            videoRef.current.muted = !prev;
            return !prev;
        });
    }

    function showAnimation(type) {
        let icon;
        switch (type) {
            case "play":
                icon = <Play />;
                break;
            case "pause":
                icon = <Pause />;
                break;
            case "mute":
                icon = <Volume2 />;
                break;
            case "unmute":
                icon = <VolumeX />;
                break;
            default:
                icon = null;
                break;
        }
        setAnimation((prev) => ({
            isShown: true,
            icon: icon,
        }));
        setTimeout(() => {
            setAnimation((prev) => ({
                isShown: false,
                icon: null,
            }));
        }, 500);
    }

    return (
        <div
            className='h-full w-full bg-slate-950 relative'
        >
            <div className='h-full w-full overflow-hidden 
                flex items-center justify-center
            '>
                <video src={video?.videoFile} ref={videoRef}
                    className='h-full object-contain w-full'
                />
            </div>

            <div></div>
            <div className='absolute bottom-1 w-full left-0 text-white'>
                <div className='w-full px-2'>
                    <input
                        type="range"
                        min={0}
                        max={video?.duration}
                        className='w-full h-1 cursor-pointer slider'
                    />
                </div>
                <div>
                    <button
                        onClick={togglePlay}
                    >
                        {
                            play ? <Play /> : <Pause />
                        }
                    </button>
                    <button>
                        {
                            mute ? <Volume2 /> : <VolumeX />}
                    </button>
                </div>
            </div>

            <div className=' animate-ping absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                {
                    animation.isShown && animation.icon ?
                        animation.icon
                        : ""

                }
            </div>

        </div>
    )
}

export default Player