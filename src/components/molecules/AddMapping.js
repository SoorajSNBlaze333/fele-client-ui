import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import ModalDynamic from "../atoms/ModalDynamic";
import { addMapping, fetchFeleUsers, getOrganizationUsers } from "@/models/Organization";
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/20/solid";
import { getItem } from "@/lib/Storage";
import Dropdown from "../atoms/Dropdown";

export default function AddMapping({ onUserMap = () => {}, currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapping, setMapping] = useState({ from: 'Please select a local user', to: 'Please select a fele user' });
  const [localUsers, setLocalUsers] = useState([]);
  const [feleUsers, setFeleUsers] = useState([]);

  const fetchUsers = async() => {
    const org = getItem("organization");
    const [local, fele] = await Promise.all([getOrganizationUsers(), fetchFeleUsers(org.network, org.channel)]);
    setLocalUsers(() => (["Please select a local user", ...local.filter(user => user.username !== currentUser.username).map(u => u.username)]));
    setFeleUsers(() => (["Please select a fele user", ...fele]));
  }

  useEffect(() => {
    if (isModalOpen) fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  const handleChange = (name, value) => {
    setMapping(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { network, channel } = getItem("organization");
    return addMapping(mapping, network, channel)
      .then(user => onUserMap(user))
      .then(() => setIsModalOpen(false))
      .catch(error => console.log(error))
  }

  return (
    <section className="py-2 px-4">
      <Button primary size="sm" onClick={() => setIsModalOpen(true)}>
        <PlusIcon className="h-3.5 w-3.5" />
        Add New Mapping
      </Button>
      <ModalDynamic
        title="Mapping a Local User to a Fele User"
        show={isModalOpen}
        onClose={() => setIsModalOpen(prev => !prev)}
      >
        <>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Mapping a local user to a fele user will give the local user the permissions of the fele user and access rights to the permissions of the fele user.
            </p>
          </div>
          <section className="w-100 text-sm mt-4">
            <section className="w-100 grid grid-cols-9 gap-2">
              <section className="col-span-4 flex flex-col mb-7">
                <Dropdown 
                  id="local-users" 
                  type="from"
                  value={mapping.from}
                  label="Local User"
                  options={localUsers}
                  handleChange={handleChange}
                />
              </section>
              <section className="col-span-1 flex flex-col justify-end items-center mb-7">
                <ArrowRightIcon className="col-span-1 w-5 h-5 text-slate-500 mb-3" />
              </section>
              <section className="col-span-4 flex flex-col mb-7">
                <Dropdown 
                  id="fele-users" 
                  type="to"
                  value={mapping.to}
                  label="Fele User"
                  options={feleUsers}
                  handleChange={handleChange}
                />
              </section>
            </section>
            <section className="flex justify-end items-center gap-2">
              <Button type="button" neutral size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button disabled={mapping.from === "Please select a local user" || mapping.to === "Please select a fele user"} type="button" primary size="sm" onClick={handleSubmit}>
                Add Mapping
              </Button>
            </section>
          </section>
        </>
      </ModalDynamic>
    </section>
  )
}