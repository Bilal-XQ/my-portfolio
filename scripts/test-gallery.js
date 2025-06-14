/**
 * Test Script for Project Image Gallery Functionality
 * 
 * This script simulates clicking on project images and verifies
 * that the gallery opens correctly.
 */

console.log('Testing Project Image Gallery Click Functionality...\n')

// Test function to simulate clicking on project images
function testProjectImageClicks() {
  console.log('🧪 Running Gallery Click Tests...\n')
  
  // Wait for the page to load
  setTimeout(() => {
    // Find all project images
    const projectImages = document.querySelectorAll('.project-image')
    const clickOverlays = document.querySelectorAll('[role="button"][aria-label*="View"]')
    
    console.log(`Found ${projectImages.length} project images`)
    console.log(`Found ${clickOverlays.length} click overlays`)
    
    if (clickOverlays.length === 0) {
      console.warn('❌ No click overlays found - gallery may not open properly')
      return
    }
    
    // Test clicking each overlay
    clickOverlays.forEach((overlay, index) => {
      setTimeout(() => {
        console.log(`\n🖱️  Testing click on project ${index + 1}...`)
        
        try {
          // Simulate click
          overlay.click()
          
          // Check if gallery opened
          setTimeout(() => {
            const gallery = document.querySelector('[class*="fixed"][class*="inset-0"][class*="z-"]')
            const galleryImage = document.querySelector('[alt*="Screenshot"]')
            
            if (gallery && galleryImage) {
              console.log(`✅ Gallery opened successfully for project ${index + 1}`)
              
              // Close gallery by pressing Escape
              const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
              document.dispatchEvent(escapeEvent)
              
              setTimeout(() => {
                const galleryAfterClose = document.querySelector('[class*="fixed"][class*="inset-0"][class*="z-"]')
                if (!galleryAfterClose) {
                  console.log(`✅ Gallery closed successfully for project ${index + 1}`)
                } else {
                  console.log(`⚠️  Gallery may not have closed properly for project ${index + 1}`)
                }
              }, 500)
              
            } else {
              console.log(`❌ Gallery failed to open for project ${index + 1}`)
            }
          }, 200)
          
        } catch (error) {
          console.error(`❌ Error clicking project ${index + 1}:`, error)
        }
      }, index * 2000) // Stagger tests to avoid conflicts
    })
    
  }, 1000)
}

// Test function for keyboard navigation
function testKeyboardNavigation() {
  console.log('\n⌨️  Testing Keyboard Navigation...')
  
  // Open first gallery
  const firstOverlay = document.querySelector('[role="button"][aria-label*="View"]')
  if (firstOverlay) {
    firstOverlay.click()
    
    setTimeout(() => {
      // Test arrow keys
      console.log('Testing right arrow...')
      const rightArrow = new KeyboardEvent('keydown', { key: 'ArrowRight' })
      document.dispatchEvent(rightArrow)
      
      setTimeout(() => {
        console.log('Testing left arrow...')
        const leftArrow = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
        document.dispatchEvent(leftArrow)
        
        setTimeout(() => {
          console.log('Testing escape key...')
          const escapeKey = new KeyboardEvent('keydown', { key: 'Escape' })
          document.dispatchEvent(escapeKey)
          console.log('✅ Keyboard navigation test completed')
        }, 500)
      }, 500)
    }, 500)
  }
}

// Run tests when page loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      testProjectImageClicks()
      setTimeout(testKeyboardNavigation, 5000)
    })
  } else {
    testProjectImageClicks()
    setTimeout(testKeyboardNavigation, 5000)
  }
}

console.log('\n📋 Test Instructions:')
console.log('1. Open the developer console (F12)')
console.log('2. Copy and paste this script into the console')
console.log('3. Press Enter to run the tests')
console.log('4. Watch for success/error messages')
console.log('5. Manually test clicking on project images to verify functionality')

export { testProjectImageClicks, testKeyboardNavigation }
