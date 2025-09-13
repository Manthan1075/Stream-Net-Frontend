import {
    Pause,
    Play,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";
import "../../../css/Player.css";

function Player({ video = null }) {
    const videoRef = useRef();
    const containerRef = useRef();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                setDuration(videoRef.current.duration);
                videoRef.current.volume = volume;
            };
        }
    }, [video]);

    useEffect(() => {
        let frameId;
        function update() {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                frameId = requestAnimationFrame(update);
            }
        }
        if (isPlaying) frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, [isPlaying]);

    // Auto-hide controls
    useEffect(() => {
        let timeout;
        if (isPlaying && showControls) {
            timeout = setTimeout(() => setShowControls(false), 2500);
        }
        return () => clearTimeout(timeout);
    }, [isPlaying, showControls]);

    useEffect(() => {
        const handleKey = (e) => {
            if (!videoRef.current) return;
            switch (e.key.toLowerCase()) {
                case " ":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "arrowleft":
                    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
                    break;
                case "arrowright":
                    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration);
                    break;
                case "m":
                    toggleMute();
                    break;
                case "f":
                    toggleFullscreen();
                    break;
                default:
                    break;
            }
            setShowControls(true);
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [duration]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) videoRef.current.pause();
        else videoRef.current.play();
        setIsPlaying(!isPlaying);
        setShowControls(true);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolume = (e) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        videoRef.current.volume = vol;
        setIsMuted(vol === 0);
    };

    const handleSeek = (e) => {
        const time = e.target.value;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const changeSpeed = (rate) => {
        videoRef.current.playbackRate = rate;
        setPlaybackRate(rate);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!isFullscreen) containerRef.current.requestFullscreen();
        else document.exitFullscreen();
        setIsFullscreen(!isFullscreen);
    };

    const formatTime = (t) => {
        if (!t) return "0:00";
        const minutes = Math.floor(t / 60);
        const seconds = Math.floor(t % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full max-h-[65vh] bg-black overflow-hidden group"
            onMouseMove={() => setShowControls(true)}
        >
            {/* Video */}
            <video
                ref={videoRef}
                src={video?.videoFile}
                onClick={togglePlay}
                onDoubleClick={toggleFullscreen}
                className={`bg-black transition-all duration-300
    ${isFullscreen
                        ? "w-screen h-screen object-contain"
                        : "w-full h-auto max-h-[70vh] object-contain mx-auto"}`
                }
            />


            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="bg-white/20 p-6 rounded-full hover:bg-white/30 transition transform hover:scale-110"
                    >
                        <Play size={40} className="text-white" />
                    </button>
                </div>
            )}

            <div
                className={`absolute bottom-0 w-full px-4 py-3 transition-all duration-500 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
                    } bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm`}
            >
                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    id="progress-bar"
                    className="w-full h-2 cursor-pointer appearance-none rounded-lg overflow-hidden accent-red-600"
                    style={{
                        background: `linear-gradient(to right, #ef4444 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%)`,
                    }}
                />

                <div className="flex items-center justify-between mt-2 text-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            className="hover:text-red-500 transition text-white transform hover:scale-110"
                        >
                            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                        </button>

                        <div className="flex items-center gap-2 group/vol relative">
                            <button
                                onClick={toggleMute}
                                className="hover:text-red-500 transition text-white"
                            >
                                {isMuted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.05}
                                value={volume}
                                onChange={handleVolume}
                                className="w-24 accent-red-600 cursor-pointer hidden group-hover/vol:block"
                            />
                        </div>

                        <span className="text-xs text-gray-300">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-white">
                        <Select
                            value={playbackRate}
                            onValueChange={changeSpeed}
                            defaultValue={playbackRate}
                        >
                            <SelectTrigger className="bg-white/10 border border-white/30 cursor-pointer rounded px-2 py-1 text-xs w-20">
                                <SelectValue placeholder="1x" className="text-white" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup >
                                    <SelectLabel>Playback Speed</SelectLabel>
                                    <SelectItem value="0.25">0.25x</SelectItem>
                                    <SelectItem value="0.5">0.5x</SelectItem>
                                    <SelectItem value="1">1x</SelectItem>
                                    <SelectItem value="1.5">1.5x</SelectItem>
                                    <SelectItem value="2">2x</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <button
                            onClick={toggleFullscreen}
                            className="hover:text-red-500 transition text-white transform hover:scale-110"
                        >
                            {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;
