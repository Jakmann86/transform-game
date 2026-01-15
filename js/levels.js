// Complete level definitions with variations
// All shapes guaranteed to stay within -9 to 9 grid bounds

const levels = [
    // ============================================
    // WORLD 1: TRANSLATIONS (Levels 1-5)
    // ============================================
    {
        id: 1,
        world: 1,
        worldName: "TRANSLATIONS",
        name: "First Steps",
        hint: "Move the shape right and up using positive values",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[1, 1], [3, 1], [2, 3]] },
                target: { type: "triangle", points: [[5, 4], [7, 4], [6, 6]] }
            },
            {
                shape: { type: "square", points: [[1, 1], [3, 1], [3, 3], [1, 3]] },
                target: { type: "square", points: [[5, 5], [7, 5], [7, 7], [5, 7]] }
            },
            {
                shape: { type: "triangle", points: [[2, 2], [4, 2], [3, 4]] },
                target: { type: "triangle", points: [[5, 5], [7, 5], [6, 7]] }
            }
        ]
    },
    {
        id: 2,
        world: 1,
        worldName: "TRANSLATIONS",
        name: "Going Negative",
        hint: "Use negative values to move left and down",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[6, 6], [8, 6], [7, 8]] },
                target: { type: "triangle", points: [[2, 2], [4, 2], [3, 4]] }
            },
            {
                shape: { type: "square", points: [[5, 5], [7, 5], [7, 7], [5, 7]] },
                target: { type: "square", points: [[1, 1], [3, 1], [3, 3], [1, 3]] }
            },
            {
                shape: { type: "L-shape", points: [[5, 4], [6, 4], [6, 6], [7, 6], [7, 7], [5, 7]] },
                target: { type: "L-shape", points: [[1, 1], [2, 1], [2, 3], [3, 3], [3, 4], [1, 4]] }
            }
        ]
    },
    {
        id: 3,
        world: 1,
        worldName: "TRANSLATIONS",
        name: "Mixed Signs",
        hint: "Sometimes x is positive while y is negative (or vice versa)",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[-6, 2], [-4, 2], [-5, 4]] },
                target: { type: "triangle", points: [[2, -3], [4, -3], [3, -1]] }
            },
            {
                shape: { type: "T-shape", points: [[1, 6], [2, 6], [3, 6], [2, 7], [2, 8]] },
                target: { type: "T-shape", points: [[5, 1], [6, 1], [7, 1], [6, 2], [6, 3]] }
            },
            {
                shape: { type: "square", points: [[-5, -6], [-3, -6], [-3, -4], [-5, -4]] },
                target: { type: "square", points: [[3, 2], [5, 2], [5, 4], [3, 4]] }
            }
        ]
    },
    {
        id: 4,
        world: 1,
        worldName: "TRANSLATIONS",
        name: "Across the Origin",
        hint: "Move from one quadrant to another",
        parMoves: 1,
        variations: [
            {
                shape: { type: "Z-shape", points: [[-6, -5], [-5, -5], [-5, -6], [-4, -6]] },
                target: { type: "Z-shape", points: [[3, 4], [4, 4], [4, 3], [5, 3]] }
            },
            {
                shape: { type: "triangle", points: [[5, -6], [7, -6], [6, -4]] },
                target: { type: "triangle", points: [[-4, 3], [-2, 3], [-3, 5]] }
            },
            {
                shape: { type: "S-shape", points: [[-5, 5], [-4, 5], [-4, 6], [-3, 6]] },
                target: { type: "S-shape", points: [[4, -4], [5, -4], [5, -3], [6, -3]] }
            }
        ]
    },
    {
        id: 5,
        world: 1,
        worldName: "TRANSLATIONS",
        name: "The Big Jump",
        hint: "Sometimes you need larger numbers!",
        parMoves: 1,
        variations: [
            {
                shape: { type: "L-shape", points: [[-7, -6], [-6, -6], [-6, -4], [-5, -4], [-5, -3], [-7, -3]] },
                target: { type: "L-shape", points: [[3, 4], [4, 4], [4, 6], [5, 6], [5, 7], [3, 7]] }
            },
            {
                shape: { type: "triangle", points: [[-8, -7], [-6, -7], [-7, -5]] },
                target: { type: "triangle", points: [[5, 5], [7, 5], [6, 7]] }
            },
            {
                shape: { type: "J-shape", points: [[6, -7], [7, -7], [7, -5], [6, -5], [6, -4], [5, -4]] },
                target: { type: "J-shape", points: [[-6, 4], [-5, 4], [-5, 6], [-6, 6], [-6, 7], [-7, 7]] }
            }
        ]
    },

    // ============================================
    // WORLD 2: REFLECTIONS (Levels 6-12)
    // ============================================
    {
        id: 6,
        world: 2,
        worldName: "REFLECTIONS",
        name: "Mirror in Y-Axis",
        hint: "Reflect across the y-axis (x = 0)",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[3, 2], [5, 2], [4, 4]] },
                target: { type: "triangle", points: [[-3, 2], [-5, 2], [-4, 4]] }
            },
            {
                shape: { type: "L-shape", points: [[4, 1], [5, 1], [5, 3], [6, 3], [6, 4], [4, 4]] },
                target: { type: "L-shape", points: [[-4, 1], [-5, 1], [-5, 3], [-6, 3], [-6, 4], [-4, 4]] }
            },
            {
                shape: { type: "square", points: [[2, 5], [4, 5], [4, 7], [2, 7]] },
                target: { type: "square", points: [[-2, 5], [-4, 5], [-4, 7], [-2, 7]] }
            }
        ]
    },
    {
        id: 7,
        world: 2,
        worldName: "REFLECTIONS",
        name: "Mirror in X-Axis",
        hint: "Reflect across the x-axis (y = 0)",
        parMoves: 1,
        variations: [
            {
                shape: { type: "T-shape", points: [[2, 4], [3, 4], [4, 4], [3, 5], [3, 6]] },
                target: { type: "T-shape", points: [[2, -4], [3, -4], [4, -4], [3, -5], [3, -6]] }
            },
            {
                shape: { type: "triangle", points: [[-3, 5], [-1, 5], [-2, 7]] },
                target: { type: "triangle", points: [[-3, -5], [-1, -5], [-2, -7]] }
            },
            {
                shape: { type: "Z-shape", points: [[4, 3], [5, 3], [5, 4], [6, 4]] },
                target: { type: "Z-shape", points: [[4, -3], [5, -3], [5, -4], [6, -4]] }
            }
        ]
    },
    {
        id: 8,
        world: 2,
        worldName: "REFLECTIONS",
        name: "Vertical Line x = k",
        hint: "Reflect across a vertical line that's not the y-axis",
        parMoves: 1,
        variations: [
            {
                shape: { type: "square", points: [[5, 2], [7, 2], [7, 4], [5, 4]] },
                target: { type: "square", points: [[1, 2], [-1, 2], [-1, 4], [1, 4]] }
            },
            {
                shape: { type: "triangle", points: [[4, 3], [6, 3], [5, 5]] },
                target: { type: "triangle", points: [[-2, 3], [-4, 3], [-3, 5]] }
            },
            {
                shape: { type: "S-shape", points: [[5, -2], [6, -2], [6, -1], [7, -1]] },
                target: { type: "S-shape", points: [[-1, -2], [-2, -2], [-2, -1], [-3, -1]] }
            }
        ]
    },
    {
        id: 9,
        world: 2,
        worldName: "REFLECTIONS",
        name: "Horizontal Line y = k",
        hint: "Reflect across a horizontal line that's not the x-axis",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[-4, 5], [-2, 5], [-3, 7]] },
                target: { type: "triangle", points: [[-4, -1], [-2, -1], [-3, -3]] }
            },
            {
                shape: { type: "T-shape", points: [[1, 4], [2, 4], [3, 4], [2, 5], [2, 6]] },
                target: { type: "T-shape", points: [[1, -2], [2, -2], [3, -2], [2, -3], [2, -4]] }
            },
            {
                shape: { type: "square", points: [[4, 5], [6, 5], [6, 7], [4, 7]] },
                target: { type: "square", points: [[4, -1], [6, -1], [6, -3], [4, -3]] }
            }
        ]
    },
    {
        id: 10,
        world: 2,
        worldName: "REFLECTIONS",
        name: "Another Vertical",
        hint: "Find the right line of reflection",
        parMoves: 1,
        variations: [
            {
                shape: { type: "J-shape", points: [[-5, 3], [-4, 3], [-4, 5], [-5, 5], [-5, 6], [-6, 6]] },
                target: { type: "J-shape", points: [[1, 3], [0, 3], [0, 5], [1, 5], [1, 6], [2, 6]] }
            },
            {
                shape: { type: "square", points: [[-3, -2], [-1, -2], [-1, 0], [-3, 0]] },
                target: { type: "square", points: [[5, -2], [3, -2], [3, 0], [5, 0]] }
            },
            {
                shape: { type: "triangle", points: [[-6, 4], [-4, 4], [-5, 6]] },
                target: { type: "triangle", points: [[2, 4], [0, 4], [1, 6]] }
            }
        ]
    },
    {
        id: 11,
        world: 2,
        worldName: "REFLECTIONS",
        name: "Diagonal y = x",
        hint: "Reflect across the line y = x (coordinates swap!)",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[2, 5], [4, 5], [3, 7]] },
                target: { type: "triangle", points: [[5, 2], [5, 4], [7, 3]] }
            },
            {
                shape: { type: "square", points: [[1, 5], [3, 5], [3, 7], [1, 7]] },
                target: { type: "square", points: [[5, 1], [5, 3], [7, 3], [7, 1]] }
            },
            {
                shape: { type: "L-shape", points: [[-2, 4], [-1, 4], [-1, 6], [0, 6], [0, 7], [-2, 7]] },
                target: { type: "L-shape", points: [[4, -2], [4, -1], [6, -1], [6, 0], [7, 0], [7, -2]] }
            }
        ]
    },
    {
        id: 12,
        world: 2,
        worldName: "REFLECTIONS",
        name: "Diagonal y = -x",
        hint: "Reflect across the line y = -x",
        parMoves: 1,
        variations: [
            {
                shape: { type: "Z-shape", points: [[3, 3], [4, 3], [4, 4], [5, 4]] },
                target: { type: "Z-shape", points: [[-3, -3], [-3, -4], [-4, -4], [-4, -5]] }
            },
            {
                shape: { type: "triangle", points: [[4, 2], [6, 2], [5, 4]] },
                target: { type: "triangle", points: [[-2, -4], [-2, -6], [-4, -5]] }
            },
            {
                shape: { type: "T-shape", points: [[2, 5], [3, 5], [4, 5], [3, 6], [3, 7]] },
                target: { type: "T-shape", points: [[-5, -2], [-5, -3], [-5, -4], [-6, -3], [-7, -3]] }
            }
        ]
    },

    // ============================================
    // WORLD 3: ROTATIONS (Levels 13-17)
    // ============================================
    {
        id: 13,
        world: 3,
        worldName: "ROTATIONS",
        name: "90° Around Origin",
        hint: "Rotate 90° anticlockwise around (0, 0)",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[3, 1], [5, 1], [4, 3]] },
                target: { type: "triangle", points: [[-1, 3], [-1, 5], [-3, 4]] }
            },
            {
                shape: { type: "square", points: [[4, 2], [6, 2], [6, 4], [4, 4]] },
                target: { type: "square", points: [[-2, 4], [-2, 6], [-4, 6], [-4, 4]] }
            },
            {
                shape: { type: "L-shape", points: [[3, 1], [4, 1], [4, 3], [5, 3], [5, 4], [3, 4]] },
                target: { type: "L-shape", points: [[-1, 3], [-1, 4], [-3, 4], [-3, 5], [-4, 5], [-4, 3]] }
            }
        ]
    },
    {
        id: 14,
        world: 3,
        worldName: "ROTATIONS",
        name: "180° Around Origin",
        hint: "Rotate 180° around (0, 0) - everything flips!",
        parMoves: 1,
        variations: [
            {
                shape: { type: "T-shape", points: [[3, 4], [4, 4], [5, 4], [4, 5], [4, 6]] },
                target: { type: "T-shape", points: [[-3, -4], [-4, -4], [-5, -4], [-4, -5], [-4, -6]] }
            },
            {
                shape: { type: "triangle", points: [[5, 2], [7, 2], [6, 4]] },
                target: { type: "triangle", points: [[-5, -2], [-7, -2], [-6, -4]] }
            },
            {
                shape: { type: "Z-shape", points: [[2, 5], [3, 5], [3, 6], [4, 6]] },
                target: { type: "Z-shape", points: [[-2, -5], [-3, -5], [-3, -6], [-4, -6]] }
            }
        ]
    },
    {
        id: 15,
        world: 3,
        worldName: "ROTATIONS",
        name: "270° Around Origin",
        hint: "270° anticlockwise = 90° clockwise",
        parMoves: 1,
        variations: [
            {
                shape: { type: "square", points: [[2, 4], [4, 4], [4, 6], [2, 6]] },
                target: { type: "square", points: [[4, -2], [4, -4], [6, -4], [6, -2]] }
            },
            {
                shape: { type: "J-shape", points: [[-3, 4], [-2, 4], [-2, 6], [-3, 6], [-3, 7], [-4, 7]] },
                target: { type: "J-shape", points: [[4, 3], [4, 2], [6, 2], [6, 3], [7, 3], [7, 4]] }
            },
            {
                shape: { type: "triangle", points: [[1, 5], [3, 5], [2, 7]] },
                target: { type: "triangle", points: [[5, -1], [5, -3], [7, -2]] }
            }
        ]
    },
    {
        id: 16,
        world: 3,
        worldName: "ROTATIONS",
        name: "90° Around a Point",
        hint: "Rotate around (2, 2) - not the origin!",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[5, 2], [7, 2], [6, 4]] },
                target: { type: "triangle", points: [[2, 5], [2, 7], [0, 6]] }
            },
            {
                shape: { type: "square", points: [[4, 0], [6, 0], [6, 2], [4, 2]] },
                target: { type: "square", points: [[0, 4], [0, 6], [2, 6], [2, 4]] }
            },
            {
                shape: { type: "S-shape", points: [[4, 3], [5, 3], [5, 4], [6, 4]] },
                target: { type: "S-shape", points: [[1, 4], [1, 5], [0, 5], [0, 6]] }
            }
        ]
    },
    {
        id: 17,
        world: 3,
        worldName: "ROTATIONS",
        name: "180° Around a Point",
        hint: "Rotate 180° around (-1, 1)",
        parMoves: 1,
        variations: [
            {
                shape: { type: "T-shape", points: [[3, 3], [4, 3], [5, 3], [4, 4], [4, 5]] },
                target: { type: "T-shape", points: [[-5, -1], [-6, -1], [-7, -1], [-6, -2], [-6, -3]] }
            },
            {
                shape: { type: "triangle", points: [[2, 4], [4, 4], [3, 6]] },
                target: { type: "triangle", points: [[-4, -2], [-6, -2], [-5, -4]] }
            },
            {
                shape: { type: "square", points: [[1, 3], [3, 3], [3, 5], [1, 5]] },
                target: { type: "square", points: [[-3, -1], [-5, -1], [-5, -3], [-3, -3]] }
            }
        ]
    },

    // ============================================
    // WORLD 4: MIXED TRANSFORMATIONS (Levels 18-22)
    // ============================================
    {
        id: 18,
        world: 4,
        worldName: "MIXED",
        name: "Translation or Reflection?",
        hint: "Multiple tools could work - find the easiest!",
        parMoves: 1,
        variations: [
            {
                shape: { type: "triangle", points: [[3, 2], [5, 2], [4, 4]] },
                target: { type: "triangle", points: [[-3, 2], [-5, 2], [-4, 4]] }
            },
            {
                shape: { type: "square", points: [[2, -4], [4, -4], [4, -2], [2, -2]] },
                target: { type: "square", points: [[2, 4], [4, 4], [4, 2], [2, 2]] }
            },
            {
                shape: { type: "L-shape", points: [[4, 3], [5, 3], [5, 5], [6, 5], [6, 6], [4, 6]] },
                target: { type: "L-shape", points: [[-2, 3], [-3, 3], [-3, 5], [-4, 5], [-4, 6], [-2, 6]] }
            }
        ]
    },
    {
        id: 19,
        world: 4,
        worldName: "MIXED",
        name: "Rotation or Reflection?",
        hint: "Think about symmetry...",
        parMoves: 1,
        variations: [
            {
                shape: { type: "T-shape", points: [[4, 2], [5, 2], [6, 2], [5, 3], [5, 4]] },
                target: { type: "T-shape", points: [[-4, -2], [-5, -2], [-6, -2], [-5, -3], [-5, -4]] }
            },
            {
                shape: { type: "triangle", points: [[3, 5], [5, 5], [4, 7]] },
                target: { type: "triangle", points: [[5, 3], [5, 5], [7, 4]] }
            },
            {
                shape: { type: "square", points: [[2, 5], [4, 5], [4, 7], [2, 7]] },
                target: { type: "square", points: [[5, 2], [5, 4], [7, 4], [7, 2]] }
            }
        ]
    },
    {
        id: 20,
        world: 4,
        worldName: "MIXED",
        name: "Any Single Transform",
        hint: "One transformation will do it",
        parMoves: 1,
        variations: [
            {
                shape: { type: "J-shape", points: [[5, 1], [6, 1], [6, 3], [5, 3], [5, 4], [4, 4]] },
                target: { type: "J-shape", points: [[1, 5], [1, 6], [3, 6], [3, 5], [4, 5], [4, 4]] }
            },
            {
                shape: { type: "Z-shape", points: [[4, 3], [5, 3], [5, 4], [6, 4]] },
                target: { type: "Z-shape", points: [[-2, 1], [-3, 1], [-3, 2], [-4, 2]] }
            },
            {
                shape: { type: "triangle", points: [[6, 2], [8, 2], [7, 4]] },
                target: { type: "triangle", points: [[2, 6], [2, 8], [4, 7]] }
            }
        ]
    },
    {
        id: 21,
        world: 4,
        worldName: "MIXED",
        name: "Choose Wisely",
        hint: "All three tools work - which is simplest?",
        parMoves: 1,
        variations: [
            {
                shape: { type: "square", points: [[4, 4], [6, 4], [6, 6], [4, 6]] },
                target: { type: "square", points: [[-4, 4], [-6, 4], [-6, 6], [-4, 6]] }
            },
            {
                shape: { type: "triangle", points: [[3, 3], [5, 3], [4, 5]] },
                target: { type: "triangle", points: [[3, -3], [5, -3], [4, -5]] }
            },
            {
                shape: { type: "T-shape", points: [[4, 2], [5, 2], [6, 2], [5, 3], [5, 4]] },
                target: { type: "T-shape", points: [[-4, -2], [-5, -2], [-6, -2], [-5, -3], [-5, -4]] }
            }
        ]
    },
    {
        id: 22,
        world: 4,
        worldName: "MIXED",
        name: "The Elegant Solution",
        hint: "One method is much cleaner than the others",
        parMoves: 1,
        variations: [
            {
                shape: { type: "L-shape", points: [[5, 3], [6, 3], [6, 5], [7, 5], [7, 6], [5, 6]] },
                target: { type: "L-shape", points: [[3, -1], [3, -2], [5, -2], [5, -3], [6, -3], [6, -1]] }
            },
            {
                shape: { type: "Z-shape", points: [[5, 1], [6, 1], [6, 2], [7, 2]] },
                target: { type: "Z-shape", points: [[1, 5], [1, 6], [2, 6], [2, 7]] }
            },
            {
                shape: { type: "S-shape", points: [[6, 2], [7, 2], [7, 3], [8, 3]] },
                target: { type: "S-shape", points: [[-2, 6], [-2, 7], [-3, 7], [-3, 8]] }
            }
        ]
    },

    // ============================================
    // WORLD 5: COMBINED TRANSFORMATIONS (Levels 23-27)
    // ============================================
    {
        id: 23,
        world: 5,
        worldName: "COMBINED",
        name: "Two Steps Required",
        hint: "You'll need two transformations",
        parMoves: 2,
        variations: [
            {
                shape: { type: "triangle", points: [[4, 2], [6, 2], [5, 4]] },
                target: { type: "triangle", points: [[-6, 5], [-4, 5], [-5, 7]] }
            },
            {
                shape: { type: "L-shape", points: [[5, 4], [6, 4], [6, 6], [7, 6], [7, 7], [5, 7]] },
                target: { type: "L-shape", points: [[-3, -2], [-4, -2], [-4, -4], [-5, -4], [-5, -5], [-3, -5]] }
            },
            {
                shape: { type: "T-shape", points: [[5, 1], [6, 1], [7, 1], [6, 2], [6, 3]] },
                target: { type: "T-shape", points: [[-1, 5], [-1, 6], [-1, 7], [-2, 6], [-3, 6]] }
            }
        ]
    },
    {
        id: 24,
        world: 5,
        worldName: "COMBINED",
        name: "Reflect Then Move",
        hint: "Mirror first, then translate",
        parMoves: 2,
        variations: [
            {
                shape: { type: "T-shape", points: [[4, 5], [5, 5], [6, 5], [5, 6], [5, 7]] },
                target: { type: "T-shape", points: [[1, -6], [2, -6], [3, -6], [2, -7], [2, -8]] }
            },
            {
                shape: { type: "triangle", points: [[-5, 3], [-3, 3], [-4, 5]] },
                target: { type: "triangle", points: [[6, 6], [4, 6], [5, 8]] }
            },
            {
                shape: { type: "S-shape", points: [[-5, 2], [-4, 2], [-4, 3], [-3, 3]] },
                target: { type: "S-shape", points: [[4, -5], [5, -5], [5, -4], [6, -4]] }
            }
        ]
    },
    {
        id: 25,
        world: 5,
        worldName: "COMBINED",
        name: "Rotate Then Move",
        hint: "Spin it first, then shift it",
        parMoves: 2,
        variations: [
            {
                shape: { type: "L-shape", points: [[4, 4], [5, 4], [5, 6], [6, 6], [6, 7], [4, 7]] },
                target: { type: "L-shape", points: [[-3, 4], [-3, 5], [-5, 5], [-5, 6], [-6, 6], [-6, 4]] }
            },
            {
                shape: { type: "Z-shape", points: [[5, 2], [6, 2], [6, 3], [7, 3]] },
                target: { type: "Z-shape", points: [[-5, -3], [-6, -3], [-6, -4], [-7, -4]] }
            },
            {
                shape: { type: "triangle", points: [[6, 3], [8, 3], [7, 5]] },
                target: { type: "triangle", points: [[-2, 4], [-2, 6], [-4, 5]] }
            }
        ]
    },
    {
        id: 26,
        world: 5,
        worldName: "COMBINED",
        name: "Move Then Rotate",
        hint: "Translate first, then spin",
        parMoves: 2,
        variations: [
            {
                shape: { type: "J-shape", points: [[6, 5], [7, 5], [7, 7], [6, 7], [6, 8], [5, 8]] },
                target: { type: "J-shape", points: [[-3, 1], [-3, 2], [-5, 2], [-5, 1], [-6, 1], [-6, 0]] }
            },
            {
                shape: { type: "T-shape", points: [[6, 2], [7, 2], [8, 2], [7, 3], [7, 4]] },
                target: { type: "T-shape", points: [[-1, 3], [-1, 4], [-1, 5], [-2, 4], [-3, 4]] }
            },
            {
                shape: { type: "Z-shape", points: [[5, 1], [6, 1], [6, 2], [7, 2]] },
                target: { type: "Z-shape", points: [[-1, 4], [-1, 5], [-2, 5], [-2, 6]] }
            }
        ]
    },
    {
        id: 27,
        world: 5,
        worldName: "COMBINED",
        name: "Rotate Then Reflect",
        hint: "Spin it, then flip it",
        parMoves: 2,
        variations: [
            {
                shape: { type: "triangle", points: [[4, 5], [6, 5], [5, 7]] },
                target: { type: "triangle", points: [[5, -4], [5, -6], [7, -5]] }
            },
            {
                shape: { type: "L-shape", points: [[3, 4], [4, 4], [4, 6], [5, 6], [5, 7], [3, 7]] },
                target: { type: "L-shape", points: [[-3, -4], [-4, -4], [-4, -6], [-5, -6], [-5, -7], [-3, -7]] }
            },
            {
                shape: { type: "S-shape", points: [[5, 3], [6, 3], [6, 4], [7, 4]] },
                target: { type: "S-shape", points: [[3, -5], [3, -6], [4, -6], [4, -7]] }
            }
        ]
    },

    // ============================================
    // WORLD 6: MASTER CHALLENGE (Levels 28-30)
    // ============================================
    {
        id: 28,
        world: 6,
        worldName: "MASTER",
        name: "Complex Combo",
        hint: "Think carefully about the order...",
        parMoves: 2,
        variations: [
            {
                shape: { type: "Z-shape", points: [[5, 4], [6, 4], [6, 5], [7, 5]] },
                target: { type: "Z-shape", points: [[-3, -2], [-4, -2], [-4, -1], [-5, -1]] }
            },
            {
                shape: { type: "T-shape", points: [[6, 3], [7, 3], [8, 3], [7, 4], [7, 5]] },
                target: { type: "T-shape", points: [[-3, 6], [-3, 7], [-3, 8], [-4, 7], [-5, 7]] }
            },
            {
                shape: { type: "L-shape", points: [[5, 5], [6, 5], [6, 7], [7, 7], [7, 8], [5, 8]] },
                target: { type: "L-shape", points: [[-4, -3], [-4, -4], [-2, -4], [-2, -5], [-1, -5], [-1, -3]] }
            }
        ]
    },
    {
        id: 29,
        world: 6,
        worldName: "MASTER",
        name: "Multiple Paths",
        hint: "Several solutions exist - find the shortest!",
        parMoves: 2,
        variations: [
            {
                shape: { type: "triangle", points: [[6, 4], [8, 4], [7, 6]] },
                target: { type: "triangle", points: [[-4, 1], [-4, -1], [-2, 0]] }
            },
            {
                shape: { type: "T-shape", points: [[5, 5], [6, 5], [7, 5], [6, 6], [6, 7]] },
                target: { type: "T-shape", points: [[-3, -3], [-4, -3], [-5, -3], [-4, -4], [-4, -5]] }
            },
            {
                shape: { type: "J-shape", points: [[7, 3], [8, 3], [8, 5], [7, 5], [7, 6], [6, 6]] },
                target: { type: "J-shape", points: [[-4, -2], [-4, -3], [-2, -3], [-2, -2], [-1, -2], [-1, -1]] }
            }
        ]
    },
    {
        id: 30,
        world: 6,
        worldName: "MASTER",
        name: "FINAL BOSS",
        hint: "Use everything you've learned!",
        parMoves: 2,
        variations: [
            {
                shape: { type: "T-shape", points: [[6, 5], [7, 5], [8, 5], [7, 6], [7, 7]] },
                target: { type: "T-shape", points: [[2, -5], [2, -6], [2, -7], [1, -6], [0, -6]] }
            },
            {
                shape: { type: "Z-shape", points: [[7, 6], [8, 6], [8, 7], [9, 7]] },
                target: { type: "Z-shape", points: [[1, 1], [1, 2], [0, 2], [0, 3]] }
            },
            {
                shape: { type: "L-shape", points: [[7, 4], [8, 4], [8, 6], [9, 6], [9, 7], [7, 7]] },
                target: { type: "L-shape", points: [[-3, 5], [-3, 6], [-1, 6], [-1, 7], [0, 7], [0, 5]] }
            }
        ]
    }
];

// Helper function to get a random variation for a level
function getRandomVariation(levelId) {
    const level = levels[levelId - 1];
    const randomIndex = Math.floor(Math.random() * level.variations.length);
    const variation = level.variations[randomIndex];
    
    return {
        id: level.id,
        world: level.world,
        worldName: level.worldName,
        name: level.name,
        hint: level.hint,
        parMoves: level.parMoves,
        shape: { ...variation.shape, points: variation.shape.points.map(p => [...p]) },
        target: { ...variation.target, points: variation.target.points.map(p => [...p]) }
    };
}