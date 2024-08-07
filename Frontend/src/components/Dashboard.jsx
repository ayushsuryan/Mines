import Bet from "./Bet";
import MinesGrid from "./MinesGrid";
export default function Dashboard() {
  return (
    <div className=" sm:mt-20  sm:w-full sm:flex-row flex-col  flex  justify-center item-center ">
      <Bet></Bet>
      <MinesGrid></MinesGrid>
    </div>
  );
}
