// Level definitions

const levels = [
    {
        id: 1,
        name: "First Steps",
        hint: "Try moving the shape right and up to reach the target",
        shape: { type: "triangle", points: [[1, 1], [3, 1], [2, 3]] },
        target: { type: "triangle", points: [[4, 3], [6, 3], [5, 5]] },
        parMoves: 1
    },
    {
        id: 2,
        name: "Going Negative",
        hint: "Remember: negative x moves left, negative y moves down",
        shape: { type: "L-shape", points: [[6, 6], [7, 6], [7, 8], [6, 8]] },
        target: { type: "L-shape", points: [[2, 2], [3, 2], [3, 4], [2, 4]] },
        parMoves: 1
    },
    {
        id: 3,
        name: "Big Jump",
        hint: "Look at how far the shape needs to move - you'll need larger numbers!",
        shape: { type: "T-shape", points: [[1, 1], [2, 1], [3, 1], [2, 2]] },
        target: { type: "T-shape", points: [[7, 7], [8, 7], [9, 7], [8, 8]] },
        parMoves: 1
    },
    {
        id: 4,
        name: "Square Deal",
        hint: "All four corners need to move the same amount",
        shape: { type: "square", points: [[2, 2], [4, 2], [4, 4], [2, 4]] },
        target: { type: "square", points: [[5, 5], [7, 5], [7, 7], [5, 7]] },
        parMoves: 1
    },
    {
        id: 5,
        name: "The Master",
        hint: "Can you complete this in just one translation?",
        shape: { type: "Z-shape", points: [[-2, -3], [-1, -3], [-1, -2], [0, -2]] },
        target: { type: "Z-shape", points: [[4, 5], [5, 5], [5, 6], [6, 6]] },
        parMoves: 1
    }
];