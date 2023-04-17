import { useState } from "react";
import Button from "../atoms/Button";
import ModalDynamic from "../atoms/ModalDynamic";
import { addLocalUser } from "@/models/Organization";
import { PlusIcon } from "@heroicons/react/20/solid";
import Dropdown from "../atoms/Dropdown";
import { ROLES } from "@/config/constants";

export default function AddLocalUser({ onUserAdd = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '', role: 'Admin' });

  const handleSubmit = async(e) => {
    e.preventDefault();
    return addLocalUser(userCredentials)
      .then(user => onUserAdd(user))
      .then(() => setIsModalOpen(false))
      .catch(error => console.log(error))
  }

  const handleInput = (e) => setUserCredentials(prev => ({
    ...prev,
    [e.target.name]: e.target.value.trim()
  }));

  return (
    <section className="py-2 px-4">
      <Button primary size="sm" onClick={() => setIsModalOpen(true)}>
        <PlusIcon className="h-3.5 w-3.5" />
        Add Local User
      </Button>
      <ModalDynamic
        title="Add Local User"
        show={isModalOpen}
        onClose={() => setIsModalOpen(prev => !prev)}
      >
        <>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Adding a new Local User will add a new User to the organizatio that can be mapped to Fele Users in the channel.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-100 text-sm mt-4">
            <fieldset className="w-100 flex flex-col mb-7">
              <label htmlFor="username" className="w-100 text-slate-500 font-medium mb-1">Username</label>
              <input id="username" type="text" name="username" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter user's username" onChange={handleInput} />
            </fieldset>
            <fieldset className="w-100 flex flex-col mb-7">
              <label htmlFor="password" className="w-100 text-slate-500 font-medium mb-1">Password</label>
              <input id="password" type="password" name="password" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter user's password" onChange={handleInput} />
            </fieldset>
            <fieldset className="w-100 flex flex-col mb-7">
              <Dropdown
                id="role" 
                type="role"
                value={userCredentials.role}
                label="Local User"
                options={ROLES}
                handleChange={(name, value) => handleInput({ target: { name, value } })}
              />
            </fieldset>
            <fieldset className="flex justify-end items-center gap-2">
              <Button type="button" neutral size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" primary size="sm" onClick={handleSubmit}>
                Add
              </Button>
            </fieldset>
          </form>
        </>
      </ModalDynamic>
    </section>
  )
}