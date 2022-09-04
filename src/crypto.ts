import { Blob } from 'buffer';
import crypto from 'crypto';
import { TransformOptions } from 'stream';

// export const KEY = 'why are you reading this';
const KEY_LENGTH = 32;

const verifyKeyLength = (key: string) => {
	const b = new Blob([key]);
	if (b.size !== KEY_LENGTH) {
		throw new Error(
			`key for encryption/decryption is with the wrong size: ${b.size}`
		);
	}
};

export const encrypt = (text: string, key: string, opts?: TransformOptions) => {
	verifyKeyLength(key);

	// Initial Vector = RandomBytes necessários para iniciar a função
	const iv = crypto.randomBytes(16);

	// Criptografia
	const cipher = crypto.createCipheriv(
		'aes-256-cbc',
		Buffer.from(key),
		iv,
		opts
	);

	// Transforma o text em array de bytes criptografados
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);

	// Retorna o IV + Texto criptografado em Hexadecimal
	return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (text: string, key: string, opts?: TransformOptions) => {
	verifyKeyLength(key);

	// Recupera o IV + Texto criptografados em Hexadecimal
	// E Transforma eles em array de bytes
	const split = text.split(':');
	const iv = Buffer.from(split[0], 'hex');
	const data = Buffer.from(split[1], 'hex');

	// Transforma a palavra chave em array de bytes necessário
	const _key = Buffer.from(key);

	// Descriptografia
	const decipher = crypto.createDecipheriv('aes-256-cbc', _key, iv, opts);

	// Descriptografa
	let decrypted = decipher.update(data);
	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
};
