import React from "react";

function VideoCardSkeleton() {
    return (
        <div className="flex flex-col h-full rounded-xl bg-card shadow-md animate-pulse">
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-t-xl overflow-hidden bg-gray-300"></div>

            {/* Content */}
            <div className="flex gap-3 px-3 py-4 flex-1">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0"></div>

                {/* Info */}
                <div className="flex flex-col flex-1 overflow-hidden gap-2">
                    {/* Title lines */}
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>

                    {/* Meta info */}
                    <div className="flex gap-2 mt-2">
                        <div className="h-3 bg-gray-300 rounded w-12"></div>
                        <div className="h-3 bg-gray-300 rounded w-6"></div>
                        <div className="h-3 bg-gray-300 rounded w-12"></div>
                        <div className="h-3 bg-gray-300 rounded w-6"></div>
                        <div className="h-3 bg-gray-300 rounded w-14"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoCardSkeleton;
