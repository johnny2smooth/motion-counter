import * as Icons from "@heroicons/react/solid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

export default function Home() {
  let [ref, { width }] = useMeasure();
  let [count, setCount] = useState(1);
  let prev = usePrevious(count);
  let direction = count > prev ? 1 : -1;

  return (
    <>
      <h1 className="text-9xl text-green-500">Hello!</h1>
      <h2 className="text-7xl text-green-300">My name is Johnny</h2>
      <p className="text-3xl text-green-100">I know how to count!</p>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="m-5 flex h-32 w-40 items-center justify-center rounded-full bg-white hover:bg-gray-200"
        >
          <Icons.ChevronLeftIcon className="w-22 h-22" />
        </button>
        <div
          ref={ref}
          className={`relative m-10 flex h-96 w-96 items-center justify-center overflow-hidden rounded-full ${
            colors[1][Math.abs(count) % 4]
          } p-10 text-9xl text-slate-300`}
        >
          <AnimatePresence custom={{ direction, width }}>
            <motion.div
              key={count}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={{ direction, width }}
              className={` ${
                colors[0][Math.abs(count) % 4]
              } absolute flex h-72 w-72 items-center justify-center rounded-full`}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={() => setCount(count + 1)}
          className="flex h-32 w-40 items-center justify-center rounded-full bg-white hover:bg-gray-200"
        >
          <Icons.ChevronRightIcon className="w-22 h-22" />
        </button>
      </div>
    </>
  );
}

let variants = {
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({ x: direction * -width }),
};

let colors = [
  ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"],
  ["bg-slate-900", "bg-slate-300", "bg-slate-500", "bg-slate-700"],
];

function usePrevious(state) {
  let [tuple, setTuple] = useState([null, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }

  return tuple[0];
}
