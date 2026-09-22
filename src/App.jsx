import React from 'react'
import StoryBook from './components/StoryBook'
import GreenFieldStarsBackground from './components/GreenFieldStarsBackground'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020d18] via-[#052026] to-[#041a14]">
      {/* Green Field with Starry Night Sky Background */}
      <GreenFieldStarsBackground />

      {/* Main Storybook Application */}
      <StoryBook />
    </div>
  )
}

export default App
