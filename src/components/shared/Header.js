import LogoutButton from "./LogoutButton";

export default function Header({ network = "", channel = "" }) {
  return (
    <header className="px-4 flex justify-between items-center relative">
        <section className="flex py-6 justify-start items-center gap-2">
          <h3 className="m-0 font-bold text-2xl">{network}</h3>
          <span className="m-0 font-bold text-2xl">•</span>
          <h3 className="m-0 font-bold text-2xl">{channel}</h3>
        </section>
        <LogoutButton />
      </header>
  )
}