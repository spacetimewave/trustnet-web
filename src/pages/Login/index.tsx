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
	const [username, setUsername] = useState('')
	const [blockPrivateKey, setBlockPrivateKey] = useState('')

	const handleLogin = async (): Promise<void> => {
		await login(username, blockPrivateKey)
		navigate('/feed')
	}

	// const handleUsernameAndPublicKeyInput = async (): Promise<void> => {

	// }

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
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setUsername(ev.target.value)}
				/>
				<Input
					placeholder='Block private key'
					type='password'
					onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setBlockPrivateKey(ev.target.value)}
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
