import React from 'react';
import ButtonTB from '@/components/ButtonTB';

interface RecordingStateProps {
    handlePause: () => void;
    handleStop: () => void;
}

const RecordingState: React.FC<RecordingStateProps> = ({ handlePause, handleStop }) => (
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

export default RecordingState;