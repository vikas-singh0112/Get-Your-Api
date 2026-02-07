"use client"
const SessionCopyBtn = () => {
	const copyBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const token = await window.Clerk.session.getToken({
			template: "developer_token",
		});
		console.log(token);
		navigator.clipboard.writeText(token);
	};

	return (
		<button
			onClick={copyBtn}
			className="bg-green-500 rounded-md font-medium  w-32 h-10 cursor-pointer hover:bg-green-400 text-md "
		>
			Copy Token
		</button>
	);
};

export default SessionCopyBtn;
