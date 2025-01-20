import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import logo from '../../assets/images/logo.png'
import Button from '../../components/Button'
import CrossIcon from '../../assets/icons/CrossIcon'
import { signUp } from '../../state/AuthState'
import SignupModal from '../../components/SignupModal'
import { IKeyPair } from '@spacetimewave/trustnet-engine'

export default function Signup() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [accountKeyPair, setAccountKeyPair] = useState<IKeyPair | undefined>(undefined)
  const [blockKeyPair, setBlockKeyPair] = useState<IKeyPair | undefined>(undefined)

  const handleSignup = async (): Promise<void> => {
    const {accountKeyPair, blockKeyPair} = await signUp()
    setAccountKeyPair(accountKeyPair)
    setBlockKeyPair(blockKeyPair)
    setShowModal(true)
  }

  const handleContinue = () => {
    setShowModal(false)
    navigate('/feed')
  }

  return (
    <div className={styles.container}>
      {(showModal && accountKeyPair && blockKeyPair) && (
        <SignupModal
          accountKeyPair={accountKeyPair}
          blockKeyPair={blockKeyPair}
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