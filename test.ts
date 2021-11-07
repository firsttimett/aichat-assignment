import axios from "axios";

const run = async () => {
	const getEligibility1 = async () => {
		const result = await axios.get("http://localhost:3000/voucher/eligibility", {
			headers: {
				"customer_id": "8306830199435353088"
			}
		});
		return result.data;
	}

	const getEligibility2 = async () => {
		const result = await axios.get("http://localhost:3000/voucher/eligibility", {
			headers: {
				"customer_id": "7710505332797765632"
			}
		});
		return result.data;
	}
	const getEligibility3 = async () => {
		const result = await axios.get("http://localhost:3000/voucher/eligibility", {
			headers: {
				"customer_id": "5317241710145026048"
			}
		});
		return result.data;
	}
	const getEligibility4 = async () => {
		const result = await axios.get("http://localhost:3000/voucher/eligibility", {
			headers: {
				"customer_id": "63166697509586808"
			}
		});
		return result.data;
	}

	const results = await Promise.all([getEligibility1(), getEligibility2(), getEligibility3(), getEligibility4()]);
	console.log(">>> results", results);
}

run();
