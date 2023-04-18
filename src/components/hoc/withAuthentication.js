import { getItem } from "@/lib/Storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuthentication = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const checkAuthentication = async() => {
      const authPromise = () => new Promise((resolve, reject) => {
        try {
          const token = getItem("token");
          const user = getItem("user");
          resolve({ token, user });
        } catch(err) {
          reject(err);
        }
      });

      return authPromise()
        .then(({ token, user }) => {
          if (!token || !user) {
            const { organization } = getItem(organization);
            return router.push({
              pathname: "/[organization]",
              query: router.query
            });
          }
          setCurrentUser(user);
        })
        .then(() => setIsLoading(false))
        .catch(error => console.log(error))
    }

    useEffect(() => {
      checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if (isLoading) return <section>Loading. Please wait!</section>
    return <Component currentUser={currentUser} />;
  };
  return AuthenticatedComponent;
}

export default withAuthentication;