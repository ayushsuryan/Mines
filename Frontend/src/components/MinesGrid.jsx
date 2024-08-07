import { useState } from "react";

export default function MinesGrid() {
  const [buttonColors, setButtonColors] = useState(
    Array(25).fill("bg-gray-300")
  );

  const handleButtonClick = async (index) => {
    console.log(`Button ${index + 1} clicked`);

    try {
      // Simulate API call
      const response = await fetch(
        `https://api.example.com/button-color/${index + 1}`
      );
      const data = await response.json();

      const newColor = data.color === "green" ? "bg-green-500" : "bg-red-500";

      setButtonColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[index] = newColor;
        return newColors;
      });
    } catch (error) {
      console.error("Error fetching button color:", error);
    }
  };

  return (
    <div className=" m-4 grid grid-cols-5 gap-4  ">
      {buttonColors.map((index) => (
        <button
          key={index}
          style={{ aspectRatio: "1/1" }}
          className={`p-2 bg-gray-300 rounded-md lg:w-20 lg:h-20 sm:w-12 sm:h-12 w-full `}
          onClick={() => handleButtonClick(index)}
        ></button>
      ))}
    </div>
  );
}
