import { getItem } from "@/lib/Storage";
import { useEffect, useState } from "react";
const { useRouter } = require("next/router");

const checkAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const checkAuthToken = () => {
      const token = getItem("token");
      const organization = getItem("organization");
      if (token) {
        if (organization) return router.push('/admin')
        return router.push('/organization');
      }
      setIsLoading(false);
    }

    useEffect(() => {
      checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    if (isLoading) return <section>Loading. Please wait!</section>
    return <Component />;
  };
  return AuthenticatedComponent;
}

export default checkAuth;