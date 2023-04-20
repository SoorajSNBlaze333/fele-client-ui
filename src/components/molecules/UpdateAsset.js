import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import ModalDynamic from "../atoms/ModalDynamic";
import { updateAsset } from "@/models/User";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ASSET_DATA, ASSET_TYPE } from "@/config/constants";

export default function UpdateAsset({ asset = {}, onAssetUpdate = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetDetails, setAssetDetails] = useState(ASSET_DATA);

  useEffect(() => {
    if (isModalOpen) setAssetDetails(() => {
      const newData = {};
      Object.keys(ASSET_DATA).forEach(key => newData[key] = asset[key]);
      return newData;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (Object.values(assetDetails).some(value => !value.length)) return;
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
        Update {ASSET_TYPE}
      </Button>
      <ModalDynamic
        title={`Update ${ASSET_TYPE} Info`}
        show={isModalOpen}
        onClose={() => setIsModalOpen(prev => !prev)}
      >
        <>
          <form onSubmit={handleSubmit} className="w-100 text-sm mt-4">
            {Object.keys(ASSET_DATA).map((input, index) => (
              <fieldset key={"asset-"+index} className="w-100 flex flex-col mb-7">
                <label htmlFor={input} className="w-100 text-slate-500 font-medium mb-1 capitalize">{ASSET_TYPE} {input}</label>
                <input id={input} type="text" name={input} required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder={`Enter ${ASSET_TYPE} ${input}`} value={assetDetails[input]} onChange={handleInput} />
              </fieldset>
            ))}
            <fieldset className="flex justify-end items-center gap-2">
              <Button type="button" neutral size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" primary size="sm" onClick={handleSubmit}>Update {ASSET_TYPE}</Button>
            </fieldset>
          </form>  
        </>
      </ModalDynamic>
    </section>
  )
}