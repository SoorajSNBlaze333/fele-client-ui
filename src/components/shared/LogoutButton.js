import { logout } from "@/models/Auth";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <button onClick={handleLogout} type="button" className="rounded-lg text-red-600 bg-slate-100 p-2 text-sm flex justify-center items-center gap-1 absolute top-4 right-4">
      <ArrowLeftCircleIcon className="h-4 w-4" />
      <span>Logout</span>
    </button>
  )
}