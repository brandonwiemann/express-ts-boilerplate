import bcrypt from 'bcrypt';
import crypto from 'crypto-js';

export default class EncryptionHelper {

    /**
     * Encrypts a string value using AES
     * @param value String to encrypt
     * @param key Encryption key
     */
    static encrypt(value: string, key?: string): string {
        key = key ?? process.env.AES_KEY;
        if(!key) throw 'Encryption key is not defined';
        return crypto.AES.encrypt(value, key).toString();
    }

    /**
     * Decrypts a string value using AES
     * @param value String to encrypt
     * @param key Encryption key
     */
    static decrypt(encryptedData, key?: string): string {
        key = key ?? process.env.AES_KEY;
        if(!key) throw 'Encryption key is not defined';
        return crypto.AES.decrypt(encryptedData, key).toString(crypto.enc.Utf8);
    }

    /**
     * Hashes a string value using
     * @param value String to hash
     */
    static async hash(str): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(str, salt);
    }

    /**
     * Compares a raw string to a hash
     * @param value Raw (unhashed) sring
     * @param valueHashed Hashed string to compare
     */
    static async compareHash(value: string, valueHashed: string): Promise<boolean> {
        return await bcrypt.compare(value, valueHashed);
    }

}