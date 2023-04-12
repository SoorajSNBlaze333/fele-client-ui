import { getItem } from "@/lib/Storage";
import { useEffect, useState } from "react";
const { useRouter } = require("next/router");

const checkAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = getItem("token");
      if (token) {
        router.push('/organization');
      }
      setIsLoading(false);
    }, [router]);

    if (isLoading) return <section>Loading. Please wait!</section>
    return <Component />;
  };
  return AuthenticatedComponent;
}

export default checkAuth;