/**
 * Supacrawler TypeScript SDK - Screenshot Examples
 * This file showcases all the advanced screenshot features available in the API
 * 
 * This example imports the package like a real user would after installing:
 * npm install @supacrawler/js
 */

import { SupacrawlerClient, ScreenshotCreateRequest } from '@supacrawler/js'

// Initialize client
const client = new SupacrawlerClient({
  apiKey: process.env.SUPACRAWLER_API_KEY || '', // Use empty string for local testing
  baseUrl: process.env.SUPACRAWLER_BASE_URL || 'https://api.supacrawler.com/api'
})

export async function example1_basicDesktopScreenshot() {
  console.log('\n📸 Example 1: Basic Desktop Screenshot')
  
  const request: ScreenshotCreateRequest = {
    url: 'https://antoineross.com',
    device: ScreenshotCreateRequest.device.DESKTOP,
    format: ScreenshotCreateRequest.format.PNG,
    full_page: false
  }
  
  const job = await client.createScreenshotJob(request)
  console.log(`Job created: ${job.job_id}`)
  
  const result = await client.waitForScreenshot(job.job_id!, { timeoutMs: 30000 })
  console.log(`✅ Desktop screenshot completed!`)
  console.log(`Size: ${result.metadata?.width}x${result.metadata?.height}`)
  console.log(`URL: ${result.screenshot}`)
  
  return result
}

export async function example2_mobilePortraitJpeg() {
  console.log('\n📱 Example 2: Mobile Portrait Screenshot (JPEG)')
  
  const request: ScreenshotCreateRequest = {
    url: 'https://antoineross.com',
    device: ScreenshotCreateRequest.device.MOBILE,
    format: ScreenshotCreateRequest.format.JPEG,
    quality: 90,
    full_page: true,
    is_landscape: false // Portrait mode
  }
  
  const job = await client.createScreenshotJob(request)
  const result = await client.waitForScreenshot(job.job_id!, { timeoutMs: 30000 })
  
  console.log(`✅ Mobile portrait screenshot completed!`)
  console.log(`Size: ${result.metadata?.width}x${result.metadata?.height}`)
  console.log(`Format: ${result.metadata?.format}, Quality: ${result.metadata?.quality}`)
  
  return result
}

export async function example3_customSizeDarkMode() {
  console.log('\n🌙 Example 3: Custom Size with Dark Mode')
  
  const request: ScreenshotCreateRequest = {
    url: 'https://antoineross.com',
    device: ScreenshotCreateRequest.device.CUSTOM,
    width: 1200,
    height: 800,
    device_scale: 1.5,
    dark_mode: true,
    format: ScreenshotCreateRequest.format.PNG,
    is_mobile: false,
    has_touch: false
  }
  
  const job = await client.createScreenshotJob(request)
  const result = await client.waitForScreenshot(job.job_id!, { timeoutMs: 30000 })
  
  console.log(`✅ Custom dark mode screenshot completed!`)
  console.log(`Custom size: ${result.metadata?.width}x${result.metadata?.height}`)
  console.log(`Dark mode applied with custom dimensions`)
  
  return result
}

export async function example4_contentBlocking() {
  console.log('\n🚫 Example 4: Advanced Content Blocking')
  
  const request: ScreenshotCreateRequest = {
    url: 'https://antoineross.com',
    device: ScreenshotCreateRequest.device.DESKTOP,
    format: ScreenshotCreateRequest.format.PNG,
    
    // Block unwanted content
    block_ads: true,
    block_cookies: true,
    block_trackers: true,
    block_resources: ['image', 'font'], // Block images and fonts for faster loading
    
    // Hide specific elements
    hide_selectors: ['footer', '.social-links', '#newsletter-popup'],
    
    // Wait for content
    wait_until: ScreenshotCreateRequest.wait_until.DOMCONTENTLOADED,
    delay: 2, // Wait 2 seconds after load
    timeout: 20
  }
  
  const job = await client.createScreenshotJob(request)
  const result = await client.waitForScreenshot(job.job_id!, { timeoutMs: 45000 })
  
  console.log(`✅ Content-blocked screenshot completed!`)
  console.log(`Load time: ${result.metadata?.load_time}ms`)
  console.log(`Blocked ads, cookies, trackers, and hidden elements`)
  
  return result
}

export async function example5_accessibilityFeatures() {
  console.log('\n♿ Example 5: Accessibility Features')
  
  const request: ScreenshotCreateRequest = {
    url: 'https://antoineross.com',
    device: ScreenshotCreateRequest.device.TABLET,
    format: ScreenshotCreateRequest.format.PNG,
    
    // Accessibility settings
    dark_mode: true,
    reduced_motion: true,
    high_contrast: true,
    
    // Custom user agent for tablet
    user_agent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
    
    // Tablet landscape
    is_landscape: true
  }
  
  const job = await client.createScreenshotJob(request)
  const result = await client.waitForScreenshot(job.job_id!, { timeoutMs: 30000 })
  
  console.log(`✅ Accessibility screenshot completed!`)
  console.log(`Features: Dark mode, Reduced motion, High contrast`)
  console.log(`Tablet landscape orientation`)
  
  return result
}

