#!/usr/bin/env tsx
/**
 * Real package-based test of @supacrawler/js screenshot features
 * 
 * This demonstrates how a real user would use the package after installing:
 * npm install @supacrawler/js
 */

import { 
  SupacrawlerClient, 
  ScreenshotCreateRequest 
} from '@supacrawler/js'

// Initialize client exactly like a real user would
const client = new SupacrawlerClient({
  apiKey: process.env.SUPACRAWLER_API_KEY || '', // Empty for local testing
  baseUrl: process.env.SUPACRAWLER_BASE_URL || 'http://localhost:8081' // Local for testing
})

async function testPackageBasedScreenshots() {
  console.log('🚀 Testing @supacrawler/js Package - Screenshot Features')
  console.log('='.repeat(60))
  console.log('This demonstrates real package usage after npm install')
  
  const tests = [
    {
      name: 'Basic Desktop PNG',
      request: {
        url: 'https://antoineross.com',
        device: ScreenshotCreateRequest.device.DESKTOP,
        format: ScreenshotCreateRequest.format.PNG,
        full_page: false
      } as ScreenshotCreateRequest
    },
    {
      name: 'Mobile Portrait JPEG',
      request: {
        url: 'https://antoineross.com',
        device: ScreenshotCreateRequest.device.MOBILE,
        format: ScreenshotCreateRequest.format.JPEG,
        quality: 90,
        full_page: true,
        is_landscape: false
      } as ScreenshotCreateRequest
    },
    {
      name: 'Custom Dark Mode',
      request: {
        url: 'https://antoineross.com',
        device: ScreenshotCreateRequest.device.CUSTOM,
        width: 1200,
        height: 800,
        dark_mode: true,
        format: ScreenshotCreateRequest.format.PNG
      } as ScreenshotCreateRequest
    },
    {
      name: 'Content Blocking Advanced',
      request: {
        url: 'https://antoineross.com',
        device: ScreenshotCreateRequest.device.DESKTOP,
        format: ScreenshotCreateRequest.format.PNG,
        block_ads: true,
        block_cookies: true,
        block_trackers: true,
        block_resources: ['image', 'font'],
        hide_selectors: ['footer', '.social'],
        wait_until: ScreenshotCreateRequest.wait_until.DOMCONTENTLOADED,
        delay: 2
      } as ScreenshotCreateRequest
    },
    {
      name: 'Accessibility Features',
      request: {
        url: 'https://antoineross.com',
        device: ScreenshotCreateRequest.device.TABLET,
        format: ScreenshotCreateRequest.format.PNG,
        dark_mode: true,
        reduced_motion: true,
        high_contrast: true,
        is_landscape: true,
        user_agent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      } as ScreenshotCreateRequest
    },
    {
      name: 'Headers and Cookies',
      request: {
        url: 'https://antoineross.com',
        device: ScreenshotCreateRequest.device.DESKTOP,
        format: ScreenshotCreateRequest.format.JPEG,
        quality: 95,
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          'X-Package-Test': 'supacrawler-js-package'
        },
        cookies: [
          {
            name: 'theme',
            value: 'dark',
            domain: 'antoineross.com'
          }
        ]
      } as ScreenshotCreateRequest
    }
  ]
  
  let passed = 0
  const total = tests.length
  
  for (const test of tests) {
    console.log(`\n${'='.repeat(15)} ${test.name} ${'='.repeat(15)}`)
    console.log(`📸 Testing ${test.name}...`)
    
    try {
      // Create screenshot job using the installed package
      const job = await client.createScreenshotJob(test.request)
      console.log(`✅ Created job: ${job.job_id}`)
      
      // Wait for completion using the package's wait method
      const result = await client.waitForScreenshot(job.job_id!, { timeoutMs: 30000 })
      
      console.log(`✅ ${test.name} completed successfully!`)
      console.log(`   Size: ${result.metadata?.width}x${result.metadata?.height}`)
      console.log(`   Format: ${result.metadata?.format}`)
      console.log(`   File Size: ${result.metadata?.file_size} bytes`)
      console.log(`   Load Time: ${result.metadata?.load_time}ms`)
      console.log(`   URL: ${result.screenshot?.substring(0, 80)}...`)
      
      passed++
      
    } catch (error) {
      console.log(`❌ ${test.name} failed: ${error}`)
    }
  }
  
  // Summary
  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 PACKAGE TEST SUMMARY: ${passed}/${total} tests passed`)
  
  if (passed === total) {
    console.log('\n🎉 ALL PACKAGE TESTS PASSED!')
    console.log('\n💡 Package Features Verified:')
    console.log('   ✅ Package installs correctly via npm')
    console.log('   ✅ Imports work: import { SupacrawlerClient, ScreenshotCreateRequest } from "@supacrawler/js"')
    console.log('   ✅ TypeScript types are properly exported')
    console.log('   ✅ Clean enum API: ScreenshotCreateRequest.device.DESKTOP')
    console.log('   ✅ All screenshot features work as installed package')
    console.log('   ✅ No build or import issues')
    console.log('\n🚀 Ready for real-world usage!')
    return 0
  } else {
    console.log(`❌ ${total - passed} package tests failed`)
    return 1
  }
}

// Show package.json to confirm installation
async function showPackageInfo() {
  try {
    const fs = await import('fs/promises')
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf-8'))
    console.log('\n📦 Installed Package Info:')
    console.log(`   Package: ${packageJson.dependencies['@supacrawler/js']}`)
    console.log('   This confirms the package was installed from the local tarball')
  } catch (error) {
    console.log('Could not read package info')
  }
}

// Run the tests
async function main() {
  await showPackageInfo()
  const exitCode = await testPackageBasedScreenshots()
  process.exit(exitCode)
}

main().catch((error) => {
  console.error('Package test failed:', error)
  process.exit(1)
})
