import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import ModalDynamic from "../atoms/ModalDynamic";
import { updateAsset } from "@/models/User";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function UpdateAsset({ asset = {}, onAssetUpdate = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetDetails, setAssetDetails] = useState({ name: '', designation: '', salary: '' });

  useEffect(() => {
    if (isModalOpen) setAssetDetails({ name: asset.name, designation: asset.designation, salary: asset.salary });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!assetDetails.name.length || !assetDetails.designation.length || !assetDetails.salary.length) return;
    return updateAsset(asset._id, assetDetails)
      .then(asset => onAssetUpdate(asset))
      .then(() => setIsModalOpen(false))
      .catch(error => console.log(error))
  }

  const handleInput = (e) => setAssetDetails(prev => ({
    ...prev,
    [e.target.name]: e.target.value.trim()
  }));

  return (
    <section className="">
      <Button neutral size="sm" onClick={() => setIsModalOpen(true)}>
        <PencilSquareIcon className="h-3.5 w-3.5" />
        Update Asset
      </Button>
      <ModalDynamic
        title="Update Asset"
        show={isModalOpen}
        onClose={() => setIsModalOpen(prev => !prev)}
      >
        <>
          <form onSubmit={handleSubmit} className="w-100 text-sm mt-4">
            <fieldset className="w-100 flex flex-col mb-7">
              <label htmlFor="name" className="w-100 text-slate-500 font-medium mb-1">Asset Name</label>
              <input id="name" type="text" name="name" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter asset name" value={assetDetails.name} onChange={handleInput} />
            </fieldset>
            <fieldset className="w-100 flex flex-col mb-7">
              <label htmlFor="designation" className="w-100 text-slate-500 font-medium mb-1">Asset Designation</label>
              <input id="designation" type="text" name="designation" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter asset designation" value={assetDetails.designation} onChange={handleInput} />
            </fieldset>
            <fieldset className="w-100 flex flex-col mb-7">
              <label htmlFor="salary" className="w-100 text-slate-500 font-medium mb-1">Asset Salary</label>
              <input id="salary" type="text" name="salary" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter asset salary" value={assetDetails.salary} onChange={handleInput} />
            </fieldset>
            <fieldset className="flex justify-end items-center gap-2">
              <Button type="button" neutral size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" primary size="sm" onClick={handleSubmit}>Update Asset</Button>
            </fieldset>
          </form>  
        </>
      </ModalDynamic>
    </section>
  )
}