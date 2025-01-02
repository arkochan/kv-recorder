import React from 'react';

interface ButtonIconProps {
    SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    onClick: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ SvgComponent, label, onClick }) => {
    return (
        <button onClick={onClick} className="flex items-center p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            <SvgComponent className="w-6 h-6 mr-2" />
            <span className="text-lg">{label}</span>
        </button>
    );
};

export default ButtonIcon;