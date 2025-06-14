// Test script for EmailJS integration
// Run this in browser console to test EmailJS setup

const testEmailJS = async () => {
  console.log("Testing EmailJS integration...")
  
  // Check if environment variables are loaded
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  
  console.log("Environment Variables:")
  console.log("Public Key:", publicKey ? "✅ Set" : "❌ Missing")
  console.log("Service ID:", serviceId ? "✅ Set" : "❌ Missing")
  console.log("Template ID:", templateId ? "✅ Set" : "❌ Missing")
  
  if (!publicKey || !serviceId || !templateId) {
    console.error("❌ Missing EmailJS environment variables. Check your .env.local file.")
    return
  }
  
  try {
    // Test with dummy data
    const testData = {
      from_name: "Test User",
      from_email: "test@example.com",
      to_email: "bilalelazzam.dev@gmail.com",
      subject: "Portfolio Test Message",
      message: "This is a test message from the portfolio contact form.",
      reply_to: "test@example.com"
    }
    
    const result = await emailjs.send(serviceId, templateId, testData, publicKey)
    console.log("✅ EmailJS test successful!", result)
    console.log("📧 Test email should arrive at bilalelazzam.dev@gmail.com")
    
  } catch (error) {
    console.error("❌ EmailJS test failed:", error)
    console.log("Check your EmailJS configuration and try again.")
  }
}

// Uncomment the line below to run the test
// testEmailJS()

export default testEmailJS
