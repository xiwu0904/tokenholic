import { useTranslation } from 'react-i18next'

function Solution() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('solution.title')}</h1>
      </div>

      {/* Placeholder content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('solution.submit')}
          </h3>
          <p className="text-gray-500 mb-6">
            Describe your requirements to get AI-powered solution recommendations
          </p>
          <div className="max-w-2xl mx-auto">
            <textarea
              placeholder={t('solution.inputPlaceholder')}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="mt-4 flex justify-end">
              <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                {t('solution.submit')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Solution
