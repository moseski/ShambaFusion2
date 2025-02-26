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
  // Add more crops as needed
]

const COUNTIES = [
  { value: "nairobi", label: "Nairobi" },
  { value: "mombasa", label: "Mombasa" },
  { value: "kisumu", label: "Kisumu" },
  // Add more counties as needed
]

const MARKETS = [
  "Wakulima Market",
  "Gikomba Market",
  "Kongowea Market",
  // Add more markets as needed
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
      // Replace this with your actual API endpoint
      const response = await fetch(`http://127.0.0.1:8000/api/price-prediction/`, {
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
        throw new Error("Failed to generate price predictions")
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
                    {MARKETS.map((market, index) => (
                      <TableRow key={market}>
                        <TableCell>{market}</TableCell>
                        <TableCell>{predictions[index].retail.toFixed(2)}</TableCell>
                        <TableCell>{predictions[index].wholesale.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
};
export default PricePrediction;

