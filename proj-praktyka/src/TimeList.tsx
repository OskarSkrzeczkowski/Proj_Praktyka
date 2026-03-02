
interface ColorProps {
  activeElement: string;
  inActiveElement: string;
  onTimeChange: (time: string) => void;
  currentTime: string;                 
}

export const TimeList = ({activeElement, inActiveElement, onTimeChange, currentTime}: ColorProps) => {
  const tList = ["1 min", "1.5 min", "2 min", "3 min"];
  
  return (
    <ul className="flex justify-center gap-8">
      {tList.map((ListElement) => (
        <li
          key={ListElement}
          className={`p-3 rounded-lg cursor-pointer text-white font-medium  flex justify-center items-center  rounded-[10px] w-32 h-10 transition-[transform,box-shadow] duration-300 ease-in-out
                      ${currentTime === ListElement ? activeElement : inActiveElement}`}
          onClick={() => onTimeChange(ListElement)} 
        >
          {ListElement}
        </li>
      ))}
    </ul>
  );
};