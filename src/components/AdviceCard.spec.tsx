import React from 'react'
import { QueryClientProvider, QueryClient, setLogger } from 'react-query'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import nock from 'nock'

import AdviceCard from './AdviceCard'

const advice = {
  id: 1,
  advice: 'The quieter you become, the more you can hear.',
}

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})

let queryClient: QueryClient
let wrapper: React.FC

beforeEach(() => {
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        retry: false,
      },
    },
  })
  wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  window.localStorage.clear()
})

afterEach(() => {
  jest.restoreAllMocks()
  nock.cleanAll()
})

describe('AdviceCard', () => {
  it('fetches advice and shows loading indicator if localStorage is empty', async () => {
    const scope = nock('https://api.adviceslip.com')
      .get('/advice')
      .reply(200, { slip: advice }, { 'Access-Control-Allow-Origin': '*' })

    render(<AdviceCard />, { wrapper })

    expect(screen.getByRole('heading')).toHaveTextContent(/loading.../i)
    expect(screen.getByTestId('quote')).toHaveTextContent(/loading.../i)

    await waitFor(() => scope.done())

    expect(screen.getByRole('heading')).toHaveTextContent(advice.id.toString())
    expect(screen.getByTestId('quote')).toHaveTextContent(advice.advice)
  })

  it('stores the last fetched advice in localStorage', async () => {
    const scope = nock('https://api.adviceslip.com')
      .get('/advice')
      .reply(200, { slip: advice }, { 'Access-Control-Allow-Origin': '*' })

    render(<AdviceCard />, { wrapper })

    await waitFor(() => scope.done())

    expect(localStorage.getItem('currentAdvice')).toBe(JSON.stringify(advice))
  })

  it('loads the last advice from localStorage if available', async () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(advice))

    nock('https://api.adviceslip.com')
      .get('/advice')
      .reply(
        200,
        { slip: { id: 2, advice: "Don't drink bleach." } },
        { 'Access-Control-Allow-Origin': '*' }
      )

    render(<AdviceCard />, { wrapper })

    await waitFor(() =>
      expect(screen.getByTestId('quote')).toHaveTextContent(advice.advice)
    )
  })

  it('fetches a new advice when clicking the button', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify({
        id: 3,
        advice: 'Good things happen to those who wait.',
      })
    )

    const scope = nock('https://api.adviceslip.com')
      .get('/advice')
      .reply(200, { slip: advice }, { 'Access-Control-Allow-Origin': '*' })

    render(<AdviceCard />, { wrapper })

    fireEvent.click(screen.getByRole('button', { name: /generate advice/i }))

    await waitFor(() => scope.done())

    expect(screen.getByRole('heading')).toHaveTextContent(advice.id.toString())
  })
})
