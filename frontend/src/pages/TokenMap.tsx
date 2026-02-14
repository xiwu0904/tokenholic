import { useTranslation } from 'react-i18next'

function TokenMap() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('tokenMap.title')}</h1>
      </div>

      {/* Placeholder content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('tokenMap.generate')}
          </h3>
          <p className="text-gray-500 mb-6">
            Enter a company name to generate a Token Battle Map
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t('tokenMap.companyPlaceholder')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
                {t('tokenMap.generate')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenMap
