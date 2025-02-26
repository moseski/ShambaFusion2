
import React, { useState, useRef } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "../ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Upload, AlertCircle, Leaf, Sprout, Zap, Book, ThumbsUp, ThumbsDown, Camera } from 'lucide-react'
import { Link } from 'react-router-dom'
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
  } from "recharts"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
const MarketAnalysisDashboard = () => {  
  const marketHistoryData = [
    { date: "2023-01", price: 2.5, prediction: 2.6 },
    { date: "2023-02", price: 2.7, prediction: 2.8 },
    { date: "2023-03", price: 2.9, prediction: 3.0 },
    { date: "2023-04", price: 3.1, prediction: 3.2 },
    { date: "2023-05", price: 3.3, prediction: 3.4 },
    { date: "2023-06", price: 3.5, prediction: 3.6 },
  ]
  
  const priceTrendData = [
    { month: "Jan", wholesale: 2.2, retail: 3.5 },
    { month: "Feb", wholesale: 2.4, retail: 3.7 },
    { month: "Mar", wholesale: 2.6, retail: 3.9 },
    { month: "Apr", wholesale: 2.8, retail: 4.1 },
    { month: "May", wholesale: 3.0, retail: 4.3 },
    { month: "Jun", wholesale: 3.2, retail: 4.5 },
  ]
  
  const supplyVolumeData = [
    { month: "Jan", volume: 1000 },
    { month: "Feb", volume: 1200 },
    { month: "Mar", volume: 1400 },
    { month: "Apr", volume: 1600 },
    { month: "May", volume: 1800 },
    { month: "Jun", volume: 2000 },
  ]
  
 
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Tomato Market Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Market History and Price Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketHistoryData}>
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
              <CardTitle>Wholesale vs Retail Price Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceTrendData}>
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
  
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Supply Volume Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={supplyVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="volume" stroke="#8884d8" name="Supply Volume" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    )

};

export default MarketAnalysisDashboard;