import { logout } from "@/models/Auth";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

export default function Header({ network, channel }) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <header className="px-4 py-6 flex justify-between items-center">
        <section className="flex justify-start items-center gap-2">
          <h3 className="m-0 font-bold text-2xl">{network}</h3>
          <span className="m-0 font-bold text-2xl">•</span>
          <h3 className="m-0 font-bold text-2xl">{channel}</h3>
        </section>
        <section>
          <button onClick={handleLogout} type="button" className="rounded-lg text-red-600 bg-slate-100 p-2 text-sm flex justify-center items-center gap-1">
            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </section>
      </header>
  )
}