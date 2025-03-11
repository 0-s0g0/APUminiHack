import React, { useRef, useState, useEffect } from 'react'
import { Save, Puzzle } from 'lucide-react'
import JigsawPuzzle from './JigsawPuzzle'

const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [puzzleMode, setPuzzleMode] = useState(false)
  const [puzzleImage, setPuzzleImage] = useState('')
  
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.lineCap = 'round'
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 4
        setContext(ctx)
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent) => {
    if (!context) return
    context.beginPath()
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !context) return
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    context.stroke()
  }

  const endDrawing = () => {
    if (!context) return
    context.closePath()
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  const convertToPuzzle = () => {
    if (!canvasRef.current) return
    const dataUrl = canvasRef.current.toDataURL()
    setPuzzleImage(dataUrl)
    setPuzzleMode(true)
  }

  if (puzzleMode) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Jigsaw Puzzle</h2>
        <JigsawPuzzle puzzleImage={puzzleImage} rows={3} cols={3} />
        <button
          onClick={() => { setPuzzleMode(false); clearCanvas() }}
          className="mt-4 flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          <Puzzle size={20} />
          <span>Back to Drawing</span>
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center p-4 bg-white shadow">
        <h2 className="text-2xl font-bold">Draw Your Idea</h2>
        <div className="space-x-2">
          <button
            onClick={clearCanvas}
            className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            <Save size={20} />
            <span>Clear</span>
          </button>
          <button
            onClick={convertToPuzzle}
            className="flex items-center space-x-2 bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
          >
            <Puzzle size={20} />
            <span>Make Puzzle</span>
          </button>
        </div>
      </div>
      <div className="mt-4 border border-gray-300 shadow-md">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="block bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        ></canvas>
      </div>
    </div>
  )
}

export default DrawingBoard
