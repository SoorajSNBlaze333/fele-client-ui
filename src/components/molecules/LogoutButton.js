import { logout } from "@/models/Auth";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Button from "../atoms/Button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push({
      pathname: "/[organization]",
      query: router.query
    });
  }

  return (
    <section className="absolute top-6 right-6">
      <Button onClick={handleLogout} type="button" danger size="sm">
        <ArrowLeftCircleIcon className="h-4 w-4" />
        Logout
      </Button>
    </section>
  )
}