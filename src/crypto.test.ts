import { Blob } from 'buffer';

import { decrypt, encrypt } from './crypto';

const key = 'abcdefghijklmnopqrstuvwxyz123456';
const wrongKey = 'abcde';
const phrase = 'gustavo roubou pao na casa do joao';

describe('deve realizar rotinas de criptografia e descriptografia', () => {
	let encrypted: string;

	it('deve criptografar uma string', () => {
		encrypted = encrypt(phrase, key);

		expect(encrypted).toBeDefined();
		expect(encrypted).toContain(':');
		expect(phrase).not.toEqual(encrypted);
	});

	it('deve descriptografar uma string', () => {
		const decrypted = decrypt(encrypted, key);

		expect(decrypted).toBeDefined();
		expect(decrypted).not.toContain(':');
		expect(decrypted).toStrictEqual(phrase);
	});
});

describe('deve retornar erros se o formato da Key estiver errado ou não for a mesma', () => {
	const encrypted =
		'17a4c8658fd1f3501c9cd57056c51fab:8ae1c33995ef37fbd443aa2d206ce6676c30db1443093c422e5f3f16443b4523f3cccc809870ba7e21a16e8d30ff4274';

	it('deve lançar exceção caso o formato da Key esteja incorreto', () => {
		expect(() => {
			encrypt(phrase, wrongKey);
		}).toThrow(Error);
	});

	expect(() => {
		decrypt(encrypted, wrongKey);
	}).toThrowError();

	it('deve lançar exceção caso a Key não seja original ,pois não ira descriptografar', () => {
		const unofficialKey = '1234567890abcdefghijklmnopqrstuv';

		expect(() => {
			decrypt(encrypted, unofficialKey);
		}).toThrowError();
	});
});

it('deve retornar a mensagem do erro', () => {
	const key = 'qualquer coisa pra testar abcdefç';
	// const length = Buffer.byteLength(key, 'utf8');
	const b = new Blob([key]);
	try {
		decrypt(encrypt('alguma coisa', key), key);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		expect(error.message).toEqual(
			`key for encryption/decryption is with the wrong size: ${b.size}`
		);
	}
});
