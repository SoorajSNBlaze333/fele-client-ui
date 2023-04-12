import { getItem } from "@/lib/Storage";
import { useEffect, useState } from "react";
const { useRouter } = require("next/router");

const withAuthentication = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    // const [organizationData, setOrganizationData] = useState(null);

    const checkAuthentication = () => {
      const token = getItem("token");
      // const orgData = getItem("organization");
      // setOrganizationData(orgData)
      if (!token) {
        return router.push('/');
      }
      setIsLoading(false);
    }

    useEffect(() => {
      checkAuthentication();
    }, []);

    if (isLoading) return <section>Loading. Please wait!</section>
    return <Component />;
  };
  return AuthenticatedComponent;
}

export default withAuthentication;