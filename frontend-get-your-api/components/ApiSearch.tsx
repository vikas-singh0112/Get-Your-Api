import { Search } from "lucide-react";

const ApiSearch = () => {
	return (
		<div className="relative w-full group mb-6">
			<div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-green-500 transition-colors">
				<Search size={18} strokeWidth={2.5} />
			</div>

			<label className="sr-only" htmlFor="api_search">
				Search API
			</label>

			<input
				type="text"
				id="api_search"
				name="api_search"
				placeholder="Search endpoints..."
				className={`
                    w-full pl-11 pr-4 py-2.5
                    bg-zinc-900/50 text-zinc-200
                    rounded-xl border border-zinc-800
                    placeholder:text-zinc-500
                    outline-none transition-all duration-300
                    focus:border-green-500/50 
                    focus:ring-4 focus:ring-green-500/10
                    group-hover:border-zinc-700
                `}
			/>

			
		</div>
	);
};
export default ApiSearch;
