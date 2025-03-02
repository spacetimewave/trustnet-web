import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import logo from '../../assets/images/logo.png'
import Button from '../../components/Button'
import CrossIcon from '../../assets/icons/CrossIcon'
import { IKeyPair } from '@spacetimewave/trustnet-engine'
import SignupDnsModal from './SignupModal/SignupDnsModal'
import SignupHostingModal from './SignupModal/SignupHostingModal'
import SignupKeyPairModal from './SignupModal/SignupKeyPairModal'
import { SignUp } from '../../state/AuthState'

export default function Signup() {
	const navigate = useNavigate()
	const [accountKeyPair, setAccountKeyPair] = useState<IKeyPair | undefined>(
		undefined,
	)
	const [blockKeyPair, setBlockKeyPair] = useState<IKeyPair | undefined>(
		undefined,
	)
	const [accountDomainName, setAccountDomainName] = useState<
		string | undefined
	>(undefined)
	const [showDomainModal, setShowDomainModal] = useState(false)
	const [showHostingModal, setShowHostingModal] = useState(false)
	const [showKeysModal, setShowKeysModal] = useState(false)

	const handleStartSignup = async (): Promise<void> => {
		setShowDomainModal(true)
		setShowHostingModal(false)
		setShowKeysModal(false)
	}

	const handleAccountDns = (selectedDomain: string) => {
		setAccountDomainName(selectedDomain)
		setShowDomainModal(false)
		setShowHostingModal(true)
	}

	const handleAccountHosting = async(providers: string[]) => {
    const {accountKeyPair, blockKeyPair} = await SignUp(accountDomainName!, providers)
		setAccountKeyPair(accountKeyPair)
    setBlockKeyPair(blockKeyPair)
    setShowDomainModal(false)
    setShowHostingModal(false)
		setShowKeysModal(true)
	}

	const handleClose = () => {
		setShowDomainModal(false)
		setShowHostingModal(false)
		setShowKeysModal(false)
	}

	const handleSignup = async (): Promise<void> => {
		setShowDomainModal(false)
		setShowHostingModal(false)
		setShowKeysModal(false)
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
				{!showDomainModal && !showHostingModal && !showKeysModal && (
					<Button onClick={handleStartSignup}>Sign Up</Button>
				)}
				{showDomainModal && (
					<div className={styles.modal}>
						<SignupDnsModal
							onClose={handleClose}
							onContinue={handleAccountDns}
						/>
					</div>
				)}

				{showHostingModal && (
					<div className={styles.modal}>
						<SignupHostingModal
							onClose={handleClose}
							onContinue={handleAccountHosting}
						/>
					</div>
				)}

				{showKeysModal && (
					<div className={styles.modal}>
						<SignupKeyPairModal
							accountKeyPair={accountKeyPair!}
							blockKeyPair={blockKeyPair!}
							onClose={handleClose}
							onContinue={handleSignup}
						/>
					
					</div>
				)}
			</main>
		</div>
	)
}
