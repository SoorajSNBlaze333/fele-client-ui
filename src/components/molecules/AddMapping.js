import { Fragment, useEffect, useState } from "react";
import Button from "../atoms/Button";
import ModalDynamic from "../atoms/ModalDynamic";
import { addMapping, fetchFeleUsers, getOrganizationUsers } from "@/models/Organization";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowRightIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getItem } from "@/lib/Storage";

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
    return addMapping(mapping)
      .then(user => onUserMap(user))
      .then(() => setIsModalOpen(false))
      .catch(error => console.log(error))
  }

  return (
    <section className="py-2 px-4">
      <Button primary size="sm" onClick={() => setIsModalOpen(true)}>
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
                <label htmlFor="network-selection" className="w-100 text-slate-500 font-medium mb-1">Local User</label>
                <Listbox id="network-selection" value={mapping.from} onChange={(value) => handleChange("from", value)}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 border-slate-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{mapping.from}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[1000]">
                        {localUsers.map((user, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 px-4 text-sm ${
                                active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                              }`
                            }
                            value={user}
                          >
                            {({ selected }) => (
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {user}
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </section>
              <section className="col-span-1 flex flex-col justify-end items-center mb-7">
                <ArrowRightIcon className="col-span-1 w-5 h-5 text-slate-500 mb-3" />
              </section>
              <section className="col-span-4 flex flex-col mb-7">
                <label htmlFor="network-selection" className="w-100 text-slate-500 font-medium mb-1">Fele User</label>
                <Listbox id="network-selection" value={mapping.to} onChange={(value) => handleChange("to", value)}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 border-slate-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{mapping.to}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[1000]">
                        {feleUsers.map((user, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 px-4 text-sm ${
                                active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                              }`
                            }
                            value={user}
                          >
                            {({ selected }) => (
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {user}
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
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