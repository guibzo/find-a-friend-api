import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetService } from '../register-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetService

describe('Register pet service', () => {
	beforeEach(async () => {
		petsRepository = new InMemoryPetsRepository()
		orgsRepository = new InMemoryOrgsRepository()
		sut = new RegisterPetService(petsRepository)

		await orgsRepository.create({
			name: 'Example Org',
			email: 'contact@example.com',
			password_hash: await hash('123456', 6),
			address: 'Example Org Address',
			phone_number: '12000000000',
			id: 'new-org-id',
		})
	})

	it('should be able to create new pet', async () => {
		const { pet } = await sut.execute({
			ageInMonths: 38,
			city: 'Example City',
			energyLevel: 2,
			independencyLevel: 3,
			name: 'Example Pet',
			animal: 'Cachorro',
			animalSize: 2,
			requirements: ['Example Requirement 1', 'Example Requirement 2'],
			orgId: 'new-org-id',
		})

		expect(pet.id).toBeTypeOf('string')
		expect(pet.org_id).toBeTypeOf('string')
	})
})
