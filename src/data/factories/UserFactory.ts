import EncryptionHelper from '@/helpers/encryption.helper';
import { define } from 'typeorm-seeding';
import User from '../entity/User';

define(User, (faker: Faker.FakerStatic, settings: { }) => {
    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const email = faker.internet.email(firstName, lastName)

    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
	user.email = email
	user.password = EncryptionHelper.encrypt(faker.random.word());
    return user
});
