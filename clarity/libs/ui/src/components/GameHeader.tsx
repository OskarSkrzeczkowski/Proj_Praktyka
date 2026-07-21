import { BackButton } from "./BackButton";
interface GameHeaderProps {
    formattedTime: string;
    onExit: () => void;
}

export const GameHeader = ({ formattedTime, onExit }: GameHeaderProps) => (
    <div className="absolute top-0 left-0 right-0 w-full border-b border-white/20">
        <div className="mx-auto flex justify-between h-16 items-center py-4 px-8">
            <BackButton onClick={onExit} />
            <div className="text-white">Pozostało: <span className="font-bold">{formattedTime}</span></div>
        </div>
    </div>
);