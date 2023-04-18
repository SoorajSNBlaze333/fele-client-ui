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
      const user = getItem("user");
      if (token) {
        if (user && user.role !== "Admin") return router.push({
          pathname: "/[organization]/user",
          query: router.query
        })
        if (user && user.role === "Admin" && organization) return router.push({
          pathname: "/[organization]/admin/users",
          query: router.query
        })
        else {
          if (user.role === "Admin") return router.push({
            pathname: "/[organization]/network",
            query: router.query
          });
          else return router.push({
            pathname: "/[organization]/",
            query: router.query
          });
        }
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