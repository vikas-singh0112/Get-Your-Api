import { Resend } from "resend";
import { ApiResponse } from "../utils/response";
import { ApiError } from "../utils/ApiError";

interface IContactBody {
	name: string;
	email: string;
	subject: string;
	message: string;
}
export const contact = async (body: IContactBody) => {
	console.log(body);
	const { name, email, subject, message } = body;
	try {
		const resend = new Resend(process.env.RESEND_API_KEY);
		const data = await resend.emails.send({
			from: email,
			to: "vikki12630@gmail.com",
			subject: `New Message: ${subject}`,
			html: `
        <div style="background-color: #09090b; color: #ffffff; padding: 20px; font-family: sans-serif;">
          <h1 style="color: #22c55e;">New Contact Inquiry</h1>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background: #18181b; padding: 15px; border-radius: 8px; border: 1px solid #27272a;">
            <p>${message}</p>
          </div>
        </div>
      `,
		});

		const response = ApiResponse({
			data: data,
			message: "Message sent successfully",
			statusCode: 200,
		});
		return response;
	} catch (error) {
		throw new ApiError(500, "unable to send message");
	}
};
