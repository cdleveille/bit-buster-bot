import axios from "axios";

export class Dictionary {
	private static readonly base = "https://api.dictionaryapi.dev/api/v2/entries/en";

	private static readonly client = axios.create({
		baseURL: Dictionary.base
	});

	public static async LookUpWord(word: string): Promise<any> {
		try {
			return await Dictionary.client.get(word);
		} catch (e) {
			throw `Unknown word: '${word}'`;
		}
	}
}