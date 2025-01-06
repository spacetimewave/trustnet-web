import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IKeyPair, Login, Signup } from '../services/AuthService'

export interface IAuthStore {
	publicKey: string | null
	username: string | null
	usermail: string | null
	token: string | null
	setPublicKey: (publicKey: string | null) => void
	setUsername: (username: string | null) => void
	setUsermail: (usermail: string | null) => void
	setToken: (token: string | null) => void
}

export const useCredentialStore = create(
	persist<IAuthStore>(
		(set) => ({
			publicKey: null,
			username: null,
			usermail: null,
			token: null,
			setPublicKey: (key: string | null) => set({ publicKey: key }),
			setUsername: (key: string | null) => set({ username: key }),
			setUsermail: (key: string | null) => set({ usermail: key }),
			setToken: (key: string | null) => set({ token: key }),
		}),
		{
			name: 'auth',
		},
	),
)

const { setPublicKey, setToken } = useCredentialStore.getState()

export const signup = async (): Promise<IKeyPair> => {
	try {
		const keyPair = await Signup()
		const token = await Login(keyPair.publicKey, keyPair.privateKey)
		setPublicKey(keyPair.publicKey)
		setToken(token)
		return keyPair
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const login = async (keyPair: IKeyPair): Promise<void> => {
	try {
		console.log('Logged in')
		const token = await Login(keyPair.publicKey, keyPair.privateKey)
		setPublicKey(keyPair.publicKey)
		setToken(token)
		console.log('Logged in', token)
	} catch (error) {
		console.error(error)
		throw error
	}
}
