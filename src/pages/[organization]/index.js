import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { login } from '@/models/Auth'
import checkAuth from '@/components/hoc/checkAuth'
import Logo from '@/components/molecules/Logo'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const router = useRouter();
  const { organization } = router.query;
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });

  const handleLogin = async(e) => {
    e.preventDefault();
    if (!userCredentials.username.length || !userCredentials.password.length) {
      return;
    }
    return login({ ...userCredentials, organization })
      .then(() => router.push(`/${organization}/network`))
      .catch(error => console.log(error))
  }

  const handleInput = (e) => setUserCredentials(prev => ({
    ...prev,
    [e.target.name]: e.target.value.trim()
  }));

  return (
    <>
      <Head>
        <title>FELE Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <article className="h-full w-full flex justify-center items-center">
          <section className="h-auto flex flex-col w-[370px] text-sm">
            <section className="w-100 mb-8">
              <Logo organization={organization} height={100} width={350} />
            </section>
            <section className="w-100 mb-8">
              <p className="text-2xl font-bold">Login</p>
              <p className="text-base text-slate-400">Login to your account now</p>
            </section>
            <section className="w-100">
              <form onSubmit={handleLogin} className="w-100">
                <fieldset className="w-100 flex flex-col mb-7">
                  <label htmlFor="username" className="w-100 text-slate-500 font-medium mb-1">Username</label>
                  <input id="username" type="text" name="username" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter your username" onChange={handleInput} />
                </fieldset>
                <fieldset className="w-100 flex flex-col mb-7">
                  <label htmlFor="password" className="w-100 text-slate-500 font-medium mb-1">Password</label>
                  <input id="password" type="password" name="password" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter your password" onChange={handleInput} />
                </fieldset>
                {/* <fieldset className="w-100 flex flex-col mb-7">
                  <label htmlFor="organization" className="w-100 text-slate-500 font-medium mb-1">Organization</label>
                  <input id="organization" type="text" name="organization" required className="w-100 border-2 border-slate-200 rounded-lg p-2" placeholder="Enter your organization" onChange={handleInput} />
                </fieldset> */}
                <fieldset className="w-100 flex flex-col mb-7">
                  <button type="submit" className="rounded-md bg-green-700/80 text-white p-2">Login</button>
                </fieldset>
              </form>
            </section>
          </section>
        </article>
      </main>
    </>
  )
}

export default checkAuth(Home);
