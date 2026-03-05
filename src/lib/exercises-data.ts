export interface Exercise {
  id: number
  name: string
  category:
    | 'Push-ups'
    | 'Squats'
    | 'Lunges'
    | 'Pulling'
    | 'Shoulders & Arms'
    | 'Core'
    | 'Cardio & HIIT'
    | 'Chest'
    | 'Back'
    | 'Biceps'
    | 'Triceps'
    | 'Legs'
    | 'Glutes'
    | 'Abs'
    | 'Full Body'
    | 'Flexibility & Mobility'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'

  // Auto-generated image per exercise
  imageUrl: string

  videoUrl: string
  desc: string
  instructions: string[]
  mistakes: string
  musclesWorked?: string[]
}

const getExerciseImage = (category: Exercise['category']): string => {
    // Use external JPG/PNG images (not SVG or GIF)
    // Domains chosen to be similar to the Store page (Unsplash/Pexels style)
    switch (category) {
        case 'Push-ups':
            return 'https://barbend.com/wp-content/uploads/2023/06/100-push-ups-a-day-featured-image-barbend.com_.jpg';
        case 'Chest':
            return 'https://images.pexels.com/photos/3822166/pexels-photo-3822166.jpeg?auto=compress&cs=tinysrgb&w=800';
        case 'Back':
        case 'Shoulders & Arms':
        case 'Biceps':
        case 'Triceps':
            return 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800';
        case 'Squats':
        case 'Lunges':
        case 'Glutes':
        case 'Legs':
            return 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=800';
        case 'Abs':
        case 'Core':
            return 'https://images.pexels.com/photos/851253/pexels-photo-851253.jpeg?auto=compress&cs=tinysrgb&w=800';
        case 'Cardio & HIIT':
            return 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800';
        case 'Full Body':
        case 'Flexibility & Mobility':
        default:
            return 'https://images.pexels.com/photos/799165/pexels-photo-799165.jpeg?auto=compress&cs=tinysrgb&w=800';
    }
};

