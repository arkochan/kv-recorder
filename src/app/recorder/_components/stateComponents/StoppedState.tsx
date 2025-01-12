import React from 'react';
import ButtonTB from '@/components/ButtonTB';

interface StoppedStateProps {
    handleRecord: () => void;
}

const StoppedState: React.FC<StoppedStateProps> = ({ handleRecord }) => (
    <ButtonTB
        svgSrc="/circle-dot.svg"
        label="Record"
        onClick={handleRecord}
    />
);

export default StoppedState;