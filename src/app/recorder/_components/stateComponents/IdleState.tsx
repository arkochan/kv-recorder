import React from 'react';
import ButtonTB from '@/components/ButtonTB';

interface IdleStateProps {
    handleRecord: () => void;
}

const IdleState: React.FC<IdleStateProps> = ({ handleRecord }) => (
    <ButtonTB
        svgSrc="/circle-dot.svg"
        label="Record"
        onClick={handleRecord}
    />
);

export default IdleState;