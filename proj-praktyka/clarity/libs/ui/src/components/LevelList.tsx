interface LevelListProps{
  activeElement: string;
  inActiveElement: string
  onLevelChange: (level: string) => void;
  currentLevel: string;
}

export const LevelList = ({activeElement, inActiveElement, onLevelChange, currentLevel}:LevelListProps) => {
  const Level = ["1-Back (podstawowy)", "2-Back (średni)", "3-Back (zaawansowany)"];

  return(
    <ul className="flex justify-center gap-8">
      {Level.map((ListElement) => (
        <button
          key={ListElement}
            className={`p-3 rounded-lg cursor-pointer text-white font-medium flex flex-wrap justify-center items-center leading-none text-center w-40 h-20 transition duration-300 ease-in-out
                  ${currentLevel === ListElement ? activeElement : inActiveElement}`}
            onClick={() => onLevelChange(ListElement)}
        >
        {ListElement}
        </button>
      ))}
    </ul>
  )
}