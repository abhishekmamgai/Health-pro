export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
export type Goal = 'weight-loss' | 'muscle-gain' | 'stay-active' | 'sports'

export interface Exercise {
  id: string | number
  name: string
  category: string
  difficulty: Difficulty
  baseReps: string
  baseSets: number
}

const exerciseDatabase: Exercise[] = [
  { id: 1, name: 'Jumping Jacks', category: 'Cardio', difficulty: 'Beginner', baseReps: '30 reps', baseSets: 3 },
  { id: 2, name: 'Push-Ups', category: 'Strength', difficulty: 'Beginner', baseReps: '15 reps', baseSets: 3 },
  { id: 3, name: 'Plank', category: 'Core', difficulty: 'Beginner', baseReps: '45 sec', baseSets: 3 },
  { id: 4, name: 'Squats', category: 'Strength', difficulty: 'Beginner', baseReps: '20 reps', baseSets: 4 },
  { id: 5, name: 'Mountain Climbers', category: 'Cardio', difficulty: 'Intermediate', baseReps: '30 sec', baseSets: 3 },
  { id: 6, name: 'Burpees', category: 'Cardio', difficulty: 'Intermediate', baseReps: '10 reps', baseSets: 3 },
  { id: 7, name: 'Lunges', category: 'Strength', difficulty: 'Beginner', baseReps: '12 each', baseSets: 3 },
  { id: 8, name: 'Deadlift', category: 'Strength', difficulty: 'Advanced', baseReps: '8 reps', baseSets: 4 },
  { id: 9, name: 'Pull-Ups', category: 'Strength', difficulty: 'Advanced', baseReps: '8 reps', baseSets: 3 },
  { id: 10, name: 'Box Jumps', category: 'Plyometric', difficulty: 'Intermediate', baseReps: '10 reps', baseSets: 3 },
]

export interface WorkoutRecommendation {
  title: string
  totalTime: number
  exercises: Exercise[]
  intensity: 'Low' | 'Moderate' | 'High'
}

export function generateRecommendation(
  goal: Goal,
  level: Difficulty,
  duration: number
): WorkoutRecommendation {

  const availableExercises = exerciseDatabase.filter((ex) => {
    if (level === 'Advanced') return true
    if (level === 'Intermediate') return ex.difficulty !== 'Advanced'
    return ex.difficulty === 'Beginner'
  })

  let targetCategories: string[] = []

  if (goal === 'weight-loss') {
    targetCategories = ['Cardio', 'Plyometric', 'Core']
  } 
  else if (goal === 'muscle-gain') {
    targetCategories = ['Strength', 'Core']
  } 
  else if (goal === 'stay-active') {
    targetCategories = ['Cardio', 'Strength', 'Core']
  } 
  else {
    targetCategories = ['Plyometric', 'Strength', 'Cardio']
  }

  const filtered = availableExercises.filter((ex) =>
    targetCategories.includes(ex.category)
  )

  const shuffled = [...filtered].sort((a, b) => Math.random() - 0.5)

  const count = Math.max(3, Math.floor(duration / 5))

  const selected = shuffled.slice(0, count)

  return {
    title: `${level} ${goal.replace('-', ' ')} Workout`,
    totalTime: duration,
    exercises: selected,
    intensity: duration > 45 ? 'High' : duration > 20 ? 'Moderate' : 'Low',
  }
}