import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
const prisma = new PrismaClient()
async function main() {
    for (let n = 1; n < 101; n++) {
        const child = await prisma.child.create({
            data: {
                name: faker.person.fullName(),
                address: faker.location.county()+","+faker.location.streetAddress() ,
                behaved: faker.datatype.boolean()
            }
        })
        await prisma.toy.create({
            data: {
                name : faker.color.human()+" "+faker.animal.type(),
                material: "other",
                weight: faker.number.float({min:0,max:10,multipleOf:0.25})

            }
        })
        if (child.behaved) {
            await prisma.childrenToToys.create({
                data: {
                    child_id:child.id,
                    toy_id: faker.number.int({min:1,max:n})
                }
            })
        }

    }
    }
    main()
    .catch(e => {
    throw e
    })