import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SplashScreen from '../shared/SplashScreen.jsx';
import { getPublishedVideos } from '../services/video/videoAPI.js';
import VideoCard from '../shared/components/video/VideoCard.jsx';
import { NavLink } from 'react-router-dom';
import VideoCardSkeleton from '../shared/Loaders/VideoCardSkeleton.jsx';

function Home() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchVideos = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getPublishedVideos({
                page: 1,
                type: 'video',
            });
            setVideos(res?.data?.videos || []);
        } catch (err) {
            console.error('Error In Fetching Videos ::', err);
            setError('Error fetching videos');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <>
            <SplashScreen />
            <div className="min-h-screen w-full px-4 md:px-10 py-6 bg-background">

                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array(10)
                            .fill()
                            .map((_, i) => (
                                <VideoCardSkeleton key={i} />
                            ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-red-400 text-lg">{error}</div>
                )}

                {/* Videos */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {videos.length === 0 ? (
                            <div className="text-foreground col-span-full text-center text-lg">
                                No videos found.
                            </div>
                        ) : (
                            videos.map((video) => (
                                <NavLink
                                    key={video._id}
                                    to={`/watch/${video?._id}`}
                                    className="rounded-xl bg-card shadow-md hover:shadow-lg transition duration-200 cursor-pointer group"
                                >
                                    <VideoCard {...video} />
                                </NavLink>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;
