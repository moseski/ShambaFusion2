"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const PricePrediction = () => {
  const CROPS = [
    { value: "tomatoes", label: "Tomatoes" },
    { value: "potatoes", label: "Potatoes" },
    { value: "onions", label: "Onions" },
    { value: "maize", label: "Maize" },
    { value: "beans", label: "Beans" },
    { value: "cabbage", label: "Cabbage" },
    { value: "kale", label: "Kale (Sukuma Wiki)" },
    { value: "carrots", label: "Carrots" },
    { value: "spinach", label: "Spinach" },
    { value: "green-peas", label: "Green Peas" },
  ]

  const COUNTIES = [
    { value: "nairobi", label: "Nairobi" },
    { value: "mombasa", label: "Mombasa" },
    { value: "kisumu", label: "Kisumu" },
    { value: "nakuru", label: "Nakuru" },
    { value: "kiambu", label: "Kiambu" },
    { value: "machakos", label: "Machakos" },
    { value: "uasin-gishu", label: "Uasin Gishu" },
    { value: "kakamega", label: "Kakamega" },
    { value: "nyeri", label: "Nyeri" },
    { value: "kilifi", label: "Kilifi" },
    { value: "bungoma", label: "Bungoma" },
    { value: "trans-nzoia", label: "Trans Nzoia" },
  ]

  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedCounty, setSelectedCounty] = useState("")
  const [supplyVolume, setSupplyVolume] = useState("")
  const [predictions, setPredictions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const generatePredictions = async (e) => {
    e.preventDefault()
    if (!selectedCrop || !selectedCounty || !supplyVolume) {
      alert("Please select a crop, county, and enter the supply volume")
      return
    }

    setIsLoading(true)

    try {
      // Use the full URL to your Django backend
      const response = await fetch(`http://localhost:8000/price-predictions/api/predictions/predict/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop_type: selectedCrop,
          county: selectedCounty,
          supply_volume: Number.parseFloat(supplyVolume),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || "Failed to generate price predictions")
      }

      const data = await response.json()
      setPredictions(data.predictions)
    } catch (error) {
      console.error("Error generating price predictions:", error)
      setPredictions(null)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateAveragePrices = () => {
    if (!predictions || predictions.length === 0) return null

    let totalRetail = 0
    let totalWholesale = 0

    predictions.forEach((pred) => {
      totalRetail += pred.retail
      totalWholesale += pred.wholesale
    })

    return {
      retail: totalRetail / predictions.length,
      wholesale: totalWholesale / predictions.length,
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Crop Price Prediction</CardTitle>
        <CardDescription>Get price predictions for your crop based on location and supply volume</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={generatePredictions} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="crop" className="block">
                Select Crop
              </Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger id="crop">
                  <SelectValue placeholder="Choose a crop" />
                </SelectTrigger>
                <SelectContent>
                  {CROPS.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="county" className="block">
                Select County
              </Label>
              <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                <SelectTrigger id="county">
                  <SelectValue placeholder="Choose a county" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTIES.map((county) => (
                    <SelectItem key={county.value} value={county.value}>
                      {county.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supply" className="block">
              Supply Volume (kg)
            </Label>
            <Input
              id="supply"
              type="number"
              placeholder="Enter supply volume"
              value={supplyVolume}
              onChange={(e) => setSupplyVolume(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Predictions...
              </>
            ) : (
              "Generate Price Predictions"
            )}
          </Button>
        </form>

        {predictions && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Price Predictions</CardTitle>
              <CardDescription>
                Predictions for {selectedCrop} in {selectedCounty} (Supply: {supplyVolume} kg)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Market</TableHead>
                      <TableHead>Retail Price (KES/kg)</TableHead>
                      <TableHead>Wholesale Price (KES/kg)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictions &&
                      predictions.map((prediction, index) => (
                        <TableRow key={prediction.market}>
                          <TableCell>{prediction.market}</TableCell>
                          <TableCell>{prediction.retail.toFixed(2)}</TableCell>
                          <TableCell>{prediction.wholesale.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
        {predictions && (
          <Card className="mt-6 border-2 border-primary/20">
            <CardHeader className="bg-muted/30">
              <CardTitle>Price Summary</CardTitle>
              <CardDescription>Detailed price prediction for your selected parameters</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Selected Crop</h3>
                    <p className="text-xl font-semibold">
                      {CROPS.find((crop) => crop.value === selectedCrop)?.label || selectedCrop}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Selected County</h3>
                    <p className="text-xl font-semibold">
                      {COUNTIES.find((county) => county.value === selectedCounty)?.label || selectedCounty}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Supply Volume</h3>
                    <p className="text-xl font-semibold">{supplyVolume} kg</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Average Retail Price</h3>
                    <p className="text-3xl font-bold text-primary">
                      KES {calculateAveragePrices()?.retail.toFixed(2) || "N/A"}
                      <span className="text-sm text-muted-foreground ml-1">per kg</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Average Wholesale Price</h3>
                    <p className="text-3xl font-bold text-primary">
                      KES {calculateAveragePrices()?.wholesale.toFixed(2) || "N/A"}
                      <span className="text-sm text-muted-foreground ml-1">per kg</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Potential Revenue (Retail)</h3>
                    <p className="text-xl font-semibold">
                      KES {(calculateAveragePrices()?.retail * Number(supplyVolume)).toFixed(2) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

export default PricePrediction

