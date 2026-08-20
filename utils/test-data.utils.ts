import { faker } from '@faker-js/faker';

export function generateUniqueEmail(prefix: string = 'test', domain: string = '@mailinator.com'): string {
    const uniqueId = faker.number.int({ min: 10000, max: 999999 });
    return `${prefix}${uniqueId}${domain}`;
}