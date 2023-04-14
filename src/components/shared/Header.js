import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import LogoutButton from "./LogoutButton";
// import Link from "next/link";

export default function Header({ organization = "", network = "", channel = "" }) {
  return (
    <header className="px-4 flex justify-start items-center relative gap-4">
      {/* <Link href="/organization" className="flex justify-start items-center gap-1 bg-slate-100 p-2 px-3 cursor-pointer rounded-md text-sm">
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </Link> */}
      <section className="flex py-6 justify-start items-center gap-2">
        <h3 className="m-0 font-bold text-2xl uppercase">{organization}</h3>
        <span className="m-0 font-bold text-2xl text-gray-400">•</span>
        <h3 className="m-0 font-bold text-2xl capitalize">{network}</h3>
        <span className="m-0 font-bold text-2xl text-gray-400">•</span>
        <h3 className="m-0 font-bold text-2xl capitalize">{channel}</h3>
      </section>
      <LogoutButton />
    </header>
  )
}