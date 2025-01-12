import React from 'react';
import ButtonTB from '@/components/ButtonTB';

interface PlayingStateProps {
    handlePause: () => void;
    handleStop: () => void;
}

const PlayingState: React.FC<PlayingStateProps> = ({ handlePause, handleStop }) => (
    <>
        <ButtonTB
            svgSrc="/pause-circle.svg"
            label="Pause"
            onClick={handlePause}
        />
        <ButtonTB
            svgSrc="/stop-circle.svg"
            label="Stop"
            onClick={handleStop}
        />
    </>
);

export default PlayingState;