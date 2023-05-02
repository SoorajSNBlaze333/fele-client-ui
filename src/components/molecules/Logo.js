import Image from "next/image";
import nexon from "../../assets/nexon.png";
import velocity from "../../assets/velocity.png";
import nivian from "../../assets/nivian.png";

export default function Logo({ organization, height, width, className = "" }) {
  const renderImage = (src, alt) => <Image src={src} alt={alt} height={height + "px"} width={width + "px"} className={className} />

  if (organization === "nexon") return renderImage(nexon, "nexon");
  else if (organization === "velocity") return renderImage(velocity, "velocity");
  else if (organization === "nivian") return renderImage(nivian, "nivian");
  return renderImage(velocity, "velocity");
}