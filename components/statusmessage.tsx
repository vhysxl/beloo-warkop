import React from "react";

interface statusMessageProps {
    children: React.ReactNode;
    type?: 'success' | 'error' | 'warning' | 'info';
    className?: string;
}

export default function StatusMessage({
    children,
    type = 'info',
    className = ''
}: statusMessageProps) {
    const baseStyles = 'p-4 rounded-md mb-4 text-center'

    const typeStyles = {
        success: 'bg-green-100 text-green-700 border border-green-400',
        error: 'bg-red-100 text-red-700 border border-red-400',
        warning: 'bg-yellow-100 text-yellow-700 border border-yellow-400',
        info: 'bg-blue-100 text-blue-700 border border-blue-400'
    }

    return (
        <div className={`${baseStyles} ${typeStyles[type]} ${className}`}>
            {children}
        </div>
    )


}
