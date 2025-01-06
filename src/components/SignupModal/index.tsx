import { useState } from 'react'
import CopyIcon from '../../assets/icons/CopyIcon'

interface Props {
	publicKey: string
	privateKey: string
	onClose: () => void
	onContinue: () => void
}

const SignupModal: React.FC<Props> = ({
	publicKey,
	privateKey,
	onClose,
	onContinue,
}) => {
    const [toastVisible, setToastVisible] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 3000); // Hide toast after 3 seconds
    };

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md'>
				<h2 className='text-2xl font-bold mb-4'>Keys</h2>
				<div className='mb-4'>
					<h3 className='text-lg font-semibold'>Public Key</h3>
					<div className='flex items-center border border-gray-300 rounded p-2'>
						<p className='pr-3 truncate'>{publicKey}</p>
						<div className='w-[20px]'>
							<CopyIcon
								viewBox='0 0 24 24'
								onClick={() => copyToClipboard(publicKey)}
								className='w-[20px] cursor-pointer'
							/>
						</div>
					</div>
				</div>
				<div className='mb-4'>
					<h3 className='text-lg font-semibold'>Private Key</h3>
					<div className='flex items-center border border-gray-300 rounded p-2'>
						<p className='pr-3 truncate'>{privateKey}</p>
						<div className='w-[20px]'>
							<CopyIcon
								viewBox='0 0 24 24'
								onClick={() => copyToClipboard(privateKey)}
								className='w-[20px] cursor-pointer'
							/>
						</div>
					</div>
				</div>
				<div className='flex justify-end space-x-2'>
					<button
						className='bg-gray-500 text-white px-4 py-2 rounded'
						onClick={onClose}
					>
						Close
					</button>
					<button
						className='bg-blue-500 text-white px-4 py-2 rounded'
						onClick={onContinue}
					>
						Continue
					</button>
				</div>
			</div>
            {toastVisible && (
                <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded'>
                    Copied to clipboard!
                </div>
            )}
		</div>
	)
}

export default SignupModal
