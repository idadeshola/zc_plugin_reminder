import axios from 'axios'

import env from '@config/environment'

const { getDevBaseUrl, ORG_ID, PLUGIN_ID, REMINDER_COLLECTION } = env

export default function makeDb() {
	// functions go here
	const BASE_URL = `${getDevBaseUrl()}/data`
	const readBaseUrl = `${BASE_URL}/read`
	const writeBaseUrl = `${BASE_URL}/write`

	async function findAll(collectionName) {
		/**
		 * sample of details used
		 * PLUGIN_ID zc_reminder
		 * ORG_ID darwin_organization
		 */
		const data = await axios.get(
			`${readBaseUrl}/${PLUGIN_ID}/${collectionName}/${ORG_ID}`
		)

		return data
	}

	async function update({ id, ...params }) {
		try {
			const res = await axios({
				method: 'put',
				url: `${getDevBaseUrl()}/data/write`,
				data: {
					plugin_id: PLUGIN_ID,
					organization_id: ORG_ID,
					collection_name: REMINDER_COLLECTION,
					filter: {
						object_id: id,
					},
					payload: { ...params },
				},
			})
			const data = res.data.data.modified_documents > 0
			return data
		} catch (error) {
			console.log(error)
		}
	}

	return Object.freeze({ findAll, update })
}