export async function example6_customHeadersAndCookies() {
  console.log('\n🍪 Example 6: Custom Headers and Cookies')
  
  const request: ScreenshotCreateRequest = {
    url: 'https://antoineross.com',
    device: ScreenshotCreateRequest.device.DESKTOP,
    format: ScreenshotCreateRequest.format.JPEG,
    quality: 95,
    
    // Custom headers
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'X-Custom-Header': 'typescript-screenshot-example',
      'User-Agent': 'SupacrawlerBot/1.0'
    },
    
    // Custom cookies
    cookies: [
      {
        name: 'theme',
        value: 'dark',
        domain: 'antoineross.com'
      },
      {
        name: 'session_id',
        value: 'abc123def456',
        path: '/',
        httpOnly: true
      }
    ]
  }
  
  const job = await client.createScreenshotJob(request)
  const result = await client.waitForScreenshot(job.job_id!, { timeoutMs: 30000 })
  
  console.log(`✅ Headers/cookies screenshot completed!`)
  console.log(`Custom headers and cookies applied successfully`)
  console.log(`JPEG quality: ${result.metadata?.quality}`)
  
  return result
}

export async function example7_waitForDynamicContent() {
  console.log('\n⏱️ Example 7: Wait for Dynamic Content')
  
  const request: ScreenshotCreateRequest = {
    url: 'https://antoineross.com',
    device: ScreenshotCreateRequest.device.DESKTOP,
    format: ScreenshotCreateRequest.format.PNG,
    
    // Wait for specific elements and network
    wait_for_selector: 'body', // Wait for body to be ready
    wait_until: ScreenshotCreateRequest.wait_until.NETWORKIDLE, // Wait for network to be idle
    delay: 3, // Additional 3 second delay
    timeout: 30,
    
    // Click an element before screenshot (if it exists)
    click_selector: 'button.accept-cookies',
    
    full_page: true
  }
  
  const job = await client.createScreenshotJob(request)
  const result = await client.waitForScreenshot(job.job_id!, { timeoutMs: 60000 })
  
  console.log(`✅ Dynamic content screenshot completed!`)
  console.log(`Waited for selector, network idle, and additional delay`)
  console.log(`Full page capture with dynamic loading`)
  
  return result
}

// Run all examples
export async function runAllExamples() {
  console.log('🚀 Supacrawler TypeScript SDK Screenshot Examples')
  console.log('='.repeat(60))
  console.log(`Using ${process.env.SUPACRAWLER_API_KEY ? 'API' : 'local engine'}`)
  
  const examples = [
    { name: 'Basic Desktop', fn: example1_basicDesktopScreenshot },
    { name: 'Mobile Portrait JPEG', fn: example2_mobilePortraitJpeg },
    { name: 'Custom Dark Mode', fn: example3_customSizeDarkMode },
    { name: 'Content Blocking', fn: example4_contentBlocking },
    { name: 'Accessibility', fn: example5_accessibilityFeatures },
    { name: 'Headers & Cookies', fn: example6_customHeadersAndCookies },
    { name: 'Dynamic Content', fn: example7_waitForDynamicContent }
  ]
  
  const results = []
  let completed = 0
  
  for (const example of examples) {
    try {
      console.log(`\n${'='.repeat(20)} ${example.name} ${'='.repeat(20)}`)
      const result = await example.fn()
      results.push({ name: example.name, result, success: true })
      completed++
      console.log(`✅ ${example.name} completed successfully`)
    } catch (error) {
      console.log(`❌ ${example.name} failed: ${error}`)
      results.push({ name: example.name, error, success: false })
    }
  }
  
  // Summary
  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 SUMMARY: ${completed}/${examples.length} examples completed successfully`)
  
  if (completed === examples.length) {
    console.log('\n🎉 ALL EXAMPLES COMPLETED!')
    console.log('\n💡 TypeScript SDK Features Demonstrated:')
    console.log('   ✅ Clean enum-based API (ScreenshotCreateRequest.device.DESKTOP)')
    console.log('   ✅ Full type safety with generated OpenAPI models')
    console.log('   ✅ All device presets: desktop, mobile, tablet, custom')
    console.log('   ✅ Multiple formats: PNG, JPEG with quality control')
    console.log('   ✅ Content blocking: ads, cookies, trackers, resources')
    console.log('   ✅ Accessibility: dark mode, reduced motion, high contrast')
    console.log('   ✅ Custom headers and cookies support')
    console.log('   ✅ Dynamic content waiting and element interaction')
    console.log('   ✅ Advanced timing controls and selectors')
  }
  
  return results
}

// Export all for individual use
export {
  ScreenshotCreateRequest,
  SupacrawlerClient
}

// If running directly
if (require.main === module) {
  runAllExamples().catch(console.error)
}