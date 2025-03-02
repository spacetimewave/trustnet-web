import React, { useState } from 'react'

interface Props {
  onClose: () => void
  onContinue: (domain: string) => void
}

const SignupDnsModal: React.FC<Props> = ({ onClose, onContinue }) => {

	const [domain, setDomain] = useState('')

	return (
	  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
		<div className='bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md'>
		  <h2 className='text-2xl font-bold mb-4'>Select Domain</h2>
		  <input
			type='text'
			className='border p-2 w-full mb-4'
			placeholder='Enter domain'
			value={domain}
			onChange={e => setDomain(e.target.value)}
		  />
		  <div className='flex justify-end space-x-2'>
			<button className='bg-gray-500 text-white px-4 py-2 rounded' onClick={onClose}>
			  Close
			</button>
			<button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => onContinue(domain)}>
			  Continue
			</button>
		  </div>
		</div>
	  </div>)
}

export default SignupDnsModal
