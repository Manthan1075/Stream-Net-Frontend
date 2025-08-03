import React from 'react'
import ThemeSelector from '../shared/components/ThemeSwitcher.jsx'
import { useSelector } from 'react-redux'
import SplashScreen from '../shared/SplashScreen.jsx'
import { getPublishedVideos } from '../services/video/videoAPI.js'

function Home() {
    const user = useSelector(state => state.user)
    const [videos, setVideos] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await getPublishedVideos();
                setVideos(res?.data?.videos || []);
            } catch (err) {
                setError('Error fetching videos');
            } finally {
                setLoading(false)
            }
        }
        fetchVideos()
    }, [])

    return (
        <>
            <SplashScreen />
            <div className="min-h-screen mt-8 w-full px-4 md:px-10 py-6 bg-background">
                {loading && <div className="text-foreground text-lg">Loading videos...</div>}
                {error && <div className="text-red-400 text-lg">{error}</div>}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {videos.length === 0 ? (
                            <div className="text-foreground col-span-full text-center text-lg">No videos found.</div>
                        ) : (
                            videos.map((video) => (
                                <div
                                    key={video._id}
                                    className="rounded-xl bg-card shadow-md hover:shadow-lg transition duration-200 cursor-pointer group"
                                >
                                    
                                    <div className="relative aspect-video rounded-t-xl overflow-hidden">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                                            {video.duration ? `${Math.floor(video.duration)} sec` : "0 sec"}
                                        </span>
                                    </div>

                                    
                                    <div className="flex gap-3 px-3 py-4">
                                        
                                        <img
                                            src={video.creator.avatar}
                                            alt="creator avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />

                                        <div className="flex flex-col overflow-hidden">
                                            <h4 className="text-base font-semibold text-foreground truncate">{video.title}</h4>
                                            <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                                <span>{video.creator.username}</span>
                                                <span>•</span>
                                                <span>{video.views || 0} views</span>
                                                <span>•</span>
                                                <span>
                                                    {video.createdAt
                                                        ? new Date(video.createdAt).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        })
                                                        : "Recently"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Home
