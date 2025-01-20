import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IsLoggedIn, SignUp } from '../services/AuthService'
import { Account, IKeyPair } from '@spacetimewave/trustnet-engine'

export interface IAuthStore {
	account: Account | undefined
	setAccount: (account: Account | undefined) => void
	// token: string | null
	// setToken: (token: string | null) => void
}

export const useCredentialStore = create(
	persist<IAuthStore>(
		(set) => ({
			account: undefined,
			setAccount: (_account: Account | undefined) => set({ account: _account }),
			// token: null,
			// setToken: (key: string | null) => set({ token: key }),
		}),
		{
			name: 'auth',
		},
	),
)

export const signUp = async (): Promise<{
	accountKeyPair: IKeyPair
	blockKeyPair: IKeyPair
}> => {
	try {
		const setAccount = useCredentialStore.getState().setAccount
		const account = new Account()
		const { accountKeyPair, blockKeyPair } = await SignUp(account)
		setAccount(account)
		return { accountKeyPair, blockKeyPair }
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const isLoggedIn = (): boolean => {
	try {
		const account = useCredentialStore.getState().account
		return IsLoggedIn(account)
	} catch {
		return false
	}
}

export const logOut = () => {
	console.log('Logging out')
	const setAccount = useCredentialStore.getState().setAccount
	setAccount(undefined)
}

export const login = async (keyPair: IKeyPair): Promise<void> => {
	try {
		// const token = await Login(keyPair.publicKey, keyPair.privateKey)
		// setPublicKey(keyPair.publicKey)
		// setToken(token)
	} catch (error) {
		console.error(error)
		throw error
	}
}