const baseExercises: Exercise[] = [

  // ═══════════════════════════════════════
  // 1. PUSH-UPS
  // ═══════════════════════════════════════

  {
    id: 100,
    name: 'Standard Push-ups',
    category: 'Push-ups',
    difficulty: 'Beginner',
    imageUrl: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/embed/_l3ySVKYVJ8',
    desc: 'The fundamental upper body exercise for chest, shoulders, and triceps.',
    instructions: [
      'Plank position, hands slightly wider than shoulders.',
      'Lower until chest nearly touches floor.',
      'Keep body in a straight line.',
      'Push back up explosively.'
    ],
    mistakes: 'Sagging hips or flared elbows.',
    musclesWorked: ['Chest', 'Shoulders', 'Triceps', 'Core']
  },

  {
    id: 101,
    name: 'Knee Push-ups',
    category: 'Push-ups',
    difficulty: 'Beginner',
    imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://www.youtube.com/embed/jWxvty2KROs',
    desc: 'Modified push-up for beginners building initial chest strength.',
    instructions: [
      'Kneel on floor, hands wider than shoulders.',
      'Lower chest toward floor.',
      'Push back up keeping back straight.'
    ],
    mistakes: 'Arching the lower back.',
    musclesWorked: ['Chest', 'Shoulders', 'Triceps']
  },

  {
    id: 102,
    name: 'Diamond Push-ups',
    category: 'Push-ups',
    difficulty: 'Intermediate',
    imageUrl: 'https://res.cloudinary.com/peloton-cycle/image/fetch/f_auto,c_limit,w_3840,q_90/https://images.ctfassets.net/6ilvqec50fal/JdeBsAsNI2XepyM4IDL1U/ef2c96e26f7c3af5bce6db428cd1237f/Screenshot_2024-03-21_at_12.36.05_PM.png',
    videoUrl: 'https://www.youtube.com/embed/SshpL6GT_9A',
    desc: 'Targets the triceps and inner chest intensely.',
    instructions: [
      'Form a diamond with index fingers and thumbs.',
      'Lower chest to hands.',
      'Keep elbows tucked close to body.',
      'Push back up.'
    ],
    mistakes: 'Too much wrist strain if hands are too high.',
    musclesWorked: ['Triceps', 'Inner Chest', 'Shoulders']
  },

  {
    id: 103,
    name: 'Wide Push-ups',
    category: 'Push-ups',
    difficulty: 'Beginner',
    imageUrl: 'https://fitnessvolt.com/wp-content/uploads/2024/01/Wide-Pushup-Guide-1140x710.jpg',
    videoUrl: 'https://www.youtube.com/embed/pS0H87H_K_E',
    desc: 'Focuses on outer chest and front deltoids.',
    instructions: [
      'Hands 1.5x shoulder width.',
      'Keep core tight.',
      'Lower until chest is parallel to hands.',
      'Press back up.'
    ],
    mistakes: 'Shoulder shrugging or uneven hand placement.',
    musclesWorked: ['Outer Chest', 'Front Deltoids', 'Triceps']
  },

  {
    id: 104,
    name: 'Pike Push-ups',
    category: 'Push-ups',
    difficulty: 'Intermediate',
    imageUrl: 'https://leclub-fitness.fr/wp-content/uploads/2025/05/pike-push-ups.jpg',
    videoUrl: 'https://www.youtube.com/embed/SntitA3C1_s',
    desc: 'Vertical pushing movement for shoulder strength and overhead press prep.',
    instructions: [
      'Form an inverted V with hips high.',
      'Lower head between hands.',
      'Press back up.'
    ],
    mistakes: 'Elbows flaring outward.',
    musclesWorked: ['Shoulders', 'Triceps', 'Upper Chest']
  },

  {
    id: 105,
    name: 'Decline Push-ups',
    category: 'Push-ups',
    difficulty: 'Intermediate',
    imageUrl: 'https://cdn.muscleandstrength.com/sites/default/files/decline-push-up.jpg',
    videoUrl: 'https://www.youtube.com/embed/SKPab2dAMMs',
    desc: 'Elevates feet to target upper chest and anterior deltoids.',
    instructions: [
      'Place feet on elevated surface.',
      'Lower chest toward floor.',
      'Push back up with control.'
    ],
    mistakes: 'Letting hips sag or rise.',
    musclesWorked: ['Upper Chest', 'Anterior Deltoids', 'Triceps']
  },

  {
    id: 106,
    name: 'Spiderman Push-ups',
    category: 'Push-ups',
    difficulty: 'Advanced',
    imageUrl: 'https://www.originalsurfmorocco.com/wp-content/uploads/Spiderman-push-ups.png',
    videoUrl: 'https://www.youtube.com/embed/n3HIn95M_wY',
    desc: 'Dynamic push-up targeting core, obliques, and hip flexors simultaneously.',
    instructions: [
      'Start in push-up position.',
      'As you lower, bring one knee to the elbow.',
      'Return foot and push up.',
      'Alternate sides.'
    ],
    mistakes: 'Hips rotating excessively.',
    musclesWorked: ['Chest', 'Obliques', 'Hip Flexors', 'Core']
  },

  {
    id: 107,
    name: 'Clap Push-ups',
    category: 'Push-ups',
    difficulty: 'Advanced',
    imageUrl: 'https://4.bp.blogspot.com/-wQjEs3lSHZE/W-EKTyr0cEI/AAAAAAAAInQ/L2vQmY0SfMwIea1LBjKpLU1TNijveiU4wCLcBGAs/s1600/clap%2Bpush%2Bup.jpg',
    videoUrl: 'https://www.youtube.com/embed/r3MgGbMnbmE',
    desc: 'Explosive plyometric push-up for power development.',
    instructions: [
      'Perform an explosive push-up.',
      'Clap hands while airborne.',
      'Land with slightly bent elbows.'
    ],
    mistakes: 'Not pushing explosively enough or landing stiff.',
    musclesWorked: ['Chest', 'Shoulders', 'Triceps', 'Core']
  },

    // ═══════════════════════════════════════
    // 2. CHEST
    // ═══════════════════════════════════════

{
  id: 150,
  name: 'Flat Barbell Bench Press',
  category: 'Chest',
  difficulty: 'Intermediate',
  imageUrl: 'https://bodybuilding-wizard.com/wp-content/uploads/2014/03/flat-bench-barbell-press-1.jpg',
  videoUrl: 'https://www.youtube.com/embed/gRVjAtPip0Y',
  desc: 'Primary compound movement for overall chest mass and strength.',
  instructions: [
    'Grip bar slightly wider than shoulders.',
    'Lower bar to mid chest under control.',
    'Press upward explosively.'
  ],
  mistakes: 'Bouncing bar or flaring elbows excessively.',
  musclesWorked: ['Chest', 'Triceps', 'Shoulders']
},

{
  id: 151,
  name: 'Incline Barbell Bench Press',
  category: 'Chest',
  difficulty: 'Intermediate',
  imageUrl: 'https://hortonbarbell.com/wp-content/uploads/2022/01/Incline-Barbell-Bench-Press.png',
  videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8',
  desc: 'Targets upper chest and front deltoids.',
  instructions: [
    'Set bench to 30–45° incline.',
    'Lower bar to upper chest.',
    'Press up with control.'
  ],
  mistakes: 'Setting bench too steep shifting load to shoulders.',
  musclesWorked: ['Upper Chest', 'Shoulders', 'Triceps']
},

{
  id: 152,
  name: 'Decline Barbell Bench Press',
  category: 'Chest',
  difficulty: 'Intermediate',
  imageUrl: 'https://www.shapefit.com/wp-content/uploads/2015/04/smartmag-featured-image-chest-exercises-decline-barbell-bench-press.jpg',
  videoUrl: 'https://www.youtube.com/embed/LfyQBUKR8SE',
  desc: 'Emphasizes lower chest development.',
  instructions: [
    'Secure feet in decline bench.',
    'Lower bar to lower chest.',
    'Press upward steadily.'
  ],
  mistakes: 'Letting bar drift too high on chest.',
  musclesWorked: ['Lower Chest', 'Triceps']
},

{
  id: 153,
  name: 'Machine Chest Press',
  category: 'Chest',
  difficulty: 'Beginner',
  imageUrl: 'https://bulkandstrength.com/wp-content/uploads/2025/11/Seated-Machine-Chest-Press-Workout-1068x712.webp',
  videoUrl: 'https://www.youtube.com/embed/sqNwDkUU_Ps',
  desc: 'Controlled chest press using a machine for stability.',
  instructions: [
    'Adjust seat height properly.',
    'Press handles forward until arms extended.',
    'Return slowly with control.'
  ],
  mistakes: 'Locking elbows aggressively.',
  musclesWorked: ['Chest', 'Triceps']
},

{
  id: 154,
  name: 'Flat Dumbbell Press',
  category: 'Chest',
  difficulty: 'Beginner',
  imageUrl: 'https://hortonbarbell.com/wp-content/uploads/2022/06/DB-bench-press.png',
  videoUrl: 'https://www.youtube.com/embed/VmB1G1K7v94',
  desc: 'Dumbbell variation for balanced chest development.',
  instructions: [
    'Lie on flat bench holding dumbbells at chest level.',
    'Press upward until arms extended.',
    'Lower slowly maintaining control.'
  ],
  mistakes: 'Dropping weights too fast.',
  musclesWorked: ['Chest', 'Shoulders', 'Triceps']
},

{
  id: 155,
  name: 'Incline Dumbbell Press',
  category: 'Chest',
  difficulty: 'Intermediate',
  imageUrl: 'https://cdn.muscleandstrength.com/sites/default/files/incline-dumbbell-bench-press_0.jpg',
  videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8',
  desc: 'Upper chest development using dumbbells.',
  instructions: [
    'Set bench at incline.',
    'Press dumbbells upward.',
    'Lower slowly under control.'
  ],
  mistakes: 'Elbows flaring excessively.',
  musclesWorked: ['Upper Chest', 'Shoulders', 'Triceps']
},

{
  id: 156,
  name: 'Decline Dumbbell Press',
  category: 'Chest',
  difficulty: 'Intermediate',
  imageUrl: 'https://cdn.muscleandstrength.com/sites/default/files/decline-dumbbell-bench-press.jpg',
  videoUrl: 'https://www.youtube.com/embed/5kQfLwVvP7U',
  desc: 'Lower chest targeting variation using dumbbells.',
  instructions: [
    'Set bench to decline angle.',
    'Press dumbbells upward.',
    'Lower with steady control.'
  ],
  mistakes: 'Using momentum instead of muscle control.',
  musclesWorked: ['Lower Chest', 'Triceps']
},

{
  id: 157,
  name: 'Dumbbell Fly',
  category: 'Chest',
  difficulty: 'Intermediate',
  imageUrl: 'https://cdn.muscleandstrength.com/sites/default/files/dumbbell-fly.jpg',
  videoUrl: 'https://www.youtube.com/embed/eozdVDA78K0',
  desc: 'Isolation movement focusing on chest stretch and contraction.',
  instructions: [
    'Lie on bench with slight bend in elbows.',
    'Open arms wide in arc motion.',
    'Squeeze chest at top.',
    'Return slowly.'
  ],
  mistakes: 'Straightening arms fully causing elbow strain.',
  musclesWorked: ['Chest', 'Anterior Deltoids']
},

// ═══════════════════════════════════════
// 3. BACK
// ═══════════════════════════════════════

{
  id: 200,
  name: 'Pull-ups',
  category: 'Back',
  difficulty: 'Advanced',
  imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/mh0418-fit-pul-01-1558551798.jpg',
  videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g',
  desc: 'King of upper body pulling — builds width and lat strength.',
  instructions: [
    'Overhand grip, hands wider than shoulders.',
    'Pull chin above the bar.',
    'Control the descent fully.'
  ],
  mistakes: 'Kipping or incomplete range of motion.',
  musclesWorked: ['Lats', 'Biceps', 'Rear Deltoids', 'Core']
},

{
  id: 201,
  name: 'Chin-ups',
  category: 'Back',
  difficulty: 'Intermediate',
  imageUrl: 'https://youfit.com/wp-content/uploads/2022/11/pull-ups-for-beginners.jpg',
  videoUrl: 'https://www.youtube.com/embed/brhRXlOhsAM',
  desc: 'Underhand grip pull-up emphasizing biceps and lats.',
  instructions: [
    'Underhand grip, shoulder width.',
    'Pull chin above bar.',
    'Lower slowly.'
  ],
  mistakes: 'Using momentum or not fully extending at bottom.',
  musclesWorked: ['Biceps', 'Lats', 'Core']
},

{
  id: 202,
  name: 'Bent Over Row',
  category: 'Back',
  difficulty: 'Intermediate',
  imageUrl: 'https://media.istockphoto.com/id/1429386264/photo/bent-over-barbell-row.jpg?s=612x612&w=0&k=20&c=Sq9SJ467ocSDLAl-2Zt5DqVyWmr6BR7HZuqTcnYfN3c=',
  videoUrl: 'https://www.youtube.com/embed/9efgcAjQW7E',
  desc: 'Horizontal rowing for back thickness and density.',
  instructions: [
    'Hinge at hips with flat back.',
    'Row weight toward lower chest.',
    'Squeeze shoulder blades together.'
  ],
  mistakes: 'Rounding the back or jerking the weight.',
  musclesWorked: ['Lats', 'Rhomboids', 'Biceps', 'Rear Deltoids']
},

{
  id: 203,
  name: 'Seated Cable Row',
  category: 'Back',
  difficulty: 'Beginner',
  imageUrl: 'https://www.g4physio.co.uk/wp-content/uploads/2016/11/Seated-Row-2.jpg',
  videoUrl: 'https://www.youtube.com/embed/GZbfZ033f74',
  desc: 'Machine-based rowing movement for mid-back thickness.',
  instructions: [
    'Sit upright and grip handle.',
    'Pull handle toward abdomen.',
    'Squeeze shoulder blades at end.'
  ],
  mistakes: 'Leaning too far back or using momentum.',
  musclesWorked: ['Lats', 'Rhomboids', 'Biceps']
},

{
  id: 204,
  name: 'Lat Pulldown',
  category: 'Back',
  difficulty: 'Beginner',
  imageUrl: 'https://www.jefit.com/wp/wp-content/uploads/2021/08/shoulder-pull-down-machine-fitness-man-working-out-lat-pulldown-training-gym-upper-body-strength-exercise-upper-back-scaled.jpg',
  videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc',
  desc: 'Vertical pulling movement for lat width.',
  instructions: [
    'Grip bar wider than shoulders.',
    'Pull bar to upper chest.',
    'Control the return upward.'
  ],
  mistakes: 'Pulling behind neck or swinging body.',
  musclesWorked: ['Lats', 'Biceps', 'Rear Deltoids']
},

{
  id: 205,
  name: 'Straight-Arm Pulldown',
  category: 'Back',
  difficulty: 'Intermediate',
  imageUrl: 'https://prod-academy-wp-content-uploads.s3.amazonaws.com/wp-content/uploads/2018/10/straightarmpulldown2.jpg',
  videoUrl: 'https://www.youtube.com/embed/6u8xQpJ0lJc',
  desc: 'Isolation movement focusing on lat contraction.',
  instructions: [
    'Stand facing cable machine.',
    'Keep arms straight with slight bend.',
    'Pull bar down toward thighs.'
  ],
  mistakes: 'Bending elbows excessively.',
  musclesWorked: ['Lats']
},

{
  id: 206,
  name: 'Deadlift',
  category: 'Back',
  difficulty: 'Advanced',
  imageUrl: 'https://musclelead.com/wp-content/uploads/2020/11/Deadlift-form.png',
  videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q',
  desc: 'Compound lift building full posterior chain strength.',
  instructions: [
    'Feet hip-width apart.',
    'Grip bar just outside knees.',
    'Keep back flat and drive through heels.'
  ],
  mistakes: 'Rounding lower back.',
  musclesWorked: ['Lower Back', 'Glutes', 'Hamstrings', 'Traps']
},

{
  id: 207,
  name: 'Inverted Row',
  category: 'Back',
  difficulty: 'Beginner',
  imageUrl: 'https://barbend.com/wp-content/uploads/2019/09/BarBend-Feature-Image-1200-x-675-2021-05-18T222047.493.jpg',
  videoUrl: 'https://www.youtube.com/embed/hEXTu288X9Y',
  desc: 'Bodyweight horizontal pull — great pull-up precursor.',
  instructions: [
    'Position under bar.',
    'Pull chest to bar.',
    'Lower slowly with control.'
  ],
  mistakes: 'Sagging hips or incomplete pull.',
  musclesWorked: ['Lats', 'Biceps', 'Core']
},

{
  id: 208,
  name: 'Superman Hold',
  category: 'Back',
  difficulty: 'Beginner',
  imageUrl: 'https://images.bonnier.cloud/files/ifo/production/20210519140402/202-Superman-hold.00_00_10_16.Still001.jpg',
  videoUrl: 'https://www.youtube.com/embed/cc6VCdxxoFw',
  desc: 'Lower back and posterior chain activation exercise.',
  instructions: [
    'Lie on stomach.',
    'Lift arms and legs simultaneously.',
    'Hold briefly and lower slowly.'
  ],
  mistakes: 'Jerky movements or extreme neck arching.',
  musclesWorked: ['Lower Back', 'Glutes']
},

{
  id: 209,
  name: 'Cat-Cow',
  category: 'Back',
  difficulty: 'Beginner',
  imageUrl: 'https://i0.wp.com/www.seema.com/wp-content/uploads/2021/09/Cat-Cow-Pose-scaled.jpg?fit=2560%2C1707&ssl=1',
  videoUrl: 'https://www.youtube.com/embed/kqnua4rHVVA',
  desc: 'Spine mobility and lower back relief.',
  instructions: [
    'On hands and knees.',
    'Arch downward (cow).',
    'Round upward (cat).'
  ],
  mistakes: 'Moving too quickly without breathing.',
  musclesWorked: ['Spine', 'Core']
},

// ═══════════════════════════════════════
// 4. SHOULDERS & ARMS
// ═══════════════════════════════════════

{
  id: 300,
  name: 'Dumbbell Shoulder Press',
  category: 'Shoulders & Arms',
  difficulty: 'Intermediate',
  imageUrl: 'https://fithub.com.tr/wp-content/uploads/2019/02/Dumbbell-Shoulder-Press.jpg',
  videoUrl: 'https://www.youtube.com/embed/2yjwHev9nno',
  desc: 'Primary overhead pressing movement for building shoulder mass.',
  instructions: [
    'Hold dumbbells at shoulder height.',
    'Press overhead until arms fully extended.',
    'Lower slowly under control.'
  ],
  mistakes: 'Excessive lower back arching.',
  musclesWorked: ['Anterior Deltoid', 'Lateral Deltoid', 'Triceps']
},

{
  id: 301,
  name: 'Arnold Press',
  category: 'Shoulders & Arms',
  difficulty: 'Intermediate',
  imageUrl: 'https://s3.amazonaws.com/prod.skimble/assets/819488/image_iphone.jpg',
  videoUrl: 'https://www.youtube.com/embed/3ml7BH7mNwQ',
  desc: 'Rotational shoulder press hitting all three deltoid heads.',
  instructions: [
    'Start with palms facing you.',
    'Rotate palms outward while pressing up.',
    'Reverse rotation on the way down.'
  ],
  mistakes: 'Using momentum during rotation.',
  musclesWorked: ['Anterior Deltoid', 'Lateral Deltoid', 'Rear Deltoid', 'Triceps']
},

{
  id: 302,
  name: 'Lateral Raises',
  category: 'Shoulders & Arms',
  difficulty: 'Beginner',
  imageUrl: 'http://photos.demandstudios.com/getty/article/94/121/520564857.jpg',
  videoUrl: 'https://www.youtube.com/embed/PzsOxGWmP28',
  desc: 'Isolation movement to build shoulder width.',
  instructions: [
    'Hold dumbbells at sides.',
    'Raise arms to shoulder height.',
    'Lower slowly with control.'
  ],
  mistakes: 'Swinging or lifting too heavy weight.',
  musclesWorked: ['Lateral Deltoid']
},

{
  id: 303,
  name: 'Front Raises',
  category: 'Shoulders & Arms',
  difficulty: 'Beginner',
  imageUrl: 'https://www.verywellfit.com/thmb/VAhObEJ06XnI1wynb7eYMOE-cQo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Frontraise-89445714d65d4c99a449e20aaa5bbadb.jpg',
  videoUrl: 'https://www.youtube.com/embed/gkbBPFJMdEs',
  desc: 'Isolation exercise targeting front deltoids.',
  instructions: [
    'Hold dumbbells in front of thighs.',
    'Raise arms to eye level.',
    'Lower slowly.'
  ],
  mistakes: 'Leaning backward during lift.',
  musclesWorked: ['Anterior Deltoid']
},

{
  id: 304,
  name: 'Rear Delt Fly',
  category: 'Shoulders & Arms',
  difficulty: 'Beginner',
  imageUrl: 'https://i.ytimg.com/vi/rQhdsa5QdVU/maxresdefault.jpg',
  videoUrl: 'https://www.youtube.com/embed/EA7u4Q_8HQ0',
  desc: 'Isolation movement for rear deltoids and upper back.',
  instructions: [
    'Hinge forward at hips.',
    'Raise arms out to sides.',
    'Squeeze shoulder blades together.',
    'Lower slowly.'
  ],
  mistakes: 'Using momentum or rounding back.',
  musclesWorked: ['Rear Deltoid', 'Rhomboids']
},
// ═══════════════════════════════════════
// 5. BICEPS
// ═══════════════════════════════════════

{
  id: 400,
  name: 'Barbell Curl',
  category: 'Biceps',
  difficulty: 'Intermediate',
  imageUrl: 'https://breakingmuscle.com/wp-content/uploads/2022/06/BarBend-Feature-Image-1200-x-675-2022-06-16T222420.084.jpg',
  videoUrl: 'https://www.youtube.com/embed/kwG2ipFRgfo',
  desc: 'Primary compound biceps builder using a barbell.',
  instructions: [
    'Stand upright holding barbell shoulder-width grip.',
    'Curl bar upward keeping elbows close.',
    'Lower slowly under control.'
  ],
  mistakes: 'Swinging body or using excessive momentum.',
  musclesWorked: ['Biceps', 'Brachialis']
},

{
  id: 401,
  name: 'Dumbbell Bicep Curl',
  category: 'Biceps',
  difficulty: 'Beginner',
  imageUrl: 'https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2016/12/18142711/isometric-curl-960.png',
  videoUrl: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
  desc: 'Classic dumbbell isolation for balanced arm growth.',
  instructions: [
    'Hold dumbbells at sides.',
    'Curl upward without moving elbows.',
    'Squeeze at top.',
    'Lower slowly.'
  ],
  mistakes: 'Swinging elbows forward.',
  musclesWorked: ['Biceps', 'Brachialis']
},

{
  id: 402,
  name: 'Hammer Curl',
  category: 'Biceps',
  difficulty: 'Beginner',
  imageUrl: 'https://www.trainheroic.com/wp-content/uploads/2023/02/AdobeStock_417412809-TH-jpg.webp',
  videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4',
  desc: 'Neutral grip curl emphasizing brachialis and forearms.',
  instructions: [
    'Hold dumbbells with thumbs facing up.',
    'Curl both arms simultaneously.',
    'Keep elbows fixed.'
  ],
  mistakes: 'Rotating wrists during movement.',
  musclesWorked: ['Biceps', 'Brachialis', 'Brachioradialis']
},

{
  id: 403,
  name: 'Preacher Curl',
  category: 'Biceps',
  difficulty: 'Intermediate',
  imageUrl: 'https://barbend.com/wp-content/uploads/2018/09/BarBend-Feature-Image-1200-x-675-52.jpg',
  videoUrl: 'https://www.youtube.com/embed/fIWP-FRFNU0',
  desc: 'Strict isolation exercise for peak biceps contraction.',
  instructions: [
    'Place arms on preacher bench pad.',
    'Curl bar upward slowly.',
    'Lower under full control.'
  ],
  mistakes: 'Lifting elbows off pad.',
  musclesWorked: ['Biceps Peak']
},

{
  id: 404,
  name: 'Concentration Curl',
  category: 'Biceps',
  difficulty: 'Intermediate',
  imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.pIF_kciO2HaZ-6sEj-UA7wHaE8?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/Jvj2wV0vOYU',
  desc: 'Maximum peak contraction isolation exercise.',
  instructions: [
    'Sit and brace elbow against inner thigh.',
    'Curl with full range of motion.',
    'Squeeze hard at top.'
  ],
  mistakes: 'Moving elbow away from thigh.',
  musclesWorked: ['Biceps Peak', 'Brachialis']
},

// ═══════════════════════════════════════
// 6. TRICEPS
// ═══════════════════════════════════════

{
  id: 500,
  name: 'Close Grip Bench Press',
  category: 'Triceps',
  difficulty: 'Intermediate',
  imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.X0FU4ovyN8ZABoHCpTFX4AHaE7?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/nEF0bv2FW94',
  desc: 'Compound pressing movement emphasizing triceps strength and mass.',
  instructions: [
    'Grip bar shoulder-width apart.',
    'Lower bar to chest with elbows tucked.',
    'Press upward focusing on triceps.'
  ],
  mistakes: 'Grip too narrow causing wrist strain.',
  musclesWorked: ['Triceps', 'Chest', 'Shoulders']
},

{
  id: 501,
  name: 'Tricep Dips',
  category: 'Triceps',
  difficulty: 'Intermediate',
  imageUrl: 'https://images.bonnier.cloud/files/ifo/production/20210428222953/ifo_153850-7-0001-zizo5howC4-6tKkjeZkhIQ.jpg?max-w=1200',
  videoUrl: 'https://www.youtube.com/embed/0326dy_-CzM',
  desc: 'Bodyweight compound movement for overall tricep development.',
  instructions: [
    'Support body on parallel bars.',
    'Lower until elbows reach 90 degrees.',
    'Press back up under control.'
  ],
  mistakes: 'Flaring elbows excessively.',
  musclesWorked: ['Triceps', 'Chest']
},

{
  id: 502,
  name: 'Tricep Pushdown',
  category: 'Triceps',
  difficulty: 'Beginner',
  imageUrl: 'https://barbend.com/wp-content/uploads/2019/03/Triceps-Pushdown-Exericse-Guide-Pushdown-1024x768.jpg',
  videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU',
  desc: 'Cable isolation exercise for triceps contraction.',
  instructions: [
    'Stand facing cable machine.',
    'Keep elbows fixed at sides.',
    'Push bar downward fully.',
    'Return slowly.'
  ],
  mistakes: 'Using body momentum.',
  musclesWorked: ['Triceps']
},

{
  id: 503,
  name: 'Overhead Tricep Extension',
  category: 'Triceps',
  difficulty: 'Beginner',
  imageUrl: 'https://i.ytimg.com/vi/s-FoAbMyHTc/maxresdefault.jpg',
  videoUrl: 'https://www.youtube.com/embed/YbX7Wd8jQ-Q',
  desc: 'Targets the long head of the triceps.',
  instructions: [
    'Hold dumbbell overhead.',
    'Lower behind head carefully.',
    'Extend arms fully upward.'
  ],
  mistakes: 'Elbows moving outward.',
  musclesWorked: ['Triceps Long Head']
},

{
  id: 504,
  name: 'Tricep Kickbacks',
  category: 'Triceps',
  difficulty: 'Beginner',
  imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/img-2236-jpg-1572531830.jpg',
  videoUrl: 'https://www.youtube.com/embed/6SS6K3lAwZ8',
  desc: 'Isolation movement for triceps definition.',
  instructions: [
    'Hinge forward at hips.',
    'Extend forearm backward.',
    'Squeeze triceps at full extension.'
  ],
  mistakes: 'Dropping elbow or swinging arm.',
  musclesWorked: ['Triceps']
},

// ═══════════════════════════════════════
// 7. SQUATS
// ═══════════════════════════════════════

{
  id: 600,
  name: 'Barbell Back Squat',
  category: 'Squats',
  difficulty: 'Intermediate',
  imageUrl: 'https://images.ctfassets.net/3s5io6mnxfqz/34Npc5PKLKJi6HIYvFw9XI/3e45754912cf266e7401cb8074c63239/AdobeStock_386146138_2.jpeg?fm=jpg&w=1200&fl=progressive',
  videoUrl: 'https://www.youtube.com/embed/ultWZbUMPL8',
  desc: 'Primary compound lift for overall lower body strength and size.',
  instructions: [
    'Place bar across upper back.',
    'Feet shoulder-width apart.',
    'Squat down keeping chest upright.',
    'Drive through heels to stand.'
  ],
  mistakes: 'Rounding lower back or knees collapsing inward.',
  musclesWorked: ['Quads', 'Glutes', 'Hamstrings', 'Core']
},

{
  id: 601,
  name: 'Air Squat',
  category: 'Squats',
  difficulty: 'Beginner',
  imageUrl: 'https://crossfitlpf.com/wp-content/uploads/2022/11/12611016-A-young-woman-performing-an-air-squat-980x653.jpeg',
  videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U',
  desc: 'Bodyweight squat for building foundational strength.',
  instructions: [
    'Feet shoulder-width apart.',
    'Sit back and down onto heels.',
    'Keep chest upright.',
    'Drive through heels to stand.'
  ],
  mistakes: 'Knees caving inward.',
  musclesWorked: ['Quads', 'Glutes', 'Core']
},

{
  id: 602,
  name: 'Goblet Squat',
  category: 'Squats',
  difficulty: 'Beginner',
  imageUrl: 'https://barbend.com/wp-content/uploads/2024/05/goblet-squat-1.jpg',
  videoUrl: 'https://www.youtube.com/embed/MeIiIdhvXT4',
  desc: 'Weighted squat promoting upright torso and depth control.',
  instructions: [
    'Hold dumbbell at chest.',
    'Squat deep keeping torso upright.',
    'Drive through heels upward.'
  ],
  mistakes: 'Leaning forward excessively.',
  musclesWorked: ['Quads', 'Glutes', 'Core']
},

{
  id: 603,
  name: 'Sumo Squat',
  category: 'Squats',
  difficulty: 'Beginner',
  imageUrl: 'http://images.ctfassets.net/8urtyqugdt2l/6O5FSYt3miUVVqapCMfHjw/260cc09740d493f43d8aa8b498d500bf/desktop-sumo-squats.jpg',
  videoUrl: 'https://www.youtube.com/embed/C6_Y084k95w',
  desc: 'Wide stance squat targeting inner thighs and glutes.',
  instructions: [
    'Take wide stance.',
    'Point toes outward slightly.',
    'Lower hips down.',
    'Squeeze glutes at top.'
  ],
  mistakes: 'Knees collapsing inward.',
  musclesWorked: ['Inner Thighs', 'Glutes', 'Quads']
},

{
  id: 604,
  name: 'Bulgarian Split Squat',
  category: 'Squats',
  difficulty: 'Intermediate',
  imageUrl: 'http://images.ctfassets.net/8urtyqugdt2l/an332LVc89C33kZl3zNAp/cc364829dedecb7dde2ef092c289c2bc/desktop-bulgarian-split-squats.jpg',
  videoUrl: 'https://www.youtube.com/embed/2C-uNgKwPLE',
  desc: 'Unilateral squat improving balance and leg strength.',
  instructions: [
    'Place rear foot on bench.',
    'Lower front knee to 90 degrees.',
    'Drive through front heel.'
  ],
  mistakes: 'Leaning too far forward.',
  musclesWorked: ['Quads', 'Glutes', 'Hamstrings']
},

{
  id: 605,
  name: 'Pistol Squat',
  category: 'Squats',
  difficulty: 'Advanced',
  imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.SkfUqglDqVkCotXYAdIB2wHaHY?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/qDcni9N3rAs',
  desc: 'Advanced single-leg squat for strength and mobility.',
  instructions: [
    'Extend one leg forward.',
    'Lower on single leg.',
    'Drive back up keeping balance.'
  ],
  mistakes: 'Heel lifting off ground.',
  musclesWorked: ['Quads', 'Glutes', 'Core']
},

{
  id: 606,
  name: 'Box Jumps',
  category: 'Squats',
  difficulty: 'Intermediate',
  imageUrl: 'https://i.shgcdn.com/dcbdb9bf-267c-4abe-bbaf-df7fcbab3ba8/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
  videoUrl: 'https://www.youtube.com/embed/52r_Ul5k03g',
  desc: 'Explosive lower body plyometric exercise.',
  instructions: [
    'Stand before box.',
    'Jump explosively upward.',
    'Land softly.',
    'Step down safely.'
  ],
  mistakes: 'Landing with stiff knees.',
  musclesWorked: ['Quads', 'Glutes', 'Calves']
},

{
  id: 607,
  name: 'Wall Sit',
  category: 'Squats',
  difficulty: 'Beginner',
  imageUrl: 'https://www.trainer.ae/articles/wp-content/uploads/2016/02/wall-sit.jpg',
  videoUrl: 'https://www.youtube.com/embed/FsHjKXlLTHg',
  desc: 'Isometric squat hold for endurance.',
  instructions: [
    'Back against wall.',
    'Lower until knees at 90 degrees.',
    'Hold position.'
  ],
  mistakes: 'Knees moving past toes.',
  musclesWorked: ['Quads', 'Glutes']
},

// ═══════════════════════════════════════
// 8. LUNGES
// ═══════════════════════════════════════

{
  id: 700,
  name: 'Forward Lunge',
  category: 'Lunges',
  difficulty: 'Beginner',
  imageUrl: 'https://blog.myfitnesspal.com/wp-content/uploads/2020/07/UACF-Lunges-Featured.jpg',
  videoUrl: 'https://www.youtube.com/embed/QOVaHwm-Q6U',
  desc: 'Classic lunge for quad and glute development.',
  instructions: [
    'Step forward with one leg.',
    'Lower until both knees form 90° angles.',
    'Push back to starting position.'
  ],
  mistakes: 'Front knee collapsing inward.',
  musclesWorked: ['Quads', 'Glutes', 'Hamstrings']
},

{
  id: 701,
  name: 'Reverse Lunge',
  category: 'Lunges',
  difficulty: 'Beginner',
  imageUrl: 'https://aaptiv.com/magazine/wp-content/uploads/sites/2/2018/07/7.25-Front-Lunge-vs.-Reverse-Lunge.jpg',
  videoUrl: 'https://www.youtube.com/embed/xrPteyQLGAo',
  desc: 'Knee-friendly variation emphasizing glutes.',
  instructions: [
    'Step backward into lunge.',
    'Lower until back knee nearly touches floor.',
    'Drive through front heel to stand.'
  ],
  mistakes: 'Front knee going past toes.',
  musclesWorked: ['Glutes', 'Quads', 'Hamstrings']
},

{
  id: 702,
  name: 'Walking Lunges',
  category: 'Lunges',
  difficulty: 'Intermediate',
  imageUrl: 'https://cdn.muscleandstrength.com/sites/default/files/dumbbell-walking-lunge.jpg',
  videoUrl: 'https://www.youtube.com/embed/e6_I6688Sks',
  desc: 'Dynamic lunge variation improving strength and coordination.',
  instructions: [
    'Step forward into lunge.',
    'Drive forward with back leg.',
    'Alternate legs continuously.'
  ],
  mistakes: 'Leaning torso excessively forward.',
  musclesWorked: ['Quads', 'Glutes', 'Hamstrings', 'Balance']
},

{
  id: 703,
  name: 'Lateral Lunge',
  category: 'Lunges',
  difficulty: 'Beginner',
  imageUrl: 'https://womensfitness.co.uk/wp-content/uploads/sites/3/2023/02/Shutterstock_2172989467.jpg',
  videoUrl: 'https://www.youtube.com/embed/ghhpsfCunpE',
  desc: 'Side lunge targeting inner thighs and glute medius.',
  instructions: [
    'Step out to the side.',
    'Sink hips into stepping leg.',
    'Keep opposite leg straight.',
    'Push back to center.'
  ],
  mistakes: 'Allowing knee to collapse inward.',
  musclesWorked: ['Inner Thighs', 'Glutes', 'Quads']
},

{
  id: 704,
  name: 'Curtsy Lunge',
  category: 'Lunges',
  difficulty: 'Intermediate',
  imageUrl: 'https://barbend.com/wp-content/uploads/2023/06/over-curtsy-barbend.com_-560x315.jpg',
  videoUrl: 'https://www.youtube.com/embed/L7I7X1t7K-w',
  desc: 'Cross-back lunge improving hip stability and glute activation.',
  instructions: [
    'Step back diagonally behind front leg.',
    'Lower until back knee nears floor.',
    'Return to starting position.'
  ],
  mistakes: 'Twisting front knee inward.',
  musclesWorked: ['Glute Medius', 'Quads', 'Adductors']
},

{
  id: 705,
  name: 'Jump Lunges',
  category: 'Lunges',
  difficulty: 'Advanced',
  imageUrl: 'https://media1.popsugar-assets.com/files/thumbor/MF5ev0BICtiRbbXnmf8Ywrcdxu4/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/07/17/797/n/43387813/b7037060c2d8ea34_jump_lunge_ps_studios/i/Jump-Lunges.jpg',
  videoUrl: 'https://www.youtube.com/embed/3XDriUn0udo',
  desc: 'Explosive lunge variation for power and conditioning.',
  instructions: [
    'Start in lunge position.',
    'Jump explosively switching legs mid-air.',
    'Land softly into next lunge.'
  ],
  mistakes: 'Landing with stiff knees.',
  musclesWorked: ['Quads', 'Glutes', 'Calves']
},

// ═══════════════════════════════════════
// 9. GLUTES
// ═══════════════════════════════════════

{
  id: 800,
  name: 'Hip Thrust',
  category: 'Glutes',
  difficulty: 'Intermediate',
  imageUrl: 'https://cdn.oxygenmag.com/wp-content/uploads/2022/03/hipthrust.jpg',
  videoUrl: 'https://www.youtube.com/embed/LM8XHLYJoYs',
  desc: 'Most effective exercise for building glute strength and size.',
  instructions: [
    'Place upper back on bench.',
    'Keep feet flat on the floor.',
    'Drive hips upward.',
    'Squeeze glutes at the top.'
  ],
  mistakes: 'Not reaching full hip extension.',
  musclesWorked: ['Glutes', 'Hamstrings', 'Core']
},

{
  id: 801,
  name: 'Glute Bridge',
  category: 'Glutes',
  difficulty: 'Beginner',
  imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.k3_7PtRzGpA4NedSpC47zQHaEp?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/8bbE6adQT78',
  desc: 'Basic glute activation exercise.',
  instructions: [
    'Lie on your back with knees bent.',
    'Push hips upward.',
    'Squeeze glutes at the top.',
    'Lower slowly.'
  ],
  mistakes: 'Arching the lower back instead of using glutes.',
  musclesWorked: ['Glutes', 'Hamstrings', 'Core']
},

{
  id: 802,
  name: 'Single Leg Glute Bridge',
  category: 'Glutes',
  difficulty: 'Intermediate',
  imageUrl: 'https://up.yimg.com/ib/th/id/OIP.HvVEUby01p0FrkgRT2g4xgHaFB?pid=Api&rs=1&c=1&qlt=95&w=160&h=108',
  videoUrl: 'https://www.youtube.com/embed/mxg9d8gXv1k',
  desc: 'Unilateral glute exercise improving balance and strength.',
  instructions: [
    'Extend one leg straight.',
    'Lift hips using the other leg.',
    'Keep hips level.'
  ],
  mistakes: 'Hips rotating or dropping.',
  musclesWorked: ['Glutes', 'Hamstrings', 'Core']
},

{
  id: 803,
  name: 'Romanian Deadlift',
  category: 'Glutes',
  difficulty: 'Intermediate',
  imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.hJT-u8JSrmkUpN-zLtr-GQHaEK?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/JCXUYuzwICw',
  desc: 'Hip hinge movement strengthening glutes and hamstrings.',
  instructions: [
    'Hold barbell or dumbbells.',
    'Hinge at hips keeping back straight.',
    'Lower weight along legs.',
    'Drive hips forward to stand.'
  ],
  mistakes: 'Rounding the lower back.',
  musclesWorked: ['Glutes', 'Hamstrings', 'Lower Back']
},

{
  id: 804,
  name: 'Donkey Kicks',
  category: 'Glutes',
  difficulty: 'Beginner',
  imageUrl: 'https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2018/01/20145820/butt-workouts-at-home-exercises-600-quadruped-hip-extension.jpg',
  videoUrl: 'https://www.youtube.com/embed/SJ1Xuz9D-ZQ',
  desc: 'Glute isolation movement performed on all fours.',
  instructions: [
    'Start on hands and knees.',
    'Kick one leg upward.',
    'Keep knee bent.',
    'Squeeze glute at top.'
  ],
  mistakes: 'Arching the lower back.',
  musclesWorked: ['Glutes']
},

{
  id: 805,
  name: 'Fire Hydrants',
  category: 'Glutes',
  difficulty: 'Beginner',
  imageUrl: 'https://images.squarespace-cdn.com/content/v1/5259ae2ee4b018d723816b11/1547247702729-C1T4JRXSLS2ESFLC0UKC/fire+hydrant+glute+exercise.JPG',
  videoUrl: 'https://www.youtube.com/embed/La1jRcjg9Bs',
  desc: 'Exercise for glute medius and hip stability.',
  instructions: [
    'Start on hands and knees.',
    'Lift one knee outward.',
    'Keep hips stable.',
    'Lower slowly.'
  ],
  mistakes: 'Rotating the torso.',
  musclesWorked: ['Glute Medius', 'Hip Abductors']
},
// ═══════════════════════════════════════
// 10. ABS
// ═══════════════════════════════════════
{
  id: 900,
  name: 'Plank',
  category: 'Abs',
  difficulty: 'Beginner',
  imageUrl: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_1212,c_limit/ac7671a0-c57c-417b-91d1-de7f6de6bf0b/7-trainer-approved-plank-variations.jpg',
  videoUrl: 'https://www.youtube.com/embed/B296mZDhrP4',
  desc: 'Fundamental isometric core strengthening.',
  instructions: [
    'Forearms on floor, elbows under shoulders.',
    'Body in a straight line.',
    'Hold without letting hips sag.'
  ],
  mistakes: 'Hips sagging or rising too high.',
  musclesWorked: ['Core', 'Transverse Abdominis', 'Glutes']
},

{
  id: 901,
  name: 'Crunches',
  category: 'Abs',
  difficulty: 'Beginner',
  imageUrl: 'https://www.parambodyfitmind.com/wp-content/uploads/2019/04/double-crunches-1.jpg',
  videoUrl: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
  desc: 'Classic upper abdominal exercise.',
  instructions: [
    'Lie on back, knees bent.',
    'Hands behind head loosely.',
    'Curl shoulders off floor.',
    'Lower slowly.'
  ],
  mistakes: 'Pulling neck or using momentum.',
  musclesWorked: ['Upper Abs', 'Rectus Abdominis']
},

{
  id: 902,
  name: 'Bicycle Crunch',
  category: 'Abs',
  difficulty: 'Intermediate',
  imageUrl: 'https://cdn.mos.cms.futurecdn.net/4Jc8WZLF8QeyvHPaxZWY2S.jpg',
  videoUrl: 'https://www.youtube.com/embed/9FGilxCbdz8',
  desc: 'Dynamic core movement hitting upper abs and obliques.',
  instructions: [
    'Opposite elbow to opposite knee.',
    'Keep lower back pressed to floor.',
    'Extend opposite leg fully.',
    'Maintain slow controlled rhythm.'
  ],
  mistakes: 'Moving too fast or pulling neck.',
  musclesWorked: ['Rectus Abdominis', 'Obliques', 'Hip Flexors']
},

{
  id: 903,
  name: 'Leg Raises',
  category: 'Abs',
  difficulty: 'Intermediate',
  imageUrl: 'https://app-media.fitbod.me/v2/233/images/landscape/0_960x540.jpg',
  videoUrl: 'https://www.youtube.com/embed/l4kQd9eWclE',
  desc: 'Lower abdominal and hip flexor strengthening.',
  instructions: [
    'Lie flat on back.',
    'Raise legs to 90 degrees.',
    'Lower slowly without touching floor.'
  ],
  mistakes: 'Lower back arching off the floor.',
  musclesWorked: ['Lower Abs', 'Hip Flexors']
},

{
  id: 904,
  name: 'Russian Twist',
  category: 'Abs',
  difficulty: 'Intermediate',
  imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.5Dx103xJlRQB4AV-penIhgHaEw?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/wkD8rjkodUI',
  desc: 'Rotational core movement targeting obliques.',
  instructions: [
    'Sit slightly leaned back.',
    'Rotate torso side to side.',
    'Touch floor each side.'
  ],
  mistakes: 'Moving arms only instead of rotating torso.',
  musclesWorked: ['Obliques', 'Transverse Abdominis']
},

{
  id: 905,
  name: 'V-Ups',
  category: 'Abs',
  difficulty: 'Advanced',
  imageUrl: 'https://i.ytimg.com/vi/7UVgs18Y1P4/maxresdefault.jpg',
  videoUrl: 'https://www.youtube.com/embed/7XpL5p9X8S0',
  desc: 'Advanced full abdominal contraction exercise.',
  instructions: [
    'Lie flat with arms overhead.',
    'Lift legs and torso simultaneously.',
    'Touch toes at top.',
    'Lower with control.'
  ],
  mistakes: 'Using momentum or bending knees too much.',
  musclesWorked: ['Full Abs', 'Hip Flexors']
},

{
  id: 906,
  name: 'Side Plank',
  category: 'Abs',
  difficulty: 'Intermediate',
  imageUrl: 'https://images.healthshots.com/healthshots/en/uploads/2024/05/15203615/Side-planks.jpg',
  videoUrl: 'https://www.youtube.com/embed/NXr4Fwkuq60',
  desc: 'Isometric hold targeting obliques.',
  instructions: [
    'Support body on one forearm.',
    'Keep body straight.',
    'Hold position without dropping hips.'
  ],
  mistakes: 'Hips dropping toward floor.',
  musclesWorked: ['Obliques', 'Core', 'Glutes']
},

{
  id: 907,
  name: 'Flutter Kicks',
  category: 'Abs',
  difficulty: 'Beginner',
  imageUrl: 'https://images.bonnier.cloud/files/ifo/production/20210512153029/52-Flutter-kicks.00_00_07_13.Still001.jpg',
  videoUrl: 'https://www.youtube.com/embed/6i2mP03k8S0',
  desc: 'Lower ab endurance movement.',
  instructions: [
    'Lie flat on back.',
    'Raise legs slightly off floor.',
    'Kick alternately up and down.'
  ],
  mistakes: 'Arching the lower back.',
  musclesWorked: ['Lower Abs', 'Hip Flexors']
},

{
  id: 908,
  name: 'Hanging Leg Raise',
  category: 'Abs',
  difficulty: 'Advanced',
  imageUrl: 'https://bodybuilding-wizard.com/wp-content/uploads/2015/05/hanging-leg-raise-1-0.jpg',
  videoUrl: 'https://www.youtube.com/embed/hdwaWQZE7i0',
  desc: 'Advanced lower ab exercise performed on a pull-up bar.',
  instructions: [
    'Hang from pull-up bar.',
    'Raise legs to 90 degrees.',
    'Lower slowly without swinging.'
  ],
  mistakes: 'Using momentum or swinging.',
  musclesWorked: ['Lower Abs', 'Hip Flexors']
},

{
  id: 909,
  name: 'Dead Bug',
  category: 'Abs',
  difficulty: 'Beginner',
  imageUrl: 'https://images.ctfassets.net/hjcv6wdwxsdz/4dONTMLbARcQARebljmScd/f060c1753f99ae6e0a1d50463f0e9d9e/dead-bug-claudia-hold.png?w=1200',
  videoUrl: 'https://www.youtube.com/embed/44ScXWFaVBs',
  desc: 'Core stability exercise focusing on deep abdominal muscles.',
  instructions: [
    'Lie on back with arms and legs raised.',
    'Lower opposite arm and leg.',
    'Return and alternate.'
  ],
  mistakes: 'Lower back lifting off the floor.',
  musclesWorked: ['Transverse Abdominis', 'Core Stabilizers']
},

// ═══════════════════════════════════════
// 11. CARDIO & HIIT
// ═══════════════════════════════════════
{
  id: 1000,
  name: 'Burpees',
  category: 'Cardio & HIIT',
  difficulty: 'Intermediate',
  imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.6UaOV1e8IJZgUTGwIoW7tQHaEK?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/qLBImHhCXSw',
  desc: 'Ultimate full-body metabolic conditioning exercise.',
  instructions: [
    'Squat down placing hands on floor.',
    'Jump feet back into plank.',
    'Perform push-up.',
    'Jump forward and explode upward.'
  ],
  mistakes: 'Skipping push-up or lazy jump.',
  musclesWorked: ['Full Body', 'Cardiovascular']
},

{
  id: 1001,
  name: 'Mountain Climbers',
  category: 'Cardio & HIIT',
  difficulty: 'Beginner',
  imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.CMixsJBV3BAjfNJ6A9YZmAHaE8?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM',
  desc: 'High intensity plank-based cardio exercise.',
  instructions: [
    'Start in high plank position.',
    'Drive knees toward chest alternately.',
    'Maintain fast controlled pace.'
  ],
  mistakes: 'Piking hips or slow movement.',
  musclesWorked: ['Core', 'Hip Flexors', 'Shoulders', 'Cardio']
},

{
  id: 1002,
  name: 'High Knees',
  category: 'Cardio & HIIT',
  difficulty: 'Beginner',
  imageUrl: 'https://media1.popsugar-assets.com/files/thumbor/Lc0muastRnpc3ySgdLLop-XyA3o/fit-in/1200x630/filters:format_auto-!!-:strip_icc-!!-:fill-!white!-/2014/10/14/845/n/1922729/8918e9c19e2f35ff_Plyometrics-High-Knee-Skips/i/High-Knees.jpg',
  videoUrl: 'https://www.youtube.com/embed/ZndH1jUyc3A',
  desc: 'Running in place emphasizing knee drive.',
  instructions: [
    'Run in place.',
    'Lift knees to hip height.',
    'Keep arms pumping.'
  ],
  mistakes: 'Leaning backward or slow tempo.',
  musclesWorked: ['Hip Flexors', 'Core', 'Cardio']
},

{
  id: 1003,
  name: 'Jumping Jacks',
  category: 'Cardio & HIIT',
  difficulty: 'Beginner',
  imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.Qvee8DZO5_ngQbrCRW8XagHaE7?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/c4DAnQ6DtF8',
  desc: 'Classic warm-up and conditioning exercise.',
  instructions: [
    'Jump feet outward.',
    'Raise arms overhead.',
    'Return to starting position.'
  ],
  mistakes: 'Landing with locked knees.',
  musclesWorked: ['Full Body', 'Cardio']
},

{
  id: 1004,
  name: 'Jump Squats',
  category: 'Cardio & HIIT',
  difficulty: 'Intermediate',
  imageUrl: 'https://www.coachmagazine.fr/wp-content/uploads/2022/11/fessier-bombe-jump-squat.jpeg',
  videoUrl: 'https://www.youtube.com/embed/A-cFYWvaHr0',
  desc: 'Explosive lower body power movement.',
  instructions: [
    'Perform squat.',
    'Explode upward into jump.',
    'Land softly and repeat.'
  ],
  mistakes: 'Landing with stiff legs.',
  musclesWorked: ['Quads', 'Glutes', 'Cardio']
},

{
  id: 1005,
  name: 'Skaters',
  category: 'Cardio & HIIT',
  difficulty: 'Intermediate',
  imageUrl: 'https://www.inquirer.com/resizer/aOLsyO8NACSxb8dG_-L7Fo6CZyo=/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/pmn/NU4YYANCNVF4PPCUTEDRFAWSKA.jpg',
  videoUrl: 'https://www.youtube.com/embed/4RuxhVBCBy0',
  desc: 'Lateral explosive movement improving agility.',
  instructions: [
    'Jump sideways from one leg to the other.',
    'Swing arms for balance.',
    'Stay low in athletic stance.'
  ],
  mistakes: 'Small jumps or unstable landing.',
  musclesWorked: ['Glutes', 'Quads', 'Core', 'Cardio']
},

{
  id: 1006,
  name: 'Star Jumps',
  category: 'Cardio & HIIT',
  difficulty: 'Intermediate',
  imageUrl: 'https://cdn.shopify.com/s/files/1/1876/4703/files/Star_Jump_-_girl_-_shutterstock_1352433995_1024x1024.jpg?v=1670496196',
  videoUrl: 'https://www.youtube.com/embed/qdJSCjkxSf8',
  desc: 'Explosive full-body jump variation.',
  instructions: [
    'Start in squat.',
    'Jump explosively spreading arms and legs.',
    'Land softly and repeat.'
  ],
  mistakes: 'Not fully extending body.',
  musclesWorked: ['Full Body', 'Cardio']
},

{
  id: 1007,
  name: 'Plank Jack',
  category: 'Cardio & HIIT',
  difficulty: 'Intermediate',
  imageUrl: 'https://bod-blog-assets.prod.cd.beachbodyondemand.com/bod-blog/wp-content/uploads/2022/08/15155818/plank-jack-600-demo.jpg',
  videoUrl: 'https://www.youtube.com/embed/hKQh0LBBzXQ',
  desc: 'Plank-based cardio movement.',
  instructions: [
    'Start in plank position.',
    'Jump feet wide.',
    'Jump feet back together.',
    'Repeat quickly.'
  ],
  mistakes: 'Dropping hips.',
  musclesWorked: ['Core', 'Shoulders', 'Cardio']
},
  // ═══════════════════════════════════════
// 12. LEGS
// ═══════════════════════════════════════
{
  id: 1100,
  name: 'Calf Raises',
  category: 'Legs',
  difficulty: 'Beginner',
  imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/screen-shot-2023-12-21-at-5-01-33-pm-1-658c642a2bf8d.png?resize=980:*',
  videoUrl: 'https://www.youtube.com/embed/gwLzBJYoWlI',
  desc: 'Calf strengthening exercise improving ankle stability.',
  instructions: [
    'Stand on flat ground or step edge.',
    'Raise heels lifting onto toes.',
    'Pause briefly at top.',
    'Lower slowly below start position.'
  ],
  mistakes: 'Bouncing without control.',
  musclesWorked: ['Gastrocnemius', 'Soleus']
},

{
  id: 1101,
  name: 'Step-Ups',
  category: 'Legs',
  difficulty: 'Beginner',
  imageUrl: 'https://ik.imagekit.io/02fmeo4exvw/expert-articles/2017/04/2017-04-05-create-innovative-fitness-programs-lateral-step-up.png',
  videoUrl: 'https://www.youtube.com/embed/dQqApCGd5Ss',
  desc: 'Functional leg exercise improving strength and balance.',
  instructions: [
    'Step onto elevated platform.',
    'Drive through working leg.',
    'Lift opposite knee upward.',
    'Step down slowly.'
  ],
  mistakes: 'Pushing off the back leg.',
  musclesWorked: ['Quads', 'Glutes', 'Balance']
},

{
  id: 1102,
  name: 'Good Mornings',
  category: 'Legs',
  difficulty: 'Intermediate',
  imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.DWPtEojz8qcmSs5gf5gO0gHaG2?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/YA-h3n9L4YU',
  desc: 'Hip hinge movement strengthening posterior chain.',
  instructions: [
    'Stand upright with bar on shoulders.',
    'Hinge hips backward.',
    'Lower torso forward.',
    'Return to standing.'
  ],
  mistakes: 'Rounding the lower back.',
  musclesWorked: ['Hamstrings', 'Glutes', 'Lower Back']
},
   // ═══════════════════════════════════════
// 13. FULL BODY
// ═══════════════════════════════════════
{
  id: 1200,
  name: 'Kettlebell Swing',
  category: 'Full Body',
  difficulty: 'Intermediate',
  imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.ddzGjGMKhJW_53LDlgP-AAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
  videoUrl: 'https://www.youtube.com/embed/YSxHifyI6s8',
  desc: 'Explosive hip hinge movement for power and conditioning.',
  instructions: [
    'Hinge at hips swinging kettlebell between legs.',
    'Drive hips forward explosively.',
    'Allow kettlebell to rise to chest height.',
    'Control the downward swing.'
  ],
  mistakes: 'Turning the movement into a squat.',
  musclesWorked: ['Glutes', 'Hamstrings', 'Core', 'Shoulders']
},

{
  id: 1201,
  name: 'Thruster',
  category: 'Full Body',
  difficulty: 'Advanced',
  imageUrl: 'https://www.shape.com/thmb/yQhP4Iv-tfkJsBer4r8TrLkoJLI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Thruster-Exercise-GettyImages-647210486-a51a5ee710ea48178baaa970e7d4d1ef.jpg',
  videoUrl: 'https://www.youtube.com/embed/L219gx5wLg4',
  desc: 'Compound squat-to-press movement for full body strength.',
  instructions: [
    'Hold dumbbells at shoulders.',
    'Perform a squat.',
    'Drive upward explosively.',
    'Press weights overhead.'
  ],
  mistakes: 'Pressing without using leg drive.',
  musclesWorked: ['Quads', 'Glutes', 'Shoulders', 'Core']
},

{
  id: 1202,
  name: 'Bear Crawl',
  category: 'Full Body',
  difficulty: 'Intermediate',
  imageUrl: 'https://ik.imagekit.io/02fmeo4exvw/exercise-library/large/150-3.jpg',
  videoUrl: 'https://www.youtube.com/embed/FjMDRNJ0_5g',
  desc: 'Full body crawling movement improving core and shoulder stability.',
  instructions: [
    'Start on hands and feet with knees slightly off floor.',
    'Move opposite hand and foot forward.',
    'Keep hips low and core tight.'
  ],
  mistakes: 'Allowing hips to bounce.',
  musclesWorked: ['Shoulders', 'Core', 'Quads', 'Full Body']
},

{
  id: 1203,
  name: 'Inchworm',
  category: 'Full Body',
  difficulty: 'Beginner',
  imageUrl: 'https://julielohre.com/wp-content/uploads/2018/11/Inchworm-Exercise-Warmup.jpg',
  videoUrl: 'https://www.youtube.com/embed/MfV7_ezHrRU',
  desc: 'Dynamic warm-up movement for flexibility and core activation.',
  instructions: [
    'Hinge forward touching hands to floor.',
    'Walk hands forward into plank.',
    'Walk feet toward hands.',
    'Stand up and repeat.'
  ],
  mistakes: 'Bending knees too much.',
  musclesWorked: ['Hamstrings', 'Core', 'Shoulders', 'Full Body']
},
 // ═══════════════════════════════════════
// 14. FLEXIBILITY & MOBILITY
// ═══════════════════════════════════════
{
  id: 1300,
  name: "World's Greatest Stretch",
  category: 'Flexibility & Mobility',
  difficulty: 'Beginner',
  imageUrl: 'https://www.mensjournal.com/.image/t_share/MTk2MTM2Njg3NDY5Mjc0NjI5/step-3.jpg',
  videoUrl: 'https://www.youtube.com/embed/e1Pb0RLGJpE',
  desc: 'Comprehensive dynamic stretch for hips, thoracic spine, and hamstrings.',
  instructions: [
    'Step into deep lunge position.',
    'Place one hand on floor.',
    'Rotate torso upward reaching arm overhead.',
    'Alternate sides slowly.'
  ],
  mistakes: 'Moving too fast without breathing.',
  musclesWorked: ['Hips', 'Thoracic Spine', 'Hamstrings', 'Shoulders']
},

{
  id: 1301,
  name: 'Hip Flexor Stretch',
  category: 'Flexibility & Mobility',
  difficulty: 'Beginner',
  imageUrl: 'https://global-uploads.webflow.com/62e81a69667bcef4906b32e4/6332c0702a4536630e2c9fff_half-kneeling-hip-flexor-stretch-technique-side-view.jpg',
  videoUrl: 'https://www.youtube.com/embed/YqF6Ufo37Rs',
  desc: 'Essential stretch for tight hips caused by prolonged sitting.',
  instructions: [
    'Kneel on one knee.',
    'Push hips forward gently.',
    'Keep torso upright.',
    'Hold 30-60 seconds each side.'
  ],
  mistakes: 'Arching lower back instead of stretching hips.',
  musclesWorked: ['Hip Flexors', 'Quads', 'Groin']
},

{
  id: 1302,
  name: 'Downward Dog',
  category: 'Flexibility & Mobility',
  difficulty: 'Beginner',
  imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.zK7cXbvfIf66vZDD3cibbgHaEZ?pid=Api&P=0&h=180',
  videoUrl: 'https://www.youtube.com/embed/EC7RGJ975iM',
  desc: 'Yoga posture stretching hamstrings, calves and shoulders.',
  instructions: [
    'Start on hands and knees.',
    'Push hips upward forming an inverted V.',
    'Press heels toward floor.',
    'Hold and breathe.'
  ],
  mistakes: 'Rounding the back.',
  musclesWorked: ['Hamstrings', 'Calves', 'Shoulders', 'Spine']
},

{
  id: 1303,
  name: 'Pigeon Pose',
  category: 'Flexibility & Mobility',
  difficulty: 'Intermediate',
  imageUrl: 'https://bodybyyoga.training/wp-content/uploads/2021/10/Pigeon-Pose-2048x1365.jpg',
  videoUrl: 'https://www.youtube.com/embed/b4GJb4yZvR4',
  desc: 'Deep hip opener targeting glutes and hip rotators.',
  instructions: [
    'Bring one leg forward bent.',
    'Extend other leg behind.',
    'Square hips forward.',
    'Lean forward to deepen stretch.'
  ],
  mistakes: 'Letting hips tilt sideways.',
  musclesWorked: ['Glutes', 'Hip Rotators', 'Hip Flexors']
},

{
  id: 1304,
  name: 'Thoracic Rotation',
  category: 'Flexibility & Mobility',
  difficulty: 'Beginner',
  imageUrl: 'https://movewell.com.au/wp-content/uploads/thoracic-spine-rotation-with-reach.jpg',
  videoUrl: 'https://www.youtube.com/embed/OAJxoJGpnx0',
  desc: 'Mobility exercise improving thoracic spine rotation.',
  instructions: [
    'Lie on side with knees bent.',
    'Extend arms in front.',
    'Rotate top arm backward opening chest.',
    'Return slowly.'
  ],
  mistakes: 'Twisting from lower back.',
  musclesWorked: ['Thoracic Spine', 'Chest', 'Shoulders']
},

{
  id: 1305,
  name: "Child's Pose",
  category: 'Flexibility & Mobility',
  difficulty: 'Beginner',
  imageUrl: 'https://ironwoodyogastudios.com/wp-content/uploads/2021/05/online-yoga-childs-pose.jpg',
  videoUrl: 'https://www.youtube.com/embed/2MJGg-dUKh0',
  desc: 'Relaxing yoga stretch for lower back and hips.',
  instructions: [
    'Kneel and sit back on heels.',
    'Stretch arms forward.',
    'Lower chest toward floor.',
    'Breathe deeply.'
  ],
  mistakes: 'Holding tension in shoulders.',
  musclesWorked: ['Lower Back', 'Hips', 'Shoulders']
},
];

export const exercises: Exercise[] = baseExercises

export const CATEGORIES = [
  'All',
  'Push-ups',
  'Chest',
  'Back',
  'Shoulders & Arms',
  'Biceps',
  'Triceps',
  'Squats',
  'Lunges',
  'Legs',
  'Glutes',
  'Abs',
  'Cardio & HIIT',
  'Full Body',
  'Flexibility & Mobility',
]