import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { Input } from '../../../components/ui/input'

function Player({ videoURL }) {
    const [isPlay, setIsPlay] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [currentTime, setCurrentTime] = useState({
        hour: 0,
        minute: 0,
        second: 5,
    });
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const playerRef = useRef(null);


    useEffect(() => {
        if (playerRef.current) {
            console.log("Video Player ::", {
                duration: playerRef.current.duration,
                currentTime: playerRef.current.currentTime,
                volume: playerRef.current.volume,
                muted: playerRef.current.muted,
                playbackRate: playerRef.current.playbackRate,
                videoWidth: playerRef.current.videoWidth,
                videoHeight: playerRef.current.videoHeight,
                readyState: playerRef.current.readyState,
                paused: playerRef.current.paused,
                ended: playerRef.current.ended,
                src: playerRef.current.currentSrc,
            });
        }
        if (playerRef.current) {
            playerRef.current.volume = volume;
            playerRef.current.playbackRate = playbackSpeed;
            playerRef.current.muted = isMute;
            playerRef.current.addEventListener('timeupdate', () => {
                const currentTime = playerRef.current.currentTime;
                const hour = Math.floor(currentTime / 3600);
                const minute = Math.floor((currentTime % 3600) / 60);
                const second = Math.floor(currentTime % 60);
                setCurrentTime({ hour, minute, second });
            });
        }
    }, [volume, playbackSpeed, isMute, isPlay]);

    const toggleVideo = () => {
        if (playerRef.current) {
            if (isPlay) {
                playerRef.current.pause();
            } else {
                playerRef.current.play();
            }
            setIsPlay(!isPlay);
        }
    }

    const toggleVolume = (val) => {
        if (playerRef.current) {

            if (val === 0) {
                playerRef.current.muted = true;
                setIsMute(true);
            } else {
                setVolume(val);
            }

        }
    }

    const toggleMute = () => {
        if (playerRef.current) {
            playerRef.current.muted = !isMute;
            setIsMute(!isMute);
        }
    }

    return (
        <div className="absolute top-0 left-0 w-screen h-[60vh] bg-black flex items-center justify-center">
            <video
                src={videoURL}
                ref={playerRef}
                playsInline
                className="w-full h-full object-contain bg-black"
            >
                Your browser does not support the video.
            </video>
            <div className='absolute bottom-2 left-0 text-white'>
                <Button onClick={toggleVideo} variant="icon" className='bg-white/10 hover:bg-white/20 text-white'>
                    {
                        isPlay ? <Pause /> : <Play />
                    }
                </Button>
                <div>
                    <Button onClick={toggleMute}>
                        {
                            isMute ? <VolumeX /> : <Volume2 />
                        }
                    </Button>
                    <Input type='range' min={0}
                        onChange={(e) => toggleVolume(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Player