import React from 'react';

const Spinner = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        style={{ animation: 'spin 1s linear infinite' }}
    >
        <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="1, 60"
            strokeLinecap="round"
            style={{ strokeDashoffset: '0', animation: 'dash 1.5s ease-in-out infinite' }}
        />
        <style jsx>{`
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
            @keyframes dash {
                0% {
                    strokeDashoffset: 1;
                }
                50% {
                    strokeDashoffset: 30;
                    transform: rotate(135deg);
                }
                100% {
                    strokeDashoffset: 60;
                    transform: rotate(450deg);
                }
            }
        `}</style>
    </svg>
);

export default Spinner;