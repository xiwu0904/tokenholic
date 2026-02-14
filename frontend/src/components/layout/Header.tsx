import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="font-semibold text-lg text-gray-900">
            {t('app.title')}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/token-map"
            className={`text-sm font-medium transition-colors ${
              location.pathname.startsWith('/token-map')
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('nav.tokenMap')}
          </Link>
          <Link
            to="/solution"
            className={`text-sm font-medium transition-colors ${
              location.pathname.startsWith('/solution')
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('nav.solution')}
          </Link>
          <Link
            to="/role-play"
            className={`text-sm font-medium transition-colors ${
              location.pathname.startsWith('/role-play')
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('nav.rolePlay')}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {i18n.language === 'en' ? '中文' : 'EN'}
          </button>
          <Link
            to="/settings"
            className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
