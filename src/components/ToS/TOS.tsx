import Link from 'next/link'
import {tosContent} from './tos.ts'

const TOS = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link className="hover:underline" href="/">
      <h1 className="handjet text-6xl font-bold text-center">KenkoNav</h1>
      </Link>
      <h1 className="text-4xl font-semibold text-center mb-4">Terms of Service</h1>
      <div className="prose prose-slate max-w-none">
      {tosContent.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-semibold my-4">{section.title}</h2>
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

export default TOS