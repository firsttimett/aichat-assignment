import axios from "axios";

const run = async () => {
	const getEligibility = async (customerId: string) => {
		const result = await axios.get("http://localhost:3000/voucher/eligibility", {
			headers: {
				"customer_id": customerId
			}
		});
		return result.data;
	}

	const customerIds = ["8306830199435353088", "7710505332797765632", "5317241710145026048", "63166697509586808"];
	const results = await Promise.all(customerIds.map((id) => getEligibility(id)));
	
	console.log(">>> results", results);
}

run();
