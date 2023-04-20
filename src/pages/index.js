import { useEffect } from "react"
import { useRouter } from "next/router"

export default function OutsideOrg() {
  const router = useRouter();

  useEffect(() => {
    router.push("/uhcl");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return <></> 
}