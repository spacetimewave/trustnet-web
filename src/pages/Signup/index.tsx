import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import logo from '../../assets/images/logo.png'
import Button from '../../components/Button'
import CrossIcon from '../../assets/icons/CrossIcon'
import { signup } from '../../state/AuthState'
import SignupModal from '../../components/SignupModal'

export default function Signup() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const handleSignup = async (): Promise<void> => {
    // Generate keys (replace with actual key generation logic)
    const keyPair = await signup()
	setPublicKey(keyPair.publicKey)
	setPrivateKey(keyPair.privateKey)
    setShowModal(true)
  }

  const handleContinue = () => {
    setShowModal(false)
    navigate('/feed')
  }

  return (
    <div className={styles.container}>
      {showModal && (
        <SignupModal
          publicKey={publicKey}
          privateKey={privateKey}
          onClose={() => setShowModal(false)}
          onContinue={handleContinue}
        />
      )}
      <header className={styles.header}>
        <Link to={'/'} className={styles.cross}>
          <CrossIcon width='35px' height='35px' />
        </Link>
        <figure className={styles.figure}>
          <img src={logo} className={styles.logo} alt='Raptor logo' />
        </figure>
      </header>
      <main className={styles.main}>
        <Button onClick={handleSignup}>Sign Up</Button>
      </main>
    </div>
  )
}