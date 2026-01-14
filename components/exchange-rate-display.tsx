import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface ExchangeRateDisplayProps {
  amount: string
  convertedAmount: string
  fromCurrency: string
  toCurrency: string
  exchangeRate: number
  lastUpdated: string
}

export default function ExchangeRateDisplay({
  amount,
  convertedAmount,
  fromCurrency,
  toCurrency,
  exchangeRate,
  lastUpdated,
}: ExchangeRateDisplayProps) {
  return (
    <div className="space-y-4">
      <Card className="bg-primary/5 border-primary/20 p-6">
        <div className="flex items-center justify-center gap-3 text-2xl font-bold">
          <span className="text-foreground">
            {amount || "0"} {fromCurrency}
          </span>
          <ArrowRight className="h-6 w-6 text-primary" />
          <span className="text-primary">
            {convertedAmount} {toCurrency}
          </span>
        </div>
      </Card>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>Exchange Rate:</span>
          <span className="font-mono font-semibold text-foreground">
            1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Last Updated:</span>
          <span className="text-foreground">{lastUpdated}</span>
        </div>
      </div>
    </div>
  )
}
