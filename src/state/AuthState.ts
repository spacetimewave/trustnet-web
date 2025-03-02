import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Account, IKeyPair } from '@spacetimewave/trustnet-engine'

export interface IAuthStore {
	account: Account | undefined
	setAccount: (account: Account | undefined) => void
}

export const useCredentialStore = create(
	persist<IAuthStore>(
		(set) => ({
			account: undefined,
			setAccount: (_account: Account | undefined) => set({ account: _account }),
		}),
		{
			name: 'auth',
		},
	),
)

export const SignUp = async (
	domainName: string,
	hostingProviderAddresses: string[],
): Promise<{
	accountKeyPair: IKeyPair
	blockKeyPair: IKeyPair
}> => {
	try {
		const setAccount = useCredentialStore.getState().setAccount
		const account = new Account()
		const { accountKeyPair, blockKeyPair } = await account.signup(
			domainName,
			hostingProviderAddresses,
		)
		setAccount(account)
		return { accountKeyPair, blockKeyPair }
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const Login = async (
	domainName: string,
	blockPrivateKey: string,
): Promise<void> => {
	try {
		const setAccount = useCredentialStore.getState().setAccount
		const account = new Account()
		await account.login(domainName, blockPrivateKey)
		setAccount(account)
	} catch (error) {
		console.error(error)
		throw error
	}
}

export const IsLoggedIn = (): boolean => {
	try {
		const account = useCredentialStore.getState().account
		return (
			account !== undefined &&
			account.isAccountInitialized() &&
			account.isBlockPrivateKeyInitialized()
		)
	} catch {
		return false
	}
}

export const LogOut = () => {
	const setAccount = useCredentialStore.getState().setAccount
	setAccount(undefined)
}
