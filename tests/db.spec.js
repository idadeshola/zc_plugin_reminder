import { expect } from 'chai'
import makeDb from '../src/db/index'

describe('Db Controller', () => {
	it.skip('updates a document by id', async () => {
		const db = makeDb()
		const result = await db.update({
			id: '6131e01b1ad71bc9493e5be3',
			description: 'hope-it-works',
		})
		expect(result).to.be.equal(1)
	})
})
