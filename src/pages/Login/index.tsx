import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import logo from '../../assets/images/logo.png'
import Button from '../../components/Button'
import Input from '../../components/Input'
import CrossIcon from '../../assets/icons/CrossIcon'
import { login } from '../../state/AuthState'

export default function Login() {
	const navigate = useNavigate()
	const [publicKey, setPublicKey] = useState('')
	const [privateKey, setPrivateKey] = useState('')

	const handleLogin = async (): Promise<void> => {
		console.log('Logged in', publicKey, privateKey)

		await login({ publicKey, privateKey })
		navigate('/feed')
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
					placeholder='Enter your public key'
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setPublicKey(ev.target.value)}
				/>
				<Input
					placeholder='Enter your private key'
					type='password'
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setPrivateKey(ev.target.value)}
				/>
				<Button color='black' onClick={handleLogin}>
					Next
				</Button>

				<p>
					Don't have an account? <Link to='/signup'>Sign up</Link>
				</p>
			</main>
		</div>
	)
}
