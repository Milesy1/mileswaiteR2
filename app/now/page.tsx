import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Now | Miles Waite',
  description: 'What I\'m currently building, exploring, reading, and thinking about.',
}

// Data structure for easy updates
const nowData = [
  {
    month: 'OCTOBER 2025',
    lastUpdated: 'October 22, 2025',
    sections: {
      building: 'Project one · Project two · Project three',
      exploring: 'Technology A · Technology B · Concept C',
      reading: [
        '"Book Title" — Author Name',
        '"Another Book" — Another Author'
      ],
      listening: '[Music player placeholder]',
      using: 'Tool 1 · Tool 2 · Tool 3 · Tool 4 · Tool 5',
      location: 'City, State/Country',
      openTo: 'Opportunity type 1 · Opportunity type 2'
    }
  },
  {
    month: 'SEPTEMBER 2025',
    lastUpdated: 'September 15, 2025',
    sections: {
      building: 'Previous project · Another project · Side project',
      exploring: 'New technology · Learning concept · Experimenting with X',
      reading: [
        '"Previous Book" — Previous Author',
        '"Another Previous Book" — Another Previous Author'
      ],
      listening: '[Previous music player placeholder]',
      using: 'Previous tool 1 · Previous tool 2 · Previous tool 3 · Previous tool 4',
      location: 'Previous City, State/Country',
      openTo: 'Previous opportunity type 1 · Previous opportunity type 2'
    }
  }
]

export default function NowPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-[10%] sm:px-[8%] lg:px-[5%] py-16">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            NOW
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Last updated: {nowData[0].lastUpdated}
          </p>
        </div>

        {/* Archive Content */}
        <div className="space-y-16">
          {nowData.map((entry, index) => (
            <div key={entry.month} className="relative">
              {/* Month Header */}
              <div className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                  {entry.month}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-500 text-sm">
                  Updated: {entry.lastUpdated}
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {/* BUILDING */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                    BUILDING
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-lg leading-relaxed">
                    {entry.sections.building}
                  </p>
                </div>

                {/* EXPLORING */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                    EXPLORING
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-lg leading-relaxed">
                    {entry.sections.exploring}
                  </p>
                </div>

                {/* READING */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                    READING
                  </h3>
                  <ul className="space-y-2">
                    {entry.sections.reading.map((book, bookIndex) => (
                      <li key={bookIndex} className="text-neutral-900 dark:text-white text-lg leading-relaxed">
                        · {book}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* LISTENING */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                    LISTENING
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-lg leading-relaxed">
                    {entry.sections.listening}
                  </p>
                </div>

                {/* USING */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                    USING
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-lg leading-relaxed">
                    {entry.sections.using}
                  </p>
                </div>

                {/* LOCATION */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                    LOCATION
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-lg leading-relaxed">
                    {entry.sections.location}
                  </p>
                </div>

                {/* OPEN TO */}
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                    OPEN TO
                  </h3>
                  <p className="text-neutral-900 dark:text-white text-lg leading-relaxed">
                    {entry.sections.openTo}
                  </p>
                </div>
              </div>

              {/* Divider between months */}
              {index < nowData.length - 1 && (
                <div className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800"></div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Inspired by the <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">Now page movement</a>
          </p>
        </div>
      </div>
    </div>
  )
}
