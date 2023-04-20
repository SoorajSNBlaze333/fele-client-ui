import { useState } from "react";
import Button from "../atoms/Button";
import ModalDynamic from "../atoms/ModalDynamic";
import { PlusIcon } from "@heroicons/react/20/solid";
import { createAsset } from "@/models/User";
import { ASSET_DATA, ASSET_TYPE } from "@/config/constants";

export default function AddAsset({ onAssetCreate = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetDetails, setAssetDetails] = useState(ASSET_DATA);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (Object.values(assetDetails).some(value => !value.length)) return;
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
        Create {ASSET_TYPE}
      </Button>
      <ModalDynamic
        title={`Create new ${ASSET_TYPE}`}
        show={isModalOpen}
        onClose={() => setIsModalOpen(prev => !prev)}
      >
        <>
          <form onSubmit={handleSubmit} className="w-100 text-sm mt-4">
            {Object.keys(ASSET_DATA).map((input, index) => (
              <fieldset key={"asset-"+index} className="w-100 flex flex-col mb-7">
                <label htmlFor={input} className="w-100 text-slate-500 font-medium mb-1 capitalize">{ASSET_TYPE} {input}</label>
                <input id={input} type="text" name={input} required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder={`Enter ${ASSET_TYPE} ${input}`} onChange={handleInput} />
              </fieldset>
            ))}
            <fieldset className="flex justify-end items-center gap-2">
              <Button type="button" neutral size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" primary size="sm" onClick={handleSubmit}>Add {ASSET_TYPE}</Button>
            </fieldset>
          </form>  
        </>
      </ModalDynamic>
    </section>
  )
}