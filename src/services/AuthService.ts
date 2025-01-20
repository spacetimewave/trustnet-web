import { Account, IKeyPair } from '@spacetimewave/trustnet-engine'

export const SignUp = async (
	account: Account,
): Promise<{
	accountKeyPair: IKeyPair
	blockKeyPair: IKeyPair
}> => {
	try {
		const { accountKeyPair, blockKeyPair } = await account.init(true)
		return { accountKeyPair, blockKeyPair }
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const IsLoggedIn = (account: Account | undefined): boolean => {
	try {
		if (!account) return false

		return (
			account.isAccountInitialized() && account.isBlockPrivateKeyInitialized()
		)
	} catch {
		return false
	}
}

// export const GenerateKeyPair = async (): Promise<IKeyPair> => {
// 	const { publicKey, privateKey } = await generateKeyPair(ALGORITHM, {
// 		modulusLength: 2048,
// 		extractable: true,
// 	})

// 	const publicKeyJWK = JSON.stringify(await exportJWK(publicKey))
// 	const privateKeyJWK = JSON.stringify(await exportJWK(privateKey))

// 	return {
// 		publicKey: Utf8ToHex(publicKeyJWK),
// 		privateKey: Utf8ToHex(privateKeyJWK),
// 	}
// }

// export const Login = async (
// 	publicKey: string,
// 	privateKey: string,
// ): Promise<string> => {
// 	const success = await VerifyKeyPair(publicKey, privateKey)
// 	if (!success) throw new Error('Invalid key pair')

// 	const privateKeyJWK = JSON.parse(privateKey) as JWK

// 	const payload = {
// 		publicKey: publicKey,
// 		timestamp: new Date().toISOString(),
// 		exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
// 	}

// 	const privateKeyObj = await importJWK(privateKeyJWK, ALGORITHM)
// 	const token = await new SignJWT(payload)
// 		.setProtectedHeader({ alg: ALGORITHM })
// 		.sign(privateKeyObj)
// 	return token
// }

// export const VerifyKeyPair = async (
// 	publicKey: string,
// 	privateKey: string,
// ): Promise<boolean> => {
// 	const privateKeyJWK = JSON.parse(privateKey) as JWK
// 	const publicKeyJWK = JSON.parse(publicKey) as JWK

// 	const privateKeyObj = await importJWK(privateKeyJWK, ALGORITHM)
// 	const publicKeyObj = await importJWK(publicKeyJWK, ALGORITHM)

// 	const message = 'test message'
// 	const payload = { message }

// 	const token = await new SignJWT(payload)
// 		.setProtectedHeader({ alg: ALGORITHM })
// 		.sign(privateKeyObj)

// 	try {
// 		const { payload: verifiedPayload } = await jwtVerify(token, publicKeyObj)
// 		return verifiedPayload.message === message
// 	} catch {
// 		return false
// 	}
// }
