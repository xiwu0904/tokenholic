import { useTranslation } from 'react-i18next'

function RolePlay() {
  const { t } = useTranslation()

  const scenarios = [
    { key: 'discovery', color: 'bg-orange-100 text-orange-600' },
    { key: 'technical', color: 'bg-blue-100 text-blue-600' },
    { key: 'objection', color: 'bg-yellow-100 text-yellow-600' },
    { key: 'executive', color: 'bg-green-100 text-green-600' },
  ]

  const difficulties = ['easy', 'medium', 'hard']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('rolePlay.title')}</h1>
      </div>

      {/* Scenario Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t('rolePlay.selectScenario')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.key}
              className="p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${scenario.color} flex items-center justify-center mb-3`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">
                {t(`rolePlay.scenarios.${scenario.key}`)}
              </h3>
            </div>
          ))}
        </div>

        {/* Difficulty Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <div className="flex gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {t(`rolePlay.difficulty.${diff}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
          {t('rolePlay.startSession')}
        </button>
      </div>
    </div>
  )
}

export default RolePlay
