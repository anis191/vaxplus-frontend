// import React from 'react';

const ProgressLine = ({totalSteps, currentStep}) => {
    const width = ((currentStep-1) / (totalSteps -1)) * 100
    return (
        <>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 transition-all"
        style={{ width: `${width}%`}}></div>
        </>
    );
};

export default ProgressLine;