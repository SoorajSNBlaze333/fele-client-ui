import { useRouter } from "next/router";

export default function Button({
  type = "button",
  size = "md",
  primary = false,
  danger = false,
  neutral = false,
  inverted = false,
  disabled = false,
  onClick = () => {},
  ...props
}) {
  const classNameProps = [];
  classNameProps.push("rounded-md font-medium transition-all duration-100 inline-flex justify-center items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed");

  if (primary) {
    classNameProps.push("bg-green-700/80 hover:bg-green-700/60 text-white ");
  } else if (danger) {
    if (inverted) classNameProps.push("text-red-600 bg-slate-100 hover:bg-slate-200");
    else classNameProps.push("bg-red-600/90 hover:bg-red-600/100 text-white ");
  } else if (neutral) {
    classNameProps.push("bg-slate-100 hover:bg-slate-200 text-black");
  }

  if (size === "lg") {
    classNameProps.push("px-4 py-2 text-lg");
  } else if (size === "md") {
    classNameProps.push("px-4 py-2 text-md");
  } else if (size === "sm") {
    classNameProps.push("px-3 py-2 text-xs");
  } else if (size === "xs") {
    classNameProps.push("px-3 py-1 text-xs");
  }

  return (<button
    type={type}
    className={classNameProps.join(" ")}
    onClick={onClick}
    disabled={disabled}
  >
    {props.children}
  </button>)
}