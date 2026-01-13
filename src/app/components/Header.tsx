import { Leaf, Moon, Sun, History, BarChart3, LogOut } from 'lucide-react';

type Page = 'landing' | 'prediction' | 'about' | 'history' | 'stats' | 'compare';
type Theme = 'light' | 'dark';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onSignOut?: () => void;
  userEmail?: string;
}

export function Header({ 
  currentPage, 
  onNavigate, 
  theme, 
  onToggleTheme, 
  onSignOut,
  userEmail 
}: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex items-center gap-2">
            <Leaf className="size-8 text-green-600 dark:text-green-400" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Weed Classifier
            </h1>
          </div>

          {/* Navigation - Center */}
          <nav className="flex gap-6 items-center">
            <button
              onClick={() => onNavigate('landing')}
              className={`font-medium transition-colors ${
                currentPage === 'landing'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('history')}
              className={`flex items-center gap-1 transition-colors ${
                currentPage === 'history'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              <History className="size-4" />
              History
            </button>
            <button
              onClick={() => onNavigate('stats')}
              className={`flex items-center gap-1 transition-colors ${
                currentPage === 'stats'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              <BarChart3 className="size-4" />
              Stats
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`transition-colors ${
                currentPage === 'about'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              About
            </button>
          </nav>

          {/* Theme Toggle & User - Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="size-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="size-5 text-gray-300" />
              )}
            </button>

            {userEmail && onSignOut && (
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  {userEmail}
                </span>
                <button
                  onClick={onSignOut}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
