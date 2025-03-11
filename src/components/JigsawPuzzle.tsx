import React, { useState, useEffect } from 'react'

interface PuzzlePiece {
  id: number
  imgData: string
  originalIndex: number
}

interface JigsawPuzzleProps {
  puzzleImage: string
  rows: number
  cols: number
}

const JigsawPuzzle: React.FC<JigsawPuzzleProps> = ({ puzzleImage, rows, cols }) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const [pieceWidth, setPieceWidth] = useState(0)
  const [pieceHeight, setPieceHeight] = useState(0)
  const [accuracy, setAccuracy] = useState<number | null>(null)

  useEffect(() => {
    const image = new Image()
    image.src = puzzleImage
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(image, 0, 0)
      const pWidth = Math.floor(image.width / cols)
      const pHeight = Math.floor(image.height / rows)
      setPieceWidth(pWidth)
      setPieceHeight(pHeight)
      const tempPieces: PuzzlePiece[] = []
      let idCounter = 0
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const pieceCanvas = document.createElement('canvas')
          pieceCanvas.width = pWidth
          pieceCanvas.height = pHeight
          const pieceCtx = pieceCanvas.getContext('2d')
          if (pieceCtx) {
            pieceCtx.drawImage(
              canvas,
              col * pWidth,
              row * pHeight,
              pWidth,
              pHeight,
              0,
              0,
              pWidth,
              pHeight
            )
            const dataUrl = pieceCanvas.toDataURL()
            tempPieces.push({
              id: idCounter,
              imgData: dataUrl,
              originalIndex: idCounter
            })
            idCounter++
          }
        }
      }
      // Shuffle the pieces
      for (let i = tempPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = tempPieces[i]
        tempPieces[i] = tempPieces[j]
        tempPieces[j] = temp
      }
      setPieces(tempPieces)
    }
  }, [puzzleImage, rows, cols])

  const handlePieceClick = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index)
    } else {
      // Swap pieces
      const newPieces = [...pieces]
      const temp = newPieces[selectedPiece]
      newPieces[selectedPiece] = newPieces[index]
      newPieces[index] = temp
      setPieces(newPieces)
      setSelectedPiece(null)
      setAccuracy(null)
    }
  }

  const checkAccuracy = () => {
    const correctCount = pieces.filter((piece, index) => piece.originalIndex === index).length
    const percent = Math.round((correctCount / pieces.length) * 100)
    setAccuracy(percent)
  }

  // Check if puzzle solved automatically
  const isSolved = pieces.every((piece, index) => piece.originalIndex === index)

  return (
    <div className="flex flex-col items-center">
      {isSolved && (
        <div className="mb-4 text-green-600 text-xl font-bold">
          Puzzle Completed!
        </div>
      )}
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${pieceWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${pieceHeight}px)`
        }}
      >
        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            onClick={() => handlePieceClick(index)}
            className={`border cursor-pointer ${selectedPiece === index ? 'border-blue-500' : 'border-gray-300'}`}
          >
            <img src={piece.imgData} alt={`Piece ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center">
        <button
          onClick={checkAccuracy}
          className="mb-2 flex items-center space-x-2 bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
        >
          <span>パズル完成</span>
        </button>
        {accuracy !== null && (
          <div className="text-lg font-semibold">
            正解度: {accuracy}%
          </div>
        )}
      </div>
    </div>
  )
}

export default JigsawPuzzle
