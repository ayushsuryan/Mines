import { useState } from "react";
import { openMine } from "../api/bet";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed and set up

export default function MinesGrid() {
  const [buttonColors, setButtonColors] = useState(
    Array(25).fill("bg-gray-300")
  );

  const handleButtonClick = async (index) => {
    try {
      const response = await openMine(index);
      toast.success("Mine opened successfully");
    } catch (error) {
      console.error("Error opening mine:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while opening the mine"
      );
    }
  };

  return (
    <div className="m-4 grid grid-cols-5 gap-4">
      {buttonColors.map((_, index) => (
        <button
          key={index}
          style={{ aspectRatio: "1/1" }}
          className={`p-2 rounded-md ${buttonColors[index]} lg:w-20 lg:h-20 sm:w-12 sm:h-12 w-full`}
          onClick={() => handleButtonClick(index)}
        >
          {/* Optionally include button text or icon */}
        </button>
      ))}
    </div>
  );
}
