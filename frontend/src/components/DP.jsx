import { useEffect, useState } from "react";

function intials(name) {
  let colors = [
    "rgb(220 38 38)",
    "rgb(234 88 12)",
    "rgb(217 119 6)",
    "rgb(202 138 4)",
    "rgb(101 163 13)",
    "rgb(22 163 74)",
    "rgb(5 150 105)",
    "rgb(13 148 136)",
    "rgb(8 145 178)",
    "rgb(2 132 199)",
    "rgb(37 99 235)",
    "rgb(79 70 229)",
    "rgb(124 58 237)",
    "rgb(147 51 234)",
    "rgb(192 38 211)",
    "rgb(219 39 119)",
    "rgb(225 29 72)"
  ];
  let color = colors[Math.floor(Math.random() * colors.length)];
  let nameSplit = name.split(" ");
  return [
    nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase(),
    color,
  ];
}

export default function DP(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(intials(props.name));
  }, []);

  return (
    <>
      {data.length == 2 && (
        <div
          style={{ backgroundColor: `${data[1]}` }}
          className="
          px-2 py-1 h-fit select-none text-white w-fit rounded-lg"
        >
          {data[0]}
        </div>
      )}
    </>
  );
}
