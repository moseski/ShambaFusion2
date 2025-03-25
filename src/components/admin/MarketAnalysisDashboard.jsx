"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, BarChartIcon, Map, Calendar, Loader2 } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

const MarketAnalysisDashboard = () => {
  // Crop options
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

  // Counties for regional analysis
  const COUNTIES = [
    { value: "nairobi", label: "Nairobi" },
    { value: "mombasa", label: "Mombasa" },
    { value: "kisumu", label: "Kisumu" },
    { value: "nakuru", label: "Nakuru" },
    { value: "kiambu", label: "Kiambu" },
  ]

  // State for selected crop and time period
  const [selectedCrop, setSelectedCrop] = useState("tomatoes")
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("6m")
  const [selectedTab, setSelectedTab] = useState("overview")
  const [cropData, setCropData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  // Get the current crop label for display
  const currentCropLabel = CROPS.find((crop) => crop.value === selectedCrop)?.label || "Tomatoes"

  // Fetch data from backend
  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`http://localhost:8000/price-predictions/api/market-analysis/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crop_type: selectedCrop,
            time_period: selectedTimePeriod,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch market analysis data")
        }

        const data = await response.json()
        setCropData({ ...cropData, [selectedCrop]: data })
      } catch (err) {
        console.error("Error fetching market data:", err)
        setError(err.message)

        // Fallback to mock data if API fails
        if (!cropData[selectedCrop]) {
          setCropData({
            ...cropData,
            [selectedCrop]: getMockDataForCrop(selectedCrop),
          })
        }
      } finally {
        setLoading(false)
      }
    }

    // Only fetch if we don't already have data for this crop and time period
    if (!cropData[selectedCrop]) {
      fetchMarketData()
    } else {
      setLoading(false)
    }
  }, [selectedCrop, selectedTimePeriod])

  // Mock data function as fallback
  const getMockDataForCrop = (crop) => {
    // This is just a fallback in case the API fails
    const mockData = {
      tomatoes: {
        marketHistory: [
          { date: "Jan", price: 2.5, prediction: 2.6 },
          { date: "Feb", price: 2.7, prediction: 2.8 },
          { date: "Mar", price: 2.9, prediction: 3.0 },
          { date: "Apr", price: 3.1, prediction: 3.2 },
          { date: "May", price: 3.3, prediction: 3.4 },
          { date: "Jun", price: 3.5, prediction: 3.6 },
        ],
        priceTrend: [
          { month: "Jan", wholesale: 2.2, retail: 3.5 },
          { month: "Feb", wholesale: 2.4, retail: 3.7 },
          { month: "Mar", wholesale: 2.6, retail: 3.9 },
          { month: "Apr", wholesale: 2.8, retail: 4.1 },
          { month: "May", wholesale: 3.0, retail: 4.3 },
          { month: "Jun", wholesale: 3.2, retail: 4.5 },
        ],
        supplyVolume: [
          { month: "Jan", volume: 1000 },
          { month: "Feb", volume: 1200 },
          { month: "Mar", volume: 1400 },
          { month: "Apr", volume: 1600 },
          { month: "May", volume: 1800 },
          { month: "Jun", volume: 2000 },
        ],
        regionalPrices: [
          { county: "Nairobi", price: 3.5 },
          { county: "Mombasa", price: 3.8 },
          { county: "Kisumu", price: 3.2 },
          { county: "Nakuru", price: 3.0 },
          { county: "Kiambu", price: 3.3 },
        ],
        marketShare: [
          { name: "Wakulima Market", value: 35 },
          { name: "Gikomba Market", value: 25 },
          { name: "Kongowea Market", value: 20 },
          { name: "Other Markets", value: 20 },
        ],
        seasonalTrend: [
          { month: "Jan", price: 3.2, demand: 70 },
          { month: "Feb", price: 3.5, demand: 75 },
          { month: "Mar", price: 3.7, demand: 80 },
          { month: "Apr", price: 3.9, demand: 85 },
          { month: "May", price: 4.1, demand: 90 },
          { month: "Jun", price: 4.3, demand: 95 },
          { month: "Jul", price: 4.5, demand: 100 },
          { month: "Aug", price: 4.3, demand: 95 },
          { month: "Sep", price: 4.0, demand: 90 },
          { month: "Oct", price: 3.8, demand: 85 },
          { month: "Nov", price: 3.5, demand: 80 },
          { month: "Dec", price: 3.3, demand: 75 },
        ],
        priceVolatility: 15, // percentage
        averagePrice: 3.2,
        priceChange: 8.5, // percentage
        supplyGrowth: 12.3, // percentage
      },
      potatoes: {
        marketHistory: [
          { date: "Jan", price: 1.8, prediction: 1.9 },
          { date: "Feb", price: 1.9, prediction: 2.0 },
          { date: "Mar", price: 2.0, prediction: 2.1 },
          { date: "Apr", price: 2.1, prediction: 2.2 },
          { date: "May", price: 2.2, prediction: 2.3 },
          { date: "Jun", price: 2.3, prediction: 2.4 },
        ],
        priceTrend: [
          { month: "Jan", wholesale: 1.5, retail: 2.8 },
          { month: "Feb", wholesale: 1.6, retail: 2.9 },
          { month: "Mar", wholesale: 1.7, retail: 3.0 },
          { month: "Apr", wholesale: 1.8, retail: 3.1 },
          { month: "May", wholesale: 1.9, retail: 3.2 },
          { month: "Jun", wholesale: 2.0, retail: 3.3 },
        ],
        supplyVolume: [
          { month: "Jan", volume: 1500 },
          { month: "Feb", volume: 1600 },
          { month: "Mar", volume: 1700 },
          { month: "Apr", volume: 1800 },
          { month: "May", volume: 1900 },
          { month: "Jun", volume: 2000 },
        ],
        regionalPrices: [
          { county: "Nairobi", price: 2.3 },
          { county: "Mombasa", price: 2.5 },
          { county: "Kisumu", price: 2.1 },
          { county: "Nakuru", price: 1.9 },
          { county: "Kiambu", price: 2.2 },
        ],
        marketShare: [
          { name: "Wakulima Market", value: 30 },
          { name: "Gikomba Market", value: 20 },
          { name: "Kongowea Market", value: 25 },
          { name: "Other Markets", value: 25 },
        ],
        seasonalTrend: [
          { month: "Jan", price: 2.0, demand: 75 },
          { month: "Feb", price: 2.1, demand: 80 },
          { month: "Mar", price: 2.2, demand: 85 },
          { month: "Apr", price: 2.3, demand: 90 },
          { month: "May", price: 2.4, demand: 95 },
          { month: "Jun", price: 2.5, demand: 100 },
          { month: "Jul", price: 2.6, demand: 95 },
          { month: "Aug", price: 2.5, demand: 90 },
          { month: "Sep", price: 2.4, demand: 85 },
          { month: "Oct", price: 2.3, demand: 80 },
          { month: "Nov", price: 2.2, demand: 75 },
          { month: "Dec", price: 2.1, demand: 70 },
        ],
        priceVolatility: 10, // percentage
        averagePrice: 2.1,
        priceChange: 5.2, // percentage
        supplyGrowth: 8.7, // percentage
      },
      onions: {
        marketHistory: [
          { date: "Jan", price: 3.0, prediction: 3.1 },
          { date: "Feb", price: 3.2, prediction: 3.3 },
          { date: "Mar", price: 3.4, prediction: 3.5 },
          { date: "Apr", price: 3.6, prediction: 3.7 },
          { date: "May", price: 3.8, prediction: 3.9 },
          { date: "Jun", price: 4.0, prediction: 4.1 },
        ],
        priceTrend: [
          { month: "Jan", wholesale: 2.7, retail: 4.0 },
          { month: "Feb", wholesale: 2.9, retail: 4.2 },
          { month: "Mar", wholesale: 3.1, retail: 4.4 },
          { month: "Apr", wholesale: 3.3, retail: 4.6 },
          { month: "May", wholesale: 3.5, retail: 4.8 },
          { month: "Jun", wholesale: 3.7, retail: 5.0 },
        ],
        supplyVolume: [
          { month: "Jan", volume: 800 },
          { month: "Feb", volume: 900 },
          { month: "Mar", volume: 1000 },
          { month: "Apr", volume: 1100 },
          { month: "May", volume: 1200 },
          { month: "Jun", volume: 1300 },
        ],
        regionalPrices: [
          { county: "Nairobi", price: 4.0 },
          { county: "Mombasa", price: 4.2 },
          { county: "Kisumu", price: 3.8 },
          { county: "Nakuru", price: 3.6 },
          { county: "Kiambu", price: 3.9 },
        ],
        marketShare: [
          { name: "Wakulima Market", value: 40 },
          { name: "Gikomba Market", value: 20 },
          { name: "Kongowea Market", value: 15 },
          { name: "Other Markets", value: 25 },
        ],
        seasonalTrend: [
          { month: "Jan", price: 3.5, demand: 80 },
          { month: "Feb", price: 3.7, demand: 85 },
          { month: "Mar", price: 3.9, demand: 90 },
          { month: "Apr", price: 4.1, demand: 95 },
          { month: "May", price: 4.3, demand: 100 },
          { month: "Jun", price: 4.5, demand: 95 },
          { month: "Jul", price: 4.3, demand: 90 },
          { month: "Aug", price: 4.1, demand: 85 },
          { month: "Sep", price: 3.9, demand: 80 },
          { month: "Oct", price: 3.7, demand: 75 },
          { month: "Nov", price: 3.5, demand: 70 },
          { month: "Dec", price: 3.3, demand: 65 },
        ],
        priceVolatility: 18, // percentage
        averagePrice: 3.7,
        priceChange: 10.2, // percentage
        supplyGrowth: 7.5, // percentage
      },
    }

    return mockData[crop] || mockData.tomatoes
  }

  // Get current crop data
  const currentCropData = cropData[selectedCrop] || {}

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading market analysis data...</p>
      </div>
    )
  }

  // Error state
  if (error && !cropData[selectedCrop]) {
    return (
      <div className="container mx-auto p-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <p className="mt-2">Please try again later or contact support if the problem persists.</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                setError(null)
                setCropData({
                  ...cropData,
                  [selectedCrop]: getMockDataForCrop(selectedCrop),
                })
              }}
            >
              Load Sample Data
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Market Analysis Dashboard</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48">
            <Select
              value={selectedCrop}
              onValueChange={(value) => {
                setSelectedCrop(value)
                // Clear any previous errors
                setError(null)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Crop" />
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

          <div className="w-full sm:w-48">
            <Select
              value={selectedTimePeriod}
              onValueChange={(value) => {
                setSelectedTimePeriod(value)
                // Clear any previous errors
                setError(null)
                // Force a refresh of data for the new time period
                setCropData({
                  ...cropData,
                  [selectedCrop]: null,
                })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price (KES/kg)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCropData.averagePrice?.toFixed(2) || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              <span className={currentCropData.priceChange > 0 ? "text-green-500" : "text-red-500"}>
                {currentCropData.priceChange > 0 ? "+" : ""}
                {currentCropData.priceChange || 0}%
              </span>{" "}
              from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Volatility</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCropData.priceVolatility || 0}%</div>
            <p className="text-xs text-muted-foreground">Price fluctuation over the period</p>
            <Progress className="mt-2" value={currentCropData.priceVolatility || 0} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supply Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCropData.supplyGrowth || 0}%</div>
            <p className="text-xs text-muted-foreground">Increase in supply volume</p>
            <Progress className="mt-2" value={currentCropData.supplyGrowth || 0} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6" onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="prices">Prices</TabsTrigger>
          <TabsTrigger value="supply">Supply</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market History and Price Prediction</CardTitle>
                <CardDescription>Historical and predicted prices for {currentCropLabel}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentCropData.marketHistory || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" name="Actual Price" />
                    <Line type="monotone" dataKey="prediction" stroke="#82ca9d" name="Predicted Price" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Share Distribution</CardTitle>
                <CardDescription>Market share by trading location</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currentCropData.marketShare || []}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {(currentCropData.marketShare || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Seasonal Price and Demand Trends</CardTitle>
              <CardDescription>Annual patterns for {currentCropLabel}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={currentCropData.seasonalTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" name="Price (KES/kg)" />
                  <Line yAxisId="right" type="monotone" dataKey="demand" stroke="#82ca9d" name="Demand Index" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wholesale vs Retail Price Trends</CardTitle>
              <CardDescription>Comparison of wholesale and retail prices</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentCropData.priceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="wholesale" fill="#8884d8" name="Wholesale Price" />
                  <Bar dataKey="retail" fill="#82ca9d" name="Retail Price" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Margin Analysis</CardTitle>
              <CardDescription>Retail-wholesale price difference over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={currentCropData.priceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="retail"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Retail Price"
                  />
                  <Area
                    type="monotone"
                    dataKey="wholesale"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Wholesale Price"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supply" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supply Volume Trend</CardTitle>
              <CardDescription>Monthly supply volume in kilograms</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={currentCropData.supplyVolume || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="volume" stroke="#8884d8" fill="#8884d8" name="Supply Volume (kg)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supply-Price Correlation</CardTitle>
                <CardDescription>How supply affects market prices</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      data={currentCropData.supplyVolume || []}
                      dataKey="volume"
                      stroke="#8884d8"
                      name="Supply Volume"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      data={currentCropData.marketHistory || []}
                      dataKey="price"
                      stroke="#82ca9d"
                      name="Price"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supply Forecast</CardTitle>
                <CardDescription>Projected supply for next 3 months</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Projected Growth</p>
                  <div className="text-4xl font-bold text-primary mb-2">+{currentCropData.supplyGrowth || 0}%</div>
                  <p className="text-sm text-muted-foreground">Based on historical trends and seasonal patterns</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Price Comparison</CardTitle>
              <CardDescription>Prices across different counties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentCropData.regionalPrices || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="county" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="#8884d8" name="Price (KES/kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Supply Distribution</CardTitle>
                <CardDescription>Major growing regions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Central", value: 35 },
                        { name: "Rift Valley", value: 25 },
                        { name: "Eastern", value: 20 },
                        { name: "Western", value: 15 },
                        { name: "Other Regions", value: 5 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {(currentCropData.marketShare || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transport Cost Impact</CardTitle>
                <CardDescription>How distance affects final price</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { distance: "0-50km", cost: 0.2 },
                      { distance: "51-100km", cost: 0.5 },
                      { distance: "101-200km", cost: 0.8 },
                      { distance: "201-300km", cost: 1.2 },
                      { distance: ">300km", cost: 1.5 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="distance" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cost" stroke="#8884d8" name="Transport Cost (KES/kg)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Market Insights for {currentCropLabel}</CardTitle>
          <CardDescription>Key observations and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Price Trend</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentCropData.priceChange > 0
                  ? `Prices have increased by ${currentCropData.priceChange}% over the last period. Consider timing your sales to maximize profits.`
                  : `Prices have decreased by ${Math.abs(currentCropData.priceChange || 0)}% over the last period. Consider holding inventory if possible.`}
              </p>
            </div>

            <div className="flex flex-col p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChartIcon className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Supply Insight</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Supply has grown by {currentCropData.supplyGrowth || 0}% recently.
                {(currentCropData.supplyGrowth || 0) > 10
                  ? " Market may be approaching saturation. Consider diversifying crops."
                  : " There's still room for growth in this market."}
              </p>
            </div>

            <div className="flex flex-col p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Map className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Regional Opportunity</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentCropData.regionalPrices && currentCropData.regionalPrices.length > 0
                  ? `Highest prices observed in ${currentCropData.regionalPrices[0].county}. Consider targeting this market for better returns on your produce.`
                  : "Regional price data not available. Check back later for regional insights."}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Calendar className="mr-2 h-4 w-4" /> View Detailed Market Calendar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MarketAnalysisDashboard

