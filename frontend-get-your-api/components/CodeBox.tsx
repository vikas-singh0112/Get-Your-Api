interface CodeBoxProps {
	data: {
		name: string;
		privateRoute?: string;
		globalRoute: string;
	};
	route: string;
	apiData: {
		data: any;
	};
}

const CodeBox = ({ data, apiData, route }: CodeBoxProps) => {
	console.log(data.name);

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
					{data.name.split(" ")[0] === "create" &&
						`Required feilds:-\n const createData = ${JSON.stringify(apiData.data, null, 2)}`}
					{/* {route === data.globalRoute &&
						`\n\n async function ${data.name.replace(/\s+|_/g, "")} () { \n....try {\n \n........const response = await fetch("${process.env.NEXT_PUBLIC_BACKEND_URL}${route}"${route});\n \n// Parse the JSON \n........const result = await response.json(); \n \n........console.log(result); \n \n........return result; \n \n....} catch (error) {\n \n........console.error("Fetch error:", error); \n\n}} \n\n ${data.name.replace(/\s+|_/g, "")}()`} */}

					{/* {route === data.privateRoute &&
						`\n\n async function ${data.name.replace(/\s+|_/g, "")} () { \n....try {\n \n........const response = await fetch("${process.env.NEXT_PUBLIC_BACKEND_URL}${route}", {\n........method: "GET",\n........headers: {\n............"authorization": Secret,  //signin &copy access token from dashboard &\n                                      replace Secret with copied access token\n           },\n ${data.name.split(" ")[0] === 'create' ? 'body:': ''} );\n \n// Parse the JSON \n........const result = await response.json(); \n \n........console.log(result); \n \n........return result; \n \n....} catch (error) {\n \n........console.error("Fetch error:", error); \n\n}} \n\n ${data.name.replace(/\s+|_/g, "")}()`} */}
					{`\n\n async function ${data.name.replace(/\s+|_/g, "")} () { \n    try {\n        const response = await fetch("${process.env.NEXT_PUBLIC_BACKEND_URL}${route}"${(route === data.globalRoute && data.name.split(" ")[0] === "create") || route === data.privateRoute ? `, {\n            method: "GET",\n            headers: {\n                "authorization": Secret,  //signin &copy access token from dashboard & replace Secret with copied access token\n            },\n ${data.name.split(" ")[0] === "create" ? "           body: createData\n        }":""}` : ``}); \n        const result = await response.json(); \n        console.log(result); \n        return result; \n    } catch (error) {\n        console.error("Fetch error:", error); \n}} \n\n ${data.name.replace(/\s+|_/g, "")}()`}
				</pre>
			</div>
		</div>
	);
};

export default CodeBox;
