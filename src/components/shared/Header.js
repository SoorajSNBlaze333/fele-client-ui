import LogoutButton from "./LogoutButton";

export default function Header({ organization = "", network = "", channel = "" }) {
  const renderHeader = () => {
    if (!organization.length || !network.length || !channel.length) {
      return <h3 className="m-0 font-bold text-2xl">Employees</h3>
    }

    return (<>
      <h3 className="m-0 font-bold text-2xl capitalize">{organization}</h3>
      <span className="m-0 font-bold text-2xl text-gray-600">/</span>
      <h3 className="m-0 font-bold text-2xl capitalize">{network}</h3>
      <span className="m-0 font-bold text-2xl text-gray-600">/</span>
      <h3 className="m-0 font-bold text-2xl capitalize">{channel}</h3>
    </>)
  }

  return (
    <header className="px-4 flex justify-start items-center relative gap-4 border-b-2 border-slate-100">
      <section className="flex py-6 justify-start items-center gap-2">
        {renderHeader()}
      </section>
      <LogoutButton />
    </header>
  )
}