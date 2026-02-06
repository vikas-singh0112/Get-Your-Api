import ApiSearch from "@/components/ApiSearch";

const DocsPage = () => {
 return (
     <div className={"flex w-full h-[calc(100vh-56px)] "}>
      <div className={"w-1/4 p-4  "}>
          <ApiSearch />
          <ul></ul>
      </div>
      <div className={"w-3/4 py-4"}>
          <div className={"border-2 overflow-y-auto  border-green-500/30 shadow-[0_0_30px_-12px_rgba(34,197,94,0.3)] w-full h-full rounded-2xl bg-zinc-900/50 "}>
            hey
          </div>
      </div>
     </div>
 )
}
export default DocsPage