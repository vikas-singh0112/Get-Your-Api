type ApiResponse<T> = {
	success: boolean;
	message: string;
	data: T;
	timestamp: string;
    statusCode: number;
};

type ApiResponseInput<T> = {
	data: T;
	message?: string;
    statusCode: number;
};

export const ApiResponse = <T>({
	data,
	message = "Success",
    statusCode
}: ApiResponseInput<T>): ApiResponse<T> => {
	return {
		success: true,
        statusCode,
		message,
		timestamp: new Date().toISOString(),
		data,
	};
};
