import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import User from '../entity/User';
import EncryptionHelper from '@/helpers/encryption.helper';

export default class UserSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

		// Ad-hoc default user entry
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([{
                firstName: 'Brandon',
                lastName: 'Wiemann',
                email: 'wiemannbj27@gmail.com',
                password: EncryptionHelper.encrypt(process.env.DEFAULT_PASSWORD)
			}]).execute()

		// Factory
		await factory(User)().seedMany(50);
    }
};
