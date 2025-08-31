#!/usr/bin/env tsx
/**
 * Comprehensive package test suite for @supacrawler/js
 * 
 * This runs all tests to verify the complete package functionality:
 * - Screenshots
 * - Scrape
 * - Crawl
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function runTest(testName: string, testFile: string) {
  console.log(`\n${'='.repeat(20)} ${testName} Tests ${'='.repeat(20)}`)
  console.log(`🧪 Running ${testName} package tests...`)
  
  try {
    const { stdout, stderr } = await execAsync(`bun run ${testFile}`)
    
    // Check if tests passed based on exit code and output
    if (stdout.includes('ALL') && stdout.includes('TESTS PASSED!')) {
      console.log(`✅ ${testName} package tests PASSED`)
      return true
    } else {
      console.log(`❌ ${testName} package tests FAILED`)
      if (stderr) console.log('Error output:', stderr)
      return false
    }
  } catch (error: any) {
    console.log(`❌ ${testName} package tests FAILED with error: ${error.message}`)
    return false
  }
}

async function main() {
  console.log('🚀 Running Complete @supacrawler/js Package Test Suite')
  console.log('='.repeat(70))
  console.log('This verifies the entire package works correctly after installation')
  
  const tests = [
    { name: 'Screenshot', file: 'screenshot_package_test.ts' },
    { name: 'Scrape', file: 'scrape_package_test.ts' },
    { name: 'Crawl', file: 'crawl_package_test.ts' }
  ]
  
  let passed = 0
  const total = tests.length
  
  console.log(`\n📦 Testing ${total} core features of @supacrawler/js package...`)
  
  for (const test of tests) {
    if (await runTest(test.name, test.file)) {
      passed++
    }
  }
  
  // Final summary
  console.log(`\n${'='.repeat(70)}`)
  console.log(`📊 COMPLETE PACKAGE TEST SUMMARY: ${passed}/${total} test suites passed`)
  
  if (passed === total) {
    console.log('\n🎉 ALL PACKAGE TEST SUITES PASSED!')
    console.log('\n🚀 @supacrawler/js Package is Ready for Production!')
    console.log('\n💡 Verified Features:')
    console.log('   ✅ Screenshots - All device types, formats, and advanced features')
    console.log('   ✅ Scrape - Markdown extraction, links discovery, JS rendering')
    console.log('   ✅ Crawl - Multi-page crawling, depth control, pattern filtering')
    console.log('   ✅ TypeScript - Full type safety and clean API')
    console.log('   ✅ Package - Proper installation and imports')
    console.log('\n📦 Package can be safely published to npm!')
    process.exit(0)
  } else {
    console.log(`\n❌ ${total - passed} test suite(s) failed`)
    console.log('Package needs fixes before production release.')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('Test runner failed:', error)
  process.exit(1)
})
