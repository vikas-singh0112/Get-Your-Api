"use client"
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()
  
  const activeStyle = (path: string) =>
    pathname === path
      ? "text-green-500"
      : "text-gray-300 hover:text-white transition-colors";
  return (
    <nav className="w-full h-14 flex justify-between 3 items-center border-b border-green-500">
      <div>
        <h1 className="text-2xl font-semibold text-green-500">GetYourApi</h1>
      </div>
      <div className="flex gap-8 items-center">
        <Link href={"/"} className={activeStyle("/")}>Home</Link>
        <Link href={"/docs"} className={activeStyle("/docs")}>Docs</Link>
        <Link href={"/about"} className={activeStyle("/about")}>About</Link>
        <Link href={"/contact"} className={activeStyle("/contact")}>Contact</Link>
        <SignedOut>
          <SignInButton>
            <button
              className="bg-green-500 rounded-md font-medium text-sm px-4 py-1.5 cursor-pointer">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href={"/dashboard"} className={activeStyle("/dashboard")}>Dashboard</Link>
          <UserButton/>
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar