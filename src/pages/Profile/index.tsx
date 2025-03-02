import Button from '../../components/Button'
import MobileNav from '../../components/MobileNav'
import { LogOut } from '../../state/AuthState'
import styles from './index.module.css'

export default function Profile() {
	return (
		<div className={styles.container}>
			<header className={styles.header}></header>
			<main className={styles.main}>
				<h1 className={styles.title}>Profile</h1>
				<Button onClick={LogOut}>Log out</Button>
			</main>
			<MobileNav />
		</div>
	)
}
