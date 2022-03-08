import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'
import AdviceCard from '@/components/AdviceCard'
import queryClient from '@/lib/react-query'

function App() {
  return (
    <main className="App">
      <QueryClientProvider client={queryClient}>
        <AdviceCard />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </main>
  )
}

export default App
