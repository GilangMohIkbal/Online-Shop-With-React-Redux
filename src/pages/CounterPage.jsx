import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CounterPage = () => {
  const [countInput, setCountInput] = useState(0);
  const counterSelector = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const incrementCounter = () => {
    dispatch({
      type: "INCREMENT_COUNT",
    });
  };
  const decrementCounter = () => {
    dispatch({
      type: "DECREMENT_COUNT",
    });
  };

  const handleCountInput = () => {
    dispatch({
      type: "INPUT_COUNT",
      payload: Number(countInput),
    });
  };
  return (
    <main className="flex min-h-[80vh] nax-w-screen-md mx-auto px-4 mt-8 flex-col justify-center items-center gap-4">
      <p className="text-5xl font-bold">Count: {counterSelector.count}</p>
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          onClick={decrementCounter}
          disabled={counterSelector.count < 1}
        >
          <Minus className="h-6 w-6"></Minus>
        </Button>

        <Button size="icon" onClick={incrementCounter}>
          <Plus className="w-6 h-6"></Plus>
        </Button>
      </div>

      <div className="flex gap-2 mt-8">
        <Input type="number" onChange={(e) => setCountInput(e.target.value)} />
        <Button onClick={handleCountInput}>Submit</Button>
      </div>
    </main>
  );
};

export default CounterPage;
