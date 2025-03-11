import React from 'react'
import DrawingBoard from './components/DrawingBoard'
import { Camera } from 'lucide-react'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Camera className="h-10 w-10 text-blue-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">Creative Drawing App</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80"
          alt="Inspiring artwork"
          className="w-full h-64 object-cover rounded-md shadow-md"
        />
        <div className="mt-6">
          <DrawingBoard />
        </div>
      </main>
    </div>
  )
}

export default App
