"use client";
import ApiCards from "@/components/ApiCards";
import ApiSearch from "@/components/ApiSearch";
import CodeBox from "@/components/CodeBox";
import CustomButton from "@/components/CustomButton";
import { api } from "@/data/data";
import { useState } from "react";

export interface Route {
	name: string;
	route: string;
	usage: string;
	method: string;
}

interface ApiCategory {
	api: string;
	routes: Route[];
	data: Record<string, any>;
}

const DocsPage = () => {
	const [apiData, setApidata] = useState<ApiCategory>(api[0]);
	const [activeCodeIndex, setActiveCodeIndex] = useState<number | null>(null);
	return (
		<div className={"flex w-full h-[calc(100vh-56px)] "}>
			<div className={"w-1/5 p-4  "}>
				<ApiSearch />
				<ul className="flex flex-col gap-1 mt-4">
					{api.map((data, index) => {
						const isActive = apiData.api === data.api;

						return (
							<li
								key={index}
								onClick={() => setApidata(data)}
								className={`
                    group relative flex items-center px-3 py-2 cursor-pointer rounded-md transition-all duration-200
                     ${
												isActive
													? "bg-green-500/10 text-green-400"
													: "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
											}
                `}
							>
								{/* Active Indicator Bar */}
								{isActive && (
									<div className="absolute left-0 w-1 h-5 bg-green-500 rounded-full" />
								)}

								<span
									className={`
                    ml-3 text-sm font-medium capitalize transition-transform duration-200
                    ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}
                `}
								>
									{data.api}
								</span>

								{/* Optional: Show route count badge */}
								<span
									className={`
                    ml-auto text-[10px] px-1.5 py-0.5 rounded border
                    ${
											isActive
												? "border-green-500/30 text-green-500"
												: "border-zinc-700 text-zinc-600 group-hover:border-zinc-600"
										}
                `}
								>
									{data.routes.length}
								</span>
							</li>
						);
					})}
				</ul>
			</div>
			<div className={"w-4/5 py-4"}>
				<div
					className={
						"border overflow-y-auto  border-green-500/30 shadow-[0_0_30px_-12px_rgba(34,197,94,0.3)] w-full h-full rounded-2xl bg-zinc-900/50 p-4 "
					}
				>
					<div className="w-full">
						<p className="text-3xl"># Usage</p>
						<p className="capitalize my-4 text-2xl">{apiData.api} Endpoints</p>
						<div className="flex flex-col gap-6">
							{apiData.routes &&
								apiData.routes.map((data, index) => {
									const isCodeOpen = activeCodeIndex === index;

									return (
										<ApiCards
											key={data.name + index}
											index={index}
											data={data}
											isCodeOpen={isCodeOpen}
											setActiveCodeIndex={setActiveCodeIndex}
											apiData={apiData}
										/>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default DocsPage;
