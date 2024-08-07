import { useState } from "react";
import { openMine } from "../api/bet";
import { toast } from "react-toastify";

export default function MinesGrid() {
  const [buttonColors, setButtonColors] = useState(
    Array(25).fill("bg-gray-300")
  );

  const handleButtonClick = async (index) => {
    console.log(index);
    try {
      await openMine(index); // Ensure the backend expects index or adjust accordingly
      toast.success("Mine opened successfully");
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="m-4 grid grid-cols-5 gap-4">
      {buttonColors.map((color, index) => (
        <button
          key={index} // You can use a unique key if available
          style={{ aspectRatio: "1/1" }}
          className={`p-2 ${buttonColors[index]} rounded-md lg:w-20 lg:h-20 sm:w-12 sm:h-12 w-full`}
          onClick={() => handleButtonClick(index)} // Pass index to handleButtonClick
        ></button>
      ))}
    </div>
  );
}
