import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
const prisma = new PrismaClient()
async function main() {
    for (let n = 1; n < 101; n++) {
        await prisma.child.create({
            data: {
                name: faker.person.fullName()
                address: faker.location.county()+"," ,
                behaved: true
            }
        })
        await prisma.toy.create({
            data: {
                name : `Játék${n}`,
                material: "other",

            }
        })
    }
    }
    main()
    .catch(e => {
    throw e
    })