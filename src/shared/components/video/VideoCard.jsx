import React from "react";

function VideoCard({
    _id,
    thumbnail,
    title,
    duration,
    creator = {},
    views,
    createdAt,
}) {
    return (
        <div className="flex flex-col h-full rounded-xl bg-card shadow-md hover:shadow-lg transition duration-200 cursor-pointer group">

            {/* Thumbnail */}
            <div className="relative aspect-video rounded-t-xl overflow-hidden">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {duration ? `${Math.floor(duration)} sec` : "0 sec"}
                </span>
            </div>

            {/* Content */}
            <div className="flex gap-3 px-3 py-4 flex-1">
                {/* Avatar */}
                <img
                    src={creator.avatar}
                    alt="creator avatar"
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                />

                {/* Info */}
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Title (max 2 lines) */}
                    <h4
                        className="text-base font-semibold text-foreground overflow-hidden"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                        title={title}
                    >
                        {title}
                    </h4>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="truncate">{creator.username}</span>
                        <span>•</span>
                        <span>{views || 0} views</span>
                        <span>•</span>
                        <span>
                            {createdAt
                                ? new Date(createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })
                                : ""}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
