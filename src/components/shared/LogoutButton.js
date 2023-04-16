import { logout } from "@/models/Auth";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Button from "../atoms/Button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <section className="absolute top-4 right-4">
      <Button onClick={handleLogout} type="button" danger size="sm">
        <ArrowLeftCircleIcon className="h-4 w-4" />
        Logout
      </Button>
    </section>
  )
}