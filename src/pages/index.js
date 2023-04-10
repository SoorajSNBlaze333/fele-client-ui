import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userCredentials.username.length || !userCredentials.password.length) {
      // TODO handle error if username or password is missing
      return;
    }
    console.log("Came here");
    console.log(userCredentials);
    // TODO make the api call to login
    Router.push('/organization');
  }

  const handleInput = (e) => setUserCredentials(prev => ({
    ...prev,
    [e.target.name]: e.target.value.trim()
  }));

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
              <p className="text-2xl font-bold">Login</p>
              <p className="text-base text-slate-400">Login to your account now</p>
            </section>
            <section className="w-100 mb-8">
              <form onSubmit={handleLogin} className="w-100">
                <fieldset className="w-100 flex flex-col mb-7">
                  <label htmlFor="username" className="w-100 text-slate-500 font-medium mb-1">Username</label>
                  <input id="username" type="text" name="username" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter your username" onChange={handleInput} />
                </fieldset>
                <fieldset className="w-100 flex flex-col mb-7">
                  <label htmlFor="password" className="w-100 text-slate-500 font-medium mb-1">Password</label>
                  <input id="password" type="password" name="password" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter your password" onChange={handleInput} />
                </fieldset>
                <fieldset className="w-100 flex flex-col mb-7">
                  <button type="submit" className="rounded-md bg-green-700/80 text-white p-2">Login</button>
                </fieldset>
              </form>
            </section>
            <section className="w-100 flex justify-center items-center">
              <p className="text-slate-400 font-medium">{"Don't have an account ?"}</p>
              <Link href="/register" className="ml-1 font-semibold text-green-700">Register</Link>
            </section>
          </section>
        </article>
      </main>
    </>
  )
}