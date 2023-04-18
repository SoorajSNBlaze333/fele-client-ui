import { useState } from "react";
import Button from "../atoms/Button";
import ModalDynamic from "../atoms/ModalDynamic";
import { PlusIcon } from "@heroicons/react/20/solid";
import { createAsset } from "@/models/User";

export default function AddAsset({ onAssetCreate = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetDetails, setAssetDetails] = useState({ name: '', designation: '', salary: '' });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!assetDetails.name.length || !assetDetails.designation.length || !assetDetails.salary.length) return;
    return createAsset(assetDetails)
      .then(asset => onAssetCreate(asset))
      .then(() => setIsModalOpen(false))
      .catch(error => console.log(error))
  }

  const handleInput = (e) => setAssetDetails(prev => ({
    ...prev,
    [e.target.name]: e.target.value.trim()
  }));

  return (
    <section className="py-2 px-4">
      <Button primary size="sm" onClick={() => setIsModalOpen(true)}>
        <PlusIcon className="h-3.5 w-3.5" />
        Create Employee
      </Button>
      <ModalDynamic
        title="Create new Employee"
        show={isModalOpen}
        onClose={() => setIsModalOpen(prev => !prev)}
      >
        <>
          <form onSubmit={handleSubmit} className="w-100 text-sm mt-4">
            <fieldset className="w-100 flex flex-col mb-7">
              <label htmlFor="name" className="w-100 text-slate-500 font-medium mb-1">Employee Name</label>
              <input id="name" type="text" name="name" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter employee name" onChange={handleInput} />
            </fieldset>
            <fieldset className="w-100 flex flex-col mb-7">
              <label htmlFor="designation" className="w-100 text-slate-500 font-medium mb-1">Employee Designation</label>
              <input id="designation" type="text" name="designation" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter employee designation" onChange={handleInput} />
            </fieldset>
            <fieldset className="w-100 flex flex-col mb-7">
              <label htmlFor="salary" className="w-100 text-slate-500 font-medium mb-1">Employee Salary</label>
              <input id="salary" type="text" name="salary" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter employee salary" onChange={handleInput} />
            </fieldset>
            <fieldset className="flex justify-end items-center gap-2">
              <Button type="button" neutral size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" primary size="sm" onClick={handleSubmit}>Add Employee</Button>
            </fieldset>
          </form>  
        </>
      </ModalDynamic>
    </section>
  )
}