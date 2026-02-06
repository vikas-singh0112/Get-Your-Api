import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import { ArrowUpRight} from "lucide-react";

type WhatWeOfferCardProps = {
    title: string,
    imgSrc: string
}
const WhatWeOfferCard = ({title, imgSrc}: WhatWeOfferCardProps) => {
 return (
     <div className={"w-1/4 rounded-xl p-2 flex flex-col bg-zinc-800/90"}>
        <div className={"relative w-full h-40"}>
            <Image  alt={title} src={imgSrc}
                    fill
            className={"rounded-xl"}/>
        </div>
        <div className={"flex-1"}>
            <p className={"mt-4"}>{title}</p>
        </div>
         <div className={"flex justify-between mt-4 gap-4"}>

             <CustomButton title={"Docs"} btnType={"primary"} className={"w-full hover:scale-98 "}
             Icon={ArrowUpRight}
             />
         </div>
     </div>
 )
}

export  default  WhatWeOfferCard