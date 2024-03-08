import { ThemeProvider } from '@/components/theme-provider'
import Db_handle from '@/views/db_handle'
import { I18n_handle } from '@/views/i18n_handle'
import { Rs_layout } from '@/views/layout/layout'
import Rs_window from '@/views/window'
import "@/styles/scroll_bar.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <I18n_handle>
        <Db_handle>
          <Rs_window />
          <Rs_layout />
        </Db_handle>
      </I18n_handle>
    </ThemeProvider>

  )
}

export default App
