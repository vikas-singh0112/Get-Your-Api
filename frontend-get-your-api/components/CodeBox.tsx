interface CodeBoxProps {
	data: {
		name: string;
		route: string;
	};
	apiData: {
		data: any;
	};
}


const CodeBox = ({ data, apiData }: CodeBoxProps) => {
	return (
		<div className=" relative group/code mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
			<div className="absolute -top-3 left-3 px-2 py-0.5 bg-zinc-900 border border-zinc-700 rounded text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
				Request Body
			</div>
			<div className="rounded-lg border border-zinc-800 bg-black/40 overflow-hidden">
				<div className="flex items-center justify-between px-4 py-2 bg-zinc-800/30 border-b border-zinc-800">
					<span className="text-[10px] text-zinc-500 font-mono">
						application/json
					</span>
					<button
						onClick={() =>
							navigator.clipboard.writeText(JSON.stringify(apiData.data))
						}
						className="text-[10px] text-zinc-400 hover:text-green-400 transition-colors cursor-pointer"
					>
						Copy JSON
					</button>
				</div>
				<pre className="p-4 font-mono text-xs text-blue-300/90 overflow-x-auto leading-relaxed">
					{/* {JSON.stringify(apiData.data, null, 2)} */}
					{`async function ${data.name.replace(/\s+|_/g, "")} () { \n try {\n// 1. Fetch the data \n....const response = await fetch("${process.env.NEXT_PUBLIC_BACKEND_URL}${data.route}");\n \n// 2. Parse the JSON \n....const result = await response.json(); \n \n// 3. Use the data \n....console.log(result); \n \n....return result; \n \n} catch (error) {\n \n....console.error("Fetch error:", error); \n\n}} \n\n ${data.name.replace(/\s+|_/g, "")}()`}
				</pre>
			</div>
		</div>
	);
};

export default CodeBox;
