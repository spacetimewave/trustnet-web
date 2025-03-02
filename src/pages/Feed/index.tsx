import styles from './index.module.css'
import { useCredentialStore } from '../../state/AuthState'
import MobileNav from '../../components/MobileNav'

export default function Feed() {
	const { account } = useCredentialStore()
	return (
		<div className={styles.container}>
			<header className={styles.header}></header>
			<main className={styles.main}>
				<h1>Feed</h1>
				<div className='truncate max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap'>
					Account Public Key: {account?.accountPublicKey}
				</div>
				<div className='truncate max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap'>
					Block Public key: {account?.blockPublicKey}
				</div>
			</main>
			<MobileNav />
		</div>
	)
}
