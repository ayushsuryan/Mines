import { useState } from "react";
import { toast } from "react-toastify";
import { Select, Option } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { startBet } from "../api/bet";

export default function Bet() {
  const [selectedMines, setSelectedMines] = useState(null);
  const [betAmount, setBetAmount] = useState(""); // Unused but kept for future use

  const options = [];
  for (let i = 1; i <= 25; i++) {
    options.push(
      <Option key={i} value={i.toString()}>
        {i}
      </Option>
    ); // Convert number to string
  }

  const handleBetClick = async () => {
    if (selectedMines) {
      try {
        // Call startBet with only the selected number of mines
        await startBet(selectedMines);
        toast.success("Please Select Mines");
      } catch (error) {
        toast.warning(error.response.data.message + " Please Relogin");
      }
    } else {
      toast.warning("Please select the number of mines");
    }
  };

  const handleSelectChange = (value) => {
    setSelectedMines(value);
  };

  return (
    <div className="rounded-md px-4 ring-1 ring-inset ring-gray-300 flex flex-col gap-0 p-5 mx-4">
      <div className="inputBetAmount w-100 my-2">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Bet Amount
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">₹</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label className="sr-only">Currency</label>
            <span
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm flex justify-center items-center"
            >
              INR
            </span>
          </div>
        </div>
      </div>
      <div className="noOfMineSelector w-100 my-2">
        <Select
          label="Select Number of Mines"
          onChange={(value) => handleSelectChange(value)} // Handle change event properly based on tailwind materials
        >
          {options}
        </Select>
      </div>
      <div className="betButton w-100 my-4">
        <Button
          className="w-full bg-green-500 text-black"
          onClick={handleBetClick}
        >
          Bet
        </Button>
      </div>
    </div>
  );
}
