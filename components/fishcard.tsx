import type { Fish } from "../types";

import { CheckCircleIcon } from "@heroicons/react/outline";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  fish: Fish;
  setSelectedFish: (fish: Fish) => void;
  setShowFish: Dispatch<SetStateAction<boolean>>;
  setChecked: Dispatch<SetStateAction<boolean | null>>;
  checked: boolean | null;
};

function useSingleAndDoubleClick(
  actionSimpleClick: Function,
  actionDoubleClick: Function,
  delay = 250
) {
  const [click, setClick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (click === 1) actionSimpleClick();
      setClick(0);
    }, delay);

    // the duration between this click and the previous one
    // is less than the value of delay = double-click
    if (click === 2) actionDoubleClick();

    return () => clearTimeout(timer);
  }, [click]);

  return () => setClick((prev) => prev + 1);
}

const FishCard = ({
  fish,
  setSelectedFish,
  setShowFish,
  setChecked,
  checked,
}: Props) => {
  const className = "h-5 w-5 " + (checked ? "text-green-500" : "hidden");

  function oneClick() {
    setSelectedFish(fish);
    setShowFish(true);
  }

  function twoClick() {
    setChecked((old) => !old);
  }

  const click = useSingleAndDoubleClick(oneClick, twoClick);
  return (
    <div
      className="relative flex items-center space-x-3 rounded-lg border border-solid border-gray-300 bg-white py-4 px-5 hover:cursor-pointer hover:border-gray-400 dark:border-[#2A2A2A] dark:bg-[#1F1F1F]"
      onClick={click}
    >
      <div className="flex-shrink-0">
        <img className="h-8 w-8" src={fish.iconURL} alt={fish.name} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {fish.name}
        </p>
        <p className="truncate text-sm text-gray-400">{fish.description}</p>
      </div>

      {checked !== null && <CheckCircleIcon className={className} />}
    </div>
  );
};

export default FishCard;