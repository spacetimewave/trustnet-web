import { useState } from 'react'

interface Props {
  onClose: () => void
  onContinue: (providers: string[]) => void
}

const PROVIDER_MAP: Record<string, string> = {
  spacetimewave: 'http://localhost:3000',
}

export const SignupHostingModal: React.FC<Props> = ({ onClose, onContinue }) => {
  const [providers, setProviders] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState<string>('')

  const handleAddProvider = () => {
    if (selectedProvider && PROVIDER_MAP[selectedProvider]) {
      setProviders(prev => [...prev, PROVIDER_MAP[selectedProvider]])
      setSelectedProvider('')
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>Select Hosting Providers</h2>

        <label htmlFor='provider-select' className='block mb-2'>Choose a provider:</label>
        <select
          id='provider-select'
          value={selectedProvider}
          onChange={e => setSelectedProvider(e.target.value)}
          className='border border-gray-300 rounded mb-4 w-full'
        >
          <option value=''>--Please choose an option--</option>
          {Object.keys(PROVIDER_MAP).map((providerKey) => (
            <option key={providerKey} value={providerKey}>
              {providerKey}
            </option>
          ))}
        </select>

        <button className='bg-green-500 text-white px-4 py-2 rounded mb-4' onClick={handleAddProvider}>
          Add Provider
        </button>

        <ul className='list-disc ml-5 mb-4'>
          {providers.map((provider, idx) => (
            <li key={idx}>{provider}</li>
          ))}
        </ul>
        <div className='flex justify-end space-x-2'>
          <button className='bg-gray-500 text-white px-4 py-2 rounded' onClick={onClose}>
            Close
          </button>
          <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={() => onContinue(providers)}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupHostingModal