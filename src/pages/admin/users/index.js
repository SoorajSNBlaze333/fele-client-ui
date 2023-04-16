import Head from "next/head";
import { Inter } from 'next/font/google';
import withAuthentication from "@/components/hoc/withAuthentication";
import { useEffect, useState } from "react";
import { getItem } from "@/lib/Storage";
import Header from "@/components/shared/Header";
import { useRouter } from "next/router";
import { deleteLocalUser, getOrganizationUsers } from "@/models/Organization";
import { TrashIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/atoms/Modal";
import Sidebar from "@/components/shared/Sidebar";
import RoleBadge from "@/components/shared/RoleBadge";
import AddLocalUser from "@/components/molecules/AddLocalUser";

const inter = Inter({ subsets: ['latin'] })

const Admin = ({ currentUser }) => {
  const [organizationConfig, setOrganizationConfig] = useState({ organization: "", network: "", channel: "" });
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({ show: false, data: {} });
  const router = useRouter();

  const fetchLocalOrgUsers = async() => {
    return getOrganizationUsers()
      .then(users => setUsers(users))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    const organization = getItem("organization");
    if (!organization) {
      router.push('/organization');
    } else {
      setOrganizationConfig(organization);
      fetchLocalOrgUsers();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserAdd = () => fetchLocalOrgUsers();

  const handleDeleteUser = async({ show, data }) => {
    return deleteLocalUser(data.username)
      .then(() => fetchLocalOrgUsers()) // TODO remove the username from the state
      .then(() => setIsModalOpen({ show, data: {} }))
      .catch(error => console.log(error))
  }

  const renderUser = (user, index) => {
    return <section key={"local-user-"+index} className="grid grid-cols-9 py-1.5 border-b-2 border-slate-50 text-sm">
      <p className="col-span-3 flex flex-col justify-center items-start">{user.username}</p>
      <p className="col-span-3 flex flex-col justify-center items-start">
        <RoleBadge role={user.role} />
      </p>
      <section className="col-span-3 flex flex-col justify-center items-start">
        <button onClick={() => setIsModalOpen({ show: true, data: user })} disabled={user.username === currentUser.username} type="button" className="rounded-lg text-red-600 bg-slate-100 p-2 text-xs inline-flex justify-center items-center gap-1 transition-all duration-200 disabled:opacity-30 hover:bg-slate-200 disabled:cursor-not-allowed">
          <TrashIcon className="h-3.5 w-3.5" />
          Delete User
        </button>
      </section>
    </section>
  }

  return (<>
    <Head>
      <title>FELE Client App</title>
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
          <AddLocalUser onUserAdd={handleUserAdd} />
          <section className="py-2 px-4">
            <section className="grid grid-cols-9 font-semibold py-1.5 border-b-2 border-slate-100">
              <p className="col-span-3">Username</p>
              <p className="col-span-3">Role</p>
              <p className="col-span-3">Actions</p>
            </section>
            <section>{users.map(renderUser)}</section>
          </section>
        </article>
      </main>
      <Modal show={isModalOpen} onToggle={setIsModalOpen} handleAction={handleDeleteUser} />
    </div>

  </>)
}

export default withAuthentication(Admin);