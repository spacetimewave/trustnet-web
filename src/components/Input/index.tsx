import styles from './index.module.css'

export default function Input(props: any) {
	return (
		<input
			className={styles.input}
			{...props}
		></input>
	)
}
