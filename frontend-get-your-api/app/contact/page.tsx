"use client";
import { useState, FormEvent } from "react";

interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

type SubmitStatus = "" | "sending" | "success" | "error";

const ContactPage = () => {
	const [status, setStatus] = useState<SubmitStatus>("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("sending");

		// 1. Capture the data from the form fields using the 'name' attributes
		const formElement = e.target as HTMLFormElement;
		const formData: FormData = {
			name: (formElement.elements.namedItem("name") as HTMLInputElement).value,
			email: (formElement.elements.namedItem("email") as HTMLInputElement).value,
			subject: (formElement.elements.namedItem("subject") as HTMLInputElement).value,
			message: (formElement.elements.namedItem("message") as HTMLTextAreaElement).value,
		};

		try {
			// 2. Send the data to your separate backend
			const response = await fetch(
				`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				},
			);

			if (response.ok) {
				setStatus("success");
				(e.target as HTMLFormElement).reset(); // Clear the form on success
			} else {
				setStatus("error");
			}
		} catch (err) {
			console.error("Submission Error:", err);
			setStatus("error");
		}
	};

	return (
		<div className="w-full min-h-screen text-zinc-200 px-6 py-16 md:px-12">
			<div className="max-w-3xl mx-auto text-center mb-12">
				<h2 className="text-4xl md:text-5xl font-extrabold mb-4">
					Get in <span className="text-green-500">Touch</span>
				</h2>
			</div>

			<div className="max-w-2xl mx-auto">
				<form
					onSubmit={handleSubmit}
					className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl shadow-xl backdrop-blur-sm"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-zinc-400 ml-1">
								Name
							</label>
							<input
								name="name"
								type="text"
								required
								placeholder="John Doe"
								className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-all outline-none"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-zinc-400 ml-1">
								Email
							</label>
							<input
								name="email"
								type="email"
								required
								placeholder="dev@example.com"
								className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-all outline-none"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2 mb-6">
						<label className="text-sm font-medium text-zinc-400 ml-1">
							Subject
						</label>
						<input
							name="subject"
							type="text"
							required
							placeholder="API Suggestion"
							className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-all outline-none"
						/>
					</div>

					<div className="flex flex-col gap-2 mb-8">
						<label className="text-sm font-medium text-zinc-400 ml-1">
							Message
						</label>
						<textarea
							name="message"
							rows={5}
							required
							placeholder="Your message..."
							className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-all resize-none outline-none"
						/>
					</div>

					<button
						type="submit"
						disabled={status === "sending"}
						className="w-full bg-green-500 hover:bg-green-600 disabled:bg-zinc-700 text-black font-bold py-4 rounded-lg transition-colors duration-300 shadow-lg shadow-green-500/10"
					>
						{status === "sending" ? "Sending..." : "Send Message"}
					</button>

					{status === "success" && (
						<p className="text-green-500 text-center mt-4 font-medium">
							Message sent! I&apos;ll get back to you soon.
						</p>
					)}
					{status === "error" && (
						<p className="text-red-500 text-center mt-4 font-medium">
							Oops! Something went wrong. Please try again.
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default ContactPage;
