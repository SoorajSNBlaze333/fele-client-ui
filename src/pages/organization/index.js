import Head from "next/head";
import Link from "next/link";
import { Inter } from 'next/font/google';
import { Fragment, useContext, useEffect, useState } from "react";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Router from "next/router";
import { AppContext } from "../_app";

const inter = Inter({ subsets: ['latin'] })

export default function Organization() {
  const [organizationConfig, setOrganizationConfig] = useState({ 
    network: { name: "Please select a network", value: null }, 
    channel: { name: "Please select a channel", value: null }, 
  });
  const [networks, setNetworks] = useState([]);
  const [channels, setChannels] = useState([]);
  const appContext = useContext(AppContext);

  const handleChange = (name, value) => {
    if (name === "network") {
      setOrganizationConfig(() => ({
        network: value,
        channel: { name: "Please select a channel", value: null }
      }));
    } else if (name === "channel") {
      setOrganizationConfig(prev => ({
        ...prev,
        channel: value
      }));
    }
  }

  const handleDashboard = () => {
    // TODO (update this to local storage for ease of use)
    appContext.setContext(prev => ({
      ...prev,
      network: organizationConfig.network.value,
      channel: organizationConfig.channel.value
    }))
    Router.push('/admin');
  }

  useEffect(() => {
    // TODO Fetch networks
    setNetworks([  
      { name: "Please select a network", value: null },
      { name: "Artemis", value: "artemis"  },
      { name: "UHCL", value: "uhcl" }
    ])
  }, [])

  useEffect(() => {
    // TODO Fetch channels
    setChannels([
      { name: "Please select a channel", value: null },
      { name: "UHCL", value: "uhcl" },
      { name: "UTD",  value: "utd" }
    ])
  }, [networks, organizationConfig.network]);

  return (
    <>
      <Head>
        <title>FELE Client App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <article className="h-full w-full flex justify-center items-center">
          <section className="h-auto flex flex-col w-[370px] text-sm">
            <section className="w-100 mb-8">
              <p className="text-2xl font-bold">Network & Channel</p>
              <p className="text-base text-slate-400">{"Choose your organization's Network and Channel"}</p>
            </section>
            <section className="w-100 flex flex-col mb-7">
              <label htmlFor="network-selection" className="w-100 text-slate-500 font-medium mb-1">Network</label>
              <Listbox id="network-selection" name="network" value={organizationConfig.network.name} onChange={(value) => handleChange("network", value)}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 border-slate-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{organizationConfig.network.name}</span>
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[100]">
                      {networks.map((network, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 px-4 text-sm ${
                              active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                            }`
                          }
                          value={network}
                        >
                          {({ selected }) => (
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {network.name}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </section>
            <section className="w-100 flex flex-col mb-7">
              <label htmlFor="channel-selection" className="w-100 text-slate-500 font-medium mb-1">Channel</label>
              <Listbox id="channel-selection" name="channel" disabled={!organizationConfig.network.value} value={organizationConfig.channel.name} onChange={(value) => handleChange("channel", value)}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-2 border-slate-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{organizationConfig.channel.name}</span>
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[101]">
                      {channels.map((channel, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 px-4 text-sm ${
                              active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                            }`
                          }
                          value={channel}
                        >
                          {({ selected }) => (
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {channel.name}
                            </span>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </section>
            <section className="w-100 flex flex-col mb-7">
              {JSON.stringify(organizationConfig)}
            </section>
            <section className="w-full">
              <button disabled={!organizationConfig.network.value || !organizationConfig.channel.value} className="w-full rounded-md bg-green-700/80 text-white p-2" onClick={handleDashboard}>Go to Dashboard</button>
            </section>
          </section>
        </article>
      </main>
    </>
  )
}