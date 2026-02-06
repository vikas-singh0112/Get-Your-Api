const ApiSearch = () => {
    return(
        <div className={"w-full h-12 "}>
            <label className={"sr-only"} htmlFor={"api_search"}>Search</label>
            <input type={"text"} id={"api_search"} name={"api_search"} placeholder={"Search"}  className={"outline-none w-full px-4 py-2 rounded-full border-2 border-slate-400 transition-all focus:border-green-500/30 placeholder:text-slate-400"}/>
        </div>
    )
}
export default ApiSearch;