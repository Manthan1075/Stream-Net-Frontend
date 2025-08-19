import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '../../../components/ui/button';
import { Pause, Play, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

// Custom hook to encapsulate all video player logic (no changes here)
const useVideoPlayer = (videoRef, videoDetails) => {
    const [isPlay, setIsPlay] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [error, setError] = useState('');
    const [showAnimation, setShowAnimation] = useState(false);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleError = () => setError("Error: Unable to play this video.");
        const handleEnded = () => setIsPlay(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('error', handleError);
        video.addEventListener('ended', handleEnded);

        if (videoDetails?.duration) {
            setDuration(videoDetails.duration);
        }

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('error', handleError);
            video.removeEventListener('ended', handleEnded);
        };
    }, [videoRef, videoDetails]);

    const showIconAnimation = useCallback((icon) => {
        setShowAnimation(icon);
        setTimeout(() => setShowAnimation(false), 1000);
    }, []);

    const toggleVideo = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            showIconAnimation('play');
        } else {
            video.pause();
            showIconAnimation('pause');
        }
        setIsPlay(!video.paused);
    }, [videoRef, showIconAnimation]);

    const toggleMute = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMute(video.muted);
        setVolume(video.muted ? 0 : 1);
        showIconAnimation(video.muted ? 'mute' : 'unmute');
    }, [videoRef, showIconAnimation]);

    const toggleVolume = useCallback((val) => {
        const video = videoRef.current;
        if (!video) return;

        const normalizedVolume = Math.max(0, Math.min(1, val / 100));
        video.volume = normalizedVolume;
        setVolume(normalizedVolume);
        setIsMute(normalizedVolume === 0);
    }, [videoRef]);

    const handleSeek = useCallback((val) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = val;
        setCurrentTime(val);
    }, [videoRef]);

    const skip = useCallback((seconds) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.min(Math.max(0, video.currentTime + seconds), duration);
    }, [videoRef, duration]);

    const toggleFullScreen = useCallback(() => {
        const videoContainer = videoRef.current?.parentElement;
        if (!videoContainer) return;

        if (!document.fullscreenElement) {
            videoContainer.requestFullscreen().then(() => setIsFullScreen(true)).catch(console.error);
        } else {
            document.exitFullscreen().then(() => setIsFullScreen(false)).catch(console.error);
        }
    }, [videoRef]);

    const handlePlaybackSpeedChange = useCallback((val) => {
        const video = videoRef.current;
        if (!video) return;

        const speed = parseFloat(val);
        video.playbackRate = speed;
        setPlaybackSpeed(speed);
    }, [videoRef]);

    return {
        isPlay,
        isMute,
        currentTime,
        duration,
        playbackSpeed,
        isFullScreen,
        volume,
        error,
        showAnimation,
        showControls,
        setShowControls,
        toggleVideo,
        toggleMute,
        toggleVolume,
        handleSeek,
        skip,
        toggleFullScreen,
        handlePlaybackSpeedChange,
    };
};

function Player({ videoDetails }) {
    const playerRef = useRef(null);
    const {
        isPlay,
        isMute,
        currentTime,
        duration,
        playbackSpeed,
        isFullScreen,
        volume,
        error,
        showAnimation,
        showControls,
        setShowControls,
        toggleVideo,
        toggleMute,
        toggleVolume,
        handleSeek,
        skip,
        toggleFullScreen,
        handlePlaybackSpeedChange,
    } = useVideoPlayer(playerRef, videoDetails);

    const formatTime = (time) => {
        if (isNaN(time) || time < 0) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div
            className="relative w-full bg-black rounded-lg shadow-lg"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-4 text-center">
                    <span className="text-2xl font-semibold text-red-500 mb-2">{error}</span>
                    <span className="text-base text-gray-400">Please try refreshing the page or check your connection.</span>
                </div>
            ) : (
                <>
                    <video
                        src={videoDetails?.videoFile}
                        ref={playerRef}
                        playsInline
                        className="object-cover rounded-lg"
                        onClick={toggleVideo}
                    >
                    </video>

                    {showAnimation && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-30">
                            <span className="flex items-center justify-center rounded-full bg-black/70 shadow-lg transition-all duration-300 opacity-100 scale-100" style={{ width: "80px", height: "80px" }}>
                                {showAnimation === 'play' && <Play className="text-white" size={44} />}
                                {showAnimation === 'pause' && <Pause className="text-white" size={44} />}
                                {showAnimation === 'mute' && <VolumeX className="text-white" size={44} />}
                                {showAnimation === 'unmute' && <Volume2 className="text-white" size={44} />}
                            </span>
                        </div>
                    )}

                    {showControls && (
                        <div className="absolute bottom-0 left-0 w-full text-white p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-300">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm">{formatTime(currentTime)}</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    step="0.1"
                                    value={currentTime}
                                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #3b82f6 ${duration ? (currentTime / duration) * 100 : 0}%, #6b7280 ${duration ? (currentTime / duration) * 100 : 0}%)`
                                    }}
                                />
                                <span className="text-sm">{formatTime(duration)}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className='flex items-center gap-2'>
                                    <Button onClick={() => skip(-10)} variant="icon" className='bg-white/10 hover:bg-white/20 p-2 rounded-full'>
                                        <SkipBack size={20} />
                                    </Button>
                                    <Button onClick={toggleVideo} variant="icon" className='bg-white/10 hover:bg-white/20 p-2 rounded-full'>
                                        {isPlay ? <Pause size={20} /> : <Play size={20} />}
                                    </Button>
                                    <Button onClick={() => skip(10)} variant="icon" className='bg-white/10 hover:bg-white/20 p-2 rounded-full'>
                                        <SkipForward size={20} />
                                    </Button>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button onClick={toggleMute} variant="icon" className='bg-white/10 hover:bg-white/20 p-2 rounded-full'>
                                        {isMute ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                    </Button>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={volume * 100}
                                        onChange={(e) => toggleVolume(parseInt(e.target.value))}
                                        className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #3b82f6 ${volume * 100}%, #6b7280 ${volume * 100}%)`
                                        }}
                                    />
                                    <Select value={String(playbackSpeed)} onValueChange={handlePlaybackSpeedChange}>
                                        <SelectTrigger className="w-20 bg-white/10 border-none text-white">
                                            <SelectValue placeholder="Speed" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0.25">0.25x</SelectItem>
                                            <SelectItem value="0.5">0.5x</SelectItem>
                                            <SelectItem value="1">1x</SelectItem>
                                            <SelectItem value="1.5">1.5x</SelectItem>
                                            <SelectItem value="2">2x</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={toggleFullScreen} variant="icon" className='bg-white/10 hover:bg-white/20 p-2 rounded-full'>
                                        {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Player;