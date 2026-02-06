import {LucideIcon} from "lucide-react";

type CustomButtonProps = {
    className?: string,
    title: string,
    btnType?: string,
    Icon?: LucideIcon,
}
 const CustomButton = ({title, className, btnType, Icon}:CustomButtonProps) => {
    return (
        <div className={` flex justify-center items-center px-3 py-1.5 rounded-lg cursor-pointer hover:scale-95 transition-transform duration-300 ease-in-out ${ btnType === "primary" ? "bg-green-500 text-black border-2 border-green-500" : btnType=== "secondary"? "bg-none border-2 border-blue-500":"bg-red-500"} } ${className}`}>{title}{Icon && <Icon size={16} />}</div>
    )
}

export default CustomButton;