import { Navigate } from 'react-router-dom'

import { IsLoggedIn, useCredentialStore } from '../state/AuthState'
import { ReactNode, useEffect, useState } from 'react'

interface Props {
	children: ReactNode
}

function ProtectedRoute({ children }: Props) {
    const {account} = useCredentialStore()

	const [isAccountLoggedIn, setIsAccountLoggedIn] = useState(IsLoggedIn())	

    useEffect(() => {
        if (!account) {
            setIsAccountLoggedIn(false)
        }
    }, [account])

	if (!isAccountLoggedIn) {
		return <Navigate to='/' replace />
	}
	return children
}

export default ProtectedRoute