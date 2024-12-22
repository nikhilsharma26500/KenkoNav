import { Link } from 'react-router-dom'
import { ppContent } from './pp.ts'

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link className="hover:underline" to="/">
      <h1 className="handjet text-6xl font-bold text-center">KenkoNav</h1>
      </Link>
      <h1 className="text-4xl font-semibold text-center mb-4">Privacy Policy</h1>
      <span className="block text-lg text-center text-gray-500 mb-8">
        Effective Date: 21 December 2024
      </span>
      <div className="prose prose-slate max-w-none space-y-8">
        {ppContent.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {section.title}
            </h2>
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrivacyPolicy