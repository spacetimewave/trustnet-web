import {
	generateKeyPair,
	SignJWT,
	exportJWK,
	JWK,
	importJWK,
	jwtVerify,
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
	const success = await VerifyKeyPair(publicKey, privateKey)
	if (!success) throw new Error('Invalid key pair')

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

export const VerifyKeyPair = async (
	publicKey: string,
	privateKey: string,
): Promise<boolean> => {
	const privateKeyJWK = JSON.parse(privateKey) as JWK
	const publicKeyJWK = JSON.parse(publicKey) as JWK

	const privateKeyObj = await importJWK(privateKeyJWK, ALGORITHM)
	const publicKeyObj = await importJWK(publicKeyJWK, ALGORITHM)

	const message = 'test message'
	const payload = { message }

	const token = await new SignJWT(payload)
		.setProtectedHeader({ alg: ALGORITHM })
		.sign(privateKeyObj)

	try {
		const { payload: verifiedPayload } = await jwtVerify(token, publicKeyObj)
		return verifiedPayload.message === message
	} catch {
		return false
	}
}
