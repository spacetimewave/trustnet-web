import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import logo from '../../assets/images/logo.png'
import Button from '../../components/Button'
import Input from '../../components/Input'
import CrossIcon from '../../assets/icons/CrossIcon'
import { Login as login } from '../../state/AuthState'

export default function Login() {
	const navigate = useNavigate()
	const [domainName, setDomainName] = useState('')
	const [blockPrivateKey, setBlockPrivateKey] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const handleLogin = async (): Promise<void> => {
		const success = await login(domainName, blockPrivateKey)
		if (!success) {
			setErrorMessage(
				'Login failed. Please check your credentials and try again.',
			)
			setTimeout(() => {
				setErrorMessage('')
			}, 5000) // Hide toast after 5 seconds
		} else {
			navigate('/feed')
		}
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Link to={'/'} className={styles.cross}>
					<CrossIcon width='35px' height='35px' />
				</Link>
				<figure className={styles.figure}>
					<img src={logo} className={styles.logo} alt='Raptor logo' />
				</figure>
			</header>
			<main className={styles.main}>
				<h2 className={styles.title}>Sign in to Raptor</h2>

				<Input
					placeholder='Username'
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
						setDomainName(ev.target.value)
					}
				/>
				<Input
					placeholder='Block private key'
					type='password'
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
						setBlockPrivateKey(ev.target.value)
					}
				/>
				<Button color='black' onClick={handleLogin}>
					Next
				</Button>

				<p>
					Don't have an account? <Link to='/signup'>Sign up</Link>
				</p>

				{errorMessage && (
					<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-200 text-red-800 px-4 py-2 rounded'>
						{errorMessage}
					</div>
				)}
			</main>
		</div>
	)
}
