import Link from "next/link";
import CustomButton from "@/components/CustomButton";

 const Navbar = () => {
    return (
        <nav className="w-full h-14 flex justify-between 3 items-center border-b border-green-500">
            <div>
                <h1 className="text-2xl font-semibold text-green-500
                ">GetYourApi</h1>
            </div>
            <div className="flex gap-8 items-center">
                <Link href={"/"} >Home</Link>
                <Link href={"/docs"} >Docs</Link>
                <Link href={"/about"} >About</Link>
                <Link href={"/contact"} >Contact</Link>
                <CustomButton btnType={"primary"}  title={"Login"} />
            </div>

            
        </nav>
    )
}

export  default  Navbar