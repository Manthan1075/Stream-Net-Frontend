import React from 'react';
import clsx from 'clsx';

function Spinner({ size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-10 h-10 border-4',
        xl: 'w-14 h-14 border-4',
    };

    return (
        <div
            className={clsx(
                'animate-spin rounded-full border-t-transparent border-white',
                sizeClasses[size] || sizeClasses['md'],
                className
            )}
        />
    );
}

export default Spinner;
