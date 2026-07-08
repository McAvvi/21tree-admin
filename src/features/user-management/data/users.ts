import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(12345)

export const userProfiles = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const tier = faker.helpers.arrayElement(['free', 'pro', 'admin'] as const)
  const status = faker.helpers.arrayElement([
    'active',
    'inactive',
    'suspended',
    'banned',
  ] as const)

  // Generate dates for AI usage period
  const periodEnd = faker.date.recent()
  const periodStart = faker.date.past({ refDate: periodEnd, years: 1 })

  return {
    id: faker.string.uuid(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    name: `${firstName} ${lastName}`,
    avatar: Math.random() > 0.1 ? faker.image.avatar() : null,
    tier,
    status,
    creditBalance: faker.number.int({ min: 0, max: 10000 }),
    folderCount: faker.number.int({ min: 0, max: 100 }),
    flashcardCount: faker.number.int({ min: 0, max: 5000 }),
    srsState: {
      dueCount: faker.number.int({ min: 0, max: 500 }),
      totalCards: faker.number.int({ min: 0, max: 5000 }),
      lastResetAt: Math.random() > 0.1 ? faker.date.past() : null,
    },
    aiUsage: {
      tokensUsed: faker.number.int({ min: 0, max: 100000 }),
      cost: parseFloat(faker.commerce.price({ min: 0, max: 100 })),
      periodStart,
      periodEnd,
    },
    signupDate: faker.date.past({ years: 2 }),
    lastLogin: Math.random() > 0.1 ? faker.date.recent() : null,
    lastActive: Math.random() > 0.1 ? faker.date.recent() : null,
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent(),
  }
})

export const creditLedger = Array.from({ length: 1000 }, () => {
  const type = faker.helpers.arrayElement(['grant', 'revoke', 'usage'] as const)
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    amount:
      type === 'usage'
        ? -faker.number.int({ min: 1, max: 100 })
        : faker.number.int({ min: 10, max: 500 }),
    balanceAfter: faker.number.int({ min: 0, max: 10000 }),
    reason: faker.lorem.sentence(),
    type,
    createdAt: faker.date.recent(),
    createdBy: type === 'usage' ? null : faker.person.fullName(),
  }
})

// import { faker } from '@faker-js/faker'

// // Set a fixed seed for consistent data generation
// faker.seed(12345)

// export const userProfiles = Array.from({ length: 500 }, () => {
//   const firstName = faker.person.firstName()
//   const lastName = faker.person.lastName()
//   const tier = faker.helpers.arrayElement(['free', 'pro', 'admin'] as const)
//   const status = faker.helpers.arrayElement([
//     'active',
//     'inactive',
//     'suspended',
//     'banned',
//   ] as const)

//   return {
//     id: faker.string.uuid(),
//     email: faker.internet.email({ firstName }).toLocaleLowerCase(),
//     name: `${firstName} ${lastName}`,
//     avatar: faker.image.avatar(),
//     tier,
//     status,
//     creditBalance: faker.number.int({ min: 0, max: 10000 }),
//     folderCount: faker.number.int({ min: 0, max: 100 }),
//     flashcardCount: faker.number.int({ min: 0, max: 5000 }),
//     srsState: {
//       dueCount: faker.number.int({ min: 0, max: 500 }),
//       totalCards: faker.number.int({ min: 0, max: 5000 }),
//       lastResetAt: faker.date.past(),
//     },
//     aiUsage: {
//       tokensUsed: faker.number.int({ min: 0, max: 100000 }),
//       cost: parseFloat(faker.commerce.price({ min: 0, max: 100 })),
//       period: faker.date.month(),
//     },
//     signupDate: faker.date.past({ years: 2 }),
//     lastLogin: faker.date.recent(),
//     lastActive: faker.date.recent(),
//     createdAt: faker.date.past({ years: 2 }),
//     updatedAt: faker.date.recent(),
//   }
// })

// export const creditLedger = Array.from({ length: 1000 }, () => {
//   const type = faker.helpers.arrayElement(['grant', 'revoke', 'usage'] as const)
//   return {
//     id: faker.string.uuid(),
//     userId: faker.string.uuid(),
//     amount:
//       type === 'usage'
//         ? -faker.number.int({ min: 1, max: 100 })
//         : faker.number.int({ min: 10, max: 500 }),
//     balanceAfter: faker.number.int({ min: 0, max: 10000 }),
//     reason: faker.lorem.sentence(),
//     type,
//     createdAt: faker.date.recent(),
//     createdBy: type === 'usage' ? null : faker.person.fullName(),
//   }
// })
