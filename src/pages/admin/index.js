import Head from "next/head";
import { Inter } from 'next/font/google';
import withAuthentication from "@/components/hoc/withAuthentication";
import { useEffect, useState } from "react";
import { getItem } from "@/lib/Storage";
import Header from "@/components/shared/Header";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

const Admin = () => {
  const [organizationConfig, setOrganizationConfig] = useState({ network: "", channel: "" })
  const router = useRouter();

  useEffect(() => {
    const organization = getItem("organization");
    if (!organization) {
      router.push('/organization');
    } else {
      setOrganizationConfig(JSON.parse(organization));
    }
  }, [])

  return (<>
    <Head>
      <title>FELE Client App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={inter.className + " h-full w-full grid grid-cols-10"}>
      <aside className="col-span-2 bg-green-100/70 h-100 w-full"></aside>
      <main className="col-span-8">
        <article className="">
          <Header network={organizationConfig.network} channel={organizationConfig.channel} />
          <section className="py-2 px-4">Admin Dashboard</section>
        </article>
      </main>
    </div>

  </>)
}

export default withAuthentication(Admin);