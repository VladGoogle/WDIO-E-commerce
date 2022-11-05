import { faker } from '@faker-js/faker';

export let randomName = faker.name.firstName()
export let randomSurname = faker.name.lastName()
export let randomEmail = faker.internet.email()
export const randomInvalidEmail = faker.name.firstName()+'@'+faker.name.lastName()
export let randomPassword = faker.internet.password(30,false, /[a-zA-Z0-9]/)
export let randomNewPassword = faker.internet.password(30,false, /[a-zA-Z0-9]/)
export const randomConfirmPassword = faker.internet.password(20,false, /[a-zA-Z0-9]/)
export const randomMinInvalidPassword = faker.internet.password(7)
export const randomMinClassesInvalidPassword = faker.internet.password(8, false, /[A-Z0-9]/)
export const randomMediumPassword = faker.internet.password(8, false, /[a-zA-Z0-9]/)
export const randomStrongPassword = faker.internet.password(9, false, /[a-zA-Z0-9]/)
export const randomStrongestPassword = faker.internet.password(11, false, /[a-zA-Z0-9]/)
export const randomText = faker.lorem.sentence()