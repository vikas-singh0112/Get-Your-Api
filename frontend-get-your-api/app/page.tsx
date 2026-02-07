import WhatWeOfferCard from "@/components/WhatWeOfferCard";
import {SignedIn, SignedOut, SignUpButton,} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col  text-white">
      <section className="w-full flex h-[calc(100vh-60px)] px-10 items-center">
        <div className="w-1/2 flex flex-col justify-center gap-6">
          <h1 className="text-6xl font-bold leading-tight">
            Instant <span className="text-green-500">APIs.</span> <br/>
            Free forever. <br/>
            <span className="text-blue-500"> Create,</span> Test & Build
          </h1>
          <h2 className="text-xl text-zinc-400 max-w-lg">
            Access 30+ <span className="text-green-500 font-medium">free API</span> endpoints and
            <span className="text-blue-500 font-medium"> Build</span> apps faster with flexible data.
          </h2>
          <div className="flex gap-6 mt-4">
            <SignedOut>
              <SignUpButton>
                <button
                  className="bg-green-500 rounded-md font-medium  w-32 h-10 cursor-pointer hover:bg-green-400 text-md ">
                  Sign Up
                </button>
              </SignUpButton>
              <Link href={"/docs"}>
                <button
                  className="border-2 border-blue-500 rounded-md font-medium  w-32 h-10 cursor-pointer hover:bg-zinc-800 text-md ">
                  Get Started
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href={"/dashboard"}>
                <button
                  className="bg-green-500 rounded-md font-medium  w-32 h-10 cursor-pointer hover:bg-green-400 text-md ">
                  Dashboard
                </button>
              </Link>
              <Link href={"/docs"}>
                <button
                  className="border-2 border-blue-500 rounded-md font-medium  w-32 h-10 cursor-pointer hover:bg-zinc-800 text-md ">
                  Docs
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
        
        <div className="w-1/2 p-6">
          <div
            className="border-2 border-green-500/30 shadow-[0_0_50px_-12px_rgba(34,197,94,0.3)] w-full h-96 rounded-2xl bg-zinc-900/50"></div>
        </div>
      </section>
      
      {/* WHAT WE OFFER SECTION */}
      <section className="w-full bg-zinc-900/50  py-20 px-10 rounded-2xl">
        <div className="w-full text-center mb-10">
          <h3 className="text-4xl ">What We <span
            className="underline decoration-green-500 underline-offset-8">Offer</span></h3>
          <p className="text-zinc-500 mt-2 text-xl">Everything you need to prototype your next big idea.</p>
        </div>
        
        <div className=" mx-auto">
          {/* Changed gap and grid-style feel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <WhatWeOfferCard title="Free public APIs: users, posts, comments." imgSrc="/api.jpg"/>
            <WhatWeOfferCard title="Authenticated users: create, update, delete." imgSrc="/authenticate.jpg"/>
            <WhatWeOfferCard title="Persistence: data stays for 24 hours." imgSrc="/24hours.jpg"/>
            <WhatWeOfferCard title="Upgrade for higher limits & retention." imgSrc="/upgrade.jpg"/>
          </div>
        </div>
      </section>
    </div>
  );
}
