import React, { useState } from 'react'

function Player() {
    const [isPlay, setIsPlay] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [currentTime, setCurrentTime] = useState({
        hour: 0,
        minute: 0,
        second: 0,
    });
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(1);
    return (
        <div>

        </div>
    )
}

export default Player
