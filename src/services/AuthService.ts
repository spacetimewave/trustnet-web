import {
	generateKeyPair,
	SignJWT,
	importPKCS8,
	exportJWK,
	JWK,
	importJWK,
} from 'jose'

const ALGORITHM = 'RS256'

export interface IKeyPair {
	publicKey: string
	privateKey: string
}

export const GenerateKeyPair = async (): Promise<IKeyPair> => {
	const { publicKey, privateKey } = await generateKeyPair(ALGORITHM, {
		modulusLength: 2048,
		extractable: true,
	})

	return {
		publicKey: JSON.stringify(await exportJWK(publicKey)),
		privateKey: JSON.stringify(await exportJWK(privateKey)),
	}
}

export const Login = async (
	publicKey: string,
	privateKey: string,
): Promise<string> => {
	const privateKeyJWK = JSON.parse(privateKey) as JWK

	const payload = {
		publicKey: publicKey,
		timestamp: new Date().toISOString(),
		exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
	}

	const privateKeyObj = await importJWK(privateKeyJWK, ALGORITHM)
	const token = await new SignJWT(payload)
		.setProtectedHeader({ alg: ALGORITHM })
		.sign(privateKeyObj)
	return token
}

export const Signup = async (): Promise<IKeyPair> => {
	return await GenerateKeyPair()
}
