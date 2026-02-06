import CodeBox from "./CodeBox";
import { Route } from "@/app/docs/page";
interface ApiCardsProps {
	index: number;
	data: Route;
	apiData: any; // Needed for the CodeBox
	isCodeOpen: boolean;
	setActiveCodeIndex: (index: number | null) => void;
}

const ApiCards = ({
	index,
	data,
	apiData,
	isCodeOpen,
	setActiveCodeIndex,
}: ApiCardsProps) => {
	return (
		<div
			key={index}
			className="group w-full bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 hover:border-green-500/50 transition-all duration-300"
		>
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				{/* Left Side: Info */}
				<div className="flex-1 space-y-3">
					<div className="flex items-center gap-3">
						<span
							className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
								data.method === "GET"
									? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
									: "bg-green-500/10 text-green-400"
							}`}
						>
							{data.method}
						</span>
						<h3 className="text-lg font-semibold text-zinc-100 capitalize tracking-tight">
							{data.name.replace(/_/g, " ")}
						</h3>
					</div>

					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-2 bg-black/50 self-start px-3 py-1.5 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-colors">
							<span className="text-zinc-500 text-xs font-mono">Endpoint:</span>
							<code className="text-green-400 font-mono text-sm">
								{process.env.NEXT_PUBLIC_BACKEND_URL}
								{data.route}
							</code>
						</div>
						<div className="flex items-start gap-2 text-zinc-400">
							<span className="text-green-500 font-bold">—</span>
							<p className="text-sm italic leading-relaxed">{data.usage}</p>
						</div>
					</div>
				</div>

				{/* Right Side: Actions */}
				<div className="flex items-center gap-3 self-end md:self-center">
					<button
						onClick={() => setActiveCodeIndex(isCodeOpen ? null : index)}
						className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-md border cursor-pointer
            ${
							isCodeOpen
								? "bg-green-500/10 border-green-500/50 text-green-400"
								: "bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:text-zinc-200"
						}`}
					>
						{isCodeOpen ? "Hide Code" : "See Code"}
					</button>
					<button
						onClick={() =>
							navigator.clipboard.writeText(
								`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.route}`,
							)
						}
						className="px-4 py-1.5 text-sm font-medium bg-green-600 hover:bg-green-500 text-white transition-all rounded-md shadow-lg shadow-green-900/20 cursor-pointer"
					>
						Copy
					</button>
				</div>
			</div>
			{isCodeOpen && <CodeBox data={data} apiData={apiData} />}
		</div>
	);
};

export default ApiCards;
