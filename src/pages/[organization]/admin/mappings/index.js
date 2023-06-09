import Head from "next/head";
import { Inter } from 'next/font/google';
import withAuthentication from "@/components/hoc/withAuthentication";
import { useEffect, useState } from "react";
import { getItem } from "@/lib/Storage";
import Header from "@/components/molecules/Header";
import { useRouter } from "next/router";
import { deleteMapping, fetchLocalOrganizationMappings } from "@/models/Organization";
import { TrashIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/atoms/Modal";
import Sidebar from "@/components/molecules/Sidebar";
import AddMapping from "@/components/molecules/AddMapping";
import Button from "@/components/atoms/Button";

const inter = Inter({ subsets: ['latin'] })

const Mappings = ({ currentUser }) => {
  const [organizationConfig, setOrganizationConfig] = useState({ organization: "", network: "", channel: "" });
  const [mappings, setMappings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({ show: false, data: {} });
  const router = useRouter();

  const fetchLocalOrgMappings = async(org) => {
    return fetchLocalOrganizationMappings(org.network, org.channel)
      .then(mappings => setMappings(mappings))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    const organization = getItem("organization");
    if (!organization) {
      router.push(`${organization.organization}/network`);
    } else {
      setOrganizationConfig(organization);
      fetchLocalOrgMappings(organization);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteMapping = async({ show, data }) => {
    return deleteMapping(data.localUser)
      .then(() => fetchLocalOrgMappings(organizationConfig))
      .then(() => setIsModalOpen({ show, data: {} }))
      .catch(error => console.log(error))
  }

  const handleOnMap = () => fetchLocalOrgMappings(organizationConfig);

  const renderMappings = (mapping, index) => {
    return <section key={"mapping-"+index} className="grid grid-cols-8 py-1.5 border-b-2 border-slate-50 text-sm">
      <p className="col-span-2 flex flex-col justify-center items-start">{mapping.localUser}</p>
      <p className="col-span-2 flex flex-col justify-center items-start">{mapping.feleUser}</p>
      <p className="col-span-2 flex flex-col justify-center items-start">{mapping.walletId}</p>
      <section className="col-span-2 flex flex-col justify-center items-start">
        <Button 
          type="button"
          onClick={() => setIsModalOpen({ show: true, data: mapping })} 
          danger
          inverted
          size="sm"
        >
          <TrashIcon className="h-3.5 w-3.5" />
          Delete Mapping
        </Button>
      </section>
    </section>
  }

  return (<>
    <Head>
      <title>FELE Admin Mappings</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={inter.className + " h-full w-full grid grid-cols-10"}>
      <Sidebar />
      <main className="col-span-8">
        <article className="">
          <Header 
            organization={organizationConfig.organization} 
            network={organizationConfig.network} 
            channel={organizationConfig.channel}
          />
          <AddMapping onUserMap={handleOnMap} currentUser={currentUser} />
          <section className="py-2 px-4">
            <section className="grid grid-cols-8 font-semibold py-1.5 border-b-2 border-slate-100 text-sm">
              <p className="col-span-2">Username</p>
              <p className="col-span-2">Fele User</p>
              <p className="col-span-2">Wallet ID</p>
              <p className="col-span-2">Actions</p>
            </section>
            <section>{mappings.map(renderMappings)}</section>
          </section>
        </article>
      </main>
      <Modal show={isModalOpen} onToggle={setIsModalOpen} handleAction={handleDeleteMapping} />
    </div>

  </>)
}

export default withAuthentication(Mappings);