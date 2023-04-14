import Link from "next/link";
import { useRouter } from "next/router";

const ACTIVE_CLASSNAME = "py-2 px-2 bg-green-600/20 w-full rounded-md font-semibold text-xs";
const INACTIVE_CLASSNAME = "py-2 px-2 w-full text-xs";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="col-span-2 bg-green-100/70 h-100 w-full flex flex-col justify-start items-start gap-2 p-4 border-box text-sm">
      <p className="p-2 mb-4 font-semibold text-lg">Admin Dashboard</p>
      <Link href="/admin/users" className={router.pathname == "/admin/users" ? ACTIVE_CLASSNAME : INACTIVE_CLASSNAME}>Local Users</Link>
      <Link href="/admin/mappings" className={router.pathname == "/admin/mappings" ? ACTIVE_CLASSNAME : INACTIVE_CLASSNAME}>User Mappings</Link>
    </aside>
  )
}