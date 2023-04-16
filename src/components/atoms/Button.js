export default function Button({
  type = "button",
  size = "md",
  primary = false,
  danger = false,
  neutral = false,
  disabled = false,
  onClick = () => {},
  ...props
}) {
  const classNameProps = [];
  classNameProps.push("rounded-md text-white font-medium transition-all duration-100 inline-flex justify-center items-center disabled:cursor-not-allowed");

  if (primary) {
    if (disabled) classNameProps.push("bg-green-700/60");
    else classNameProps.push("bg-green-700/80 hover:bg-green-700/60");
  } else if (danger) {
    if (disabled) classNameProps.push("bg-red-700/60");
    else classNameProps.push("bg-red-600/90 hover:bg-red-600/100");
  } else if (neutral) {
    if (disabled) classNameProps.push("bg-slate-100/60");
    else classNameProps.push("bg-slate-100 hover:bg-slate-200 text-black");
  }

  if (size === "lg") {
    classNameProps.push("px-4 py-2 text-lg");
  } else if (size === "md") {
    classNameProps.push("px-4 py-2 text-md");
  } else if (size === "sm") {
    classNameProps.push("px-4 py-2 text-sm");
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