import { faker } from '@faker-js/faker';

export const emailForLogin = 'vladittrello@gmail.com'
export const passwordForLogin = 'Asdrtyjklmnb1@'
export const randomEmail = faker.internet.email()
export const randomInvalidEmail = faker.name.firstName()+'@'+faker.name.lastName()
export const randomPassword = faker.internet.password(20,false, /[a-zA-Z0-9]/)
export const randomInvalidPassword = faker.internet.password(7,false, /[a-zA-Z]/)
