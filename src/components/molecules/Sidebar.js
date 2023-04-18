import { LinkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import withAuthentication from "../hoc/withAuthentication";

const ACTIVE_CLASSNAME = "py-2 px-2 bg-green-600/20 w-full rounded-md font-semibold text-xs flex justify-start items-center gap-1";
const INACTIVE_CLASSNAME = "py-2 px-2 w-full text-xs flex justify-start items-center gap-1";

const Sidebar = ({ currentUser }) => {
  const router = useRouter();

  return (
    <aside className="col-span-2 bg-green-100/70 h-100 w-full flex flex-col justify-between border-box text-sm">
      <section className="flex flex-col justify-start items-start gap-2 w-100 p-4">
        <p className="mb-4 font-semibold text-lg">
          {currentUser.role === "Admin" ? "Admin Dashboard" : "Dashboard"}
        </p>
        {currentUser.role === "Admin" && (
          <>
            <Link href="/admin/users" className={router.pathname == "/admin/users" ? ACTIVE_CLASSNAME : INACTIVE_CLASSNAME}>
              <UserCircleIcon className="w-5 h-5" />
              Local Users
            </Link>
            <Link href="/admin/mappings" className={router.pathname == "/admin/mappings" ? ACTIVE_CLASSNAME : INACTIVE_CLASSNAME}>
              <LinkIcon className="w-5 h-5" />
              User Mappings
            </Link>
          </>
        )}
      </section>
      <section className="w-100 p-4 font-semibold">
        Logged in as {currentUser.username} ({currentUser.role})
      </section>
    </aside>
  )
}

export default withAuthentication(Sidebar);