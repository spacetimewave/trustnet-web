import { Navigate } from 'react-router-dom'

import { useCredentialStore } from '../state/AuthState'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

function ProtectedRoute({ children }: Props) {
	const { publicKey, token } = useCredentialStore()
	if (!publicKey && !token) {
		return <Navigate to='/' replace />
	}
	return children
}

export default ProtectedRoute