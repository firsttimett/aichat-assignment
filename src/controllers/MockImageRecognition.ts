import { StatusCodes } from "http-status-codes";
import { Controller, Example, Post, Route, SuccessResponse, Tags } from "tsoa";

@Route("mocks")
@Tags("Mock Image Recognition API")
export class MockImageRecognition extends Controller {
	constructor() {
		super();
	}

	/**
	 * @summary Just a mock API to simulate success photo validation
	 */
	@SuccessResponse(StatusCodes.OK)
	@Example({ isValid: true })
	@Post("photo/validity")
	public async getPhotoValidity() {
		return { isValid: false };
	}
}
