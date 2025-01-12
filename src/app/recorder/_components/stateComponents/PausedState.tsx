import React from 'react';
import ButtonTB from '@/components/ButtonTB';

interface PausedStateProps {
    handleResume: () => void;
    handleStop: () => void;
}

const PausedState: React.FC<PausedStateProps> = ({ handleResume, handleStop }) => (
    <>
        <ButtonTB
            svgSrc="/play-circle.svg"
            label="Resume"
            onClick={handleResume}
        />
        <ButtonTB
            svgSrc="/stop-circle.svg"
            label="Stop"
            onClick={handleStop}
        />
    </>
);

export default PausedState;