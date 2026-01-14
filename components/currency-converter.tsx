"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CurrencySelect from "./currency-select"
import ExchangeRateDisplay from "./exchange-rate-display"
import { ArrowLeftRight, TrendingUp } from "lucide-react"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1000")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [convertedAmount, setConvertedAmount] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [lastUpdated, setLastUpdated] = useState<string>("")

  useEffect(() => {
    fetchExchangeRate()
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (exchangeRate && amount) {
      const result = Number.parseFloat(amount) * exchangeRate
      setConvertedAmount(result.toFixed(2))
    }
  }, [amount, exchangeRate])

  const fetchExchangeRate = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }

      const data = await response.json()
      const rate = data.rates[toCurrency]
      setExchangeRate(rate)

      const date = new Date(data.time_last_updated * 1000)
      setLastUpdated(date.toLocaleString())
    } catch (err) {
      setError("Unable to fetch exchange rates. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-balance">Currency Converter</h1>
        <p className="text-muted-foreground text-lg">Real-time exchange rates from around the world</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Convert Currency
          </CardTitle>
          <CardDescription>Enter an amount and select currencies to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base">
              Amount
            </Label>
            <Input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              className="text-xl h-14"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] items-end">
            <div className="space-y-2">
              <Label htmlFor="from-currency" className="text-base">
                From
              </Label>
              <CurrencySelect id="from-currency" value={fromCurrency} onChange={setFromCurrency} />
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapCurrencies}
              className="h-10 w-10 rounded-full mb-0.5 bg-transparent"
              aria-label="Swap currencies"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <Label htmlFor="to-currency" className="text-base">
                To
              </Label>
              <CurrencySelect id="to-currency" value={toCurrency} onChange={setToCurrency} />
            </div>
          </div>

          {error && <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">{error}</div>}

          {loading && (
            <div className="text-center py-4">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent"></div>
            </div>
          )}

          {!loading && !error && exchangeRate && (
            <ExchangeRateDisplay
              amount={amount}
              convertedAmount={convertedAmount}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              exchangeRate={exchangeRate}
              lastUpdated={lastUpdated}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
