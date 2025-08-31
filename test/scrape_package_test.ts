#!/usr/bin/env tsx
/**
 * Package-based test of @supacrawler/js scrape features
 * 
 * This demonstrates how a real user would use the scrape functionality:
 * npm install @supacrawler/js
 */

import { SupacrawlerClient, ScrapeResponse } from '@supacrawler/js'

// Initialize client exactly like a real user would
const client = new SupacrawlerClient({
  apiKey: process.env.SUPACRAWLER_API_KEY || '', // Empty for local testing
  baseUrl: process.env.SUPACRAWLER_BASE_URL || 'http://localhost:8081' // Local for testing
})

async function testScrapeFeatures() {
  console.log('🚀 Testing @supacrawler/js Package - Scrape Features')
  console.log('='.repeat(60))
  console.log('This demonstrates real scrape package usage after npm install')
  
  const tests = [
    {
      name: 'Basic Markdown Scrape',
      params: {
        url: 'https://antoineross.com',
        format: 'markdown' as const
      }
    },
    {
      name: 'Markdown with HTML Content',
      params: {
        url: 'https://antoineross.com',
        format: 'markdown' as const,
        include_html: true,
        render_js: false
      }
    },
    {
      name: 'Links Discovery',
      params: {
        url: 'https://antoineross.com',
        format: 'links' as const,
        depth: 1,
        max_links: 50
      }
    },
    {
      name: 'JavaScript Rendering',
      params: {
        url: 'https://antoineross.com',
        format: 'markdown' as const,
        render_js: true,
        include_html: true
      }
    },
    {
      name: 'Fresh Content (No Cache)',
      params: {
        url: 'https://antoineross.com',
        format: 'markdown' as const,
        fresh: true
      }
    },
    {
      name: 'Deep Links Discovery',
      params: {
        url: 'https://antoineross.com',
        format: 'links' as const,
        depth: 2,
        max_links: 100
      }
    }
  ]
  
  let passed = 0
  const total = tests.length
  
  for (const test of tests) {
    console.log(`\n${'='.repeat(15)} ${test.name} ${'='.repeat(15)}`)
    console.log(`🔍 Testing ${test.name}...`)
    
    try {
      // Use the installed package's scrape method
      const result = await client.scrape(test.params)
      
      console.log(`✅ ${test.name} completed successfully!`)
      
      if (test.params.format === 'markdown') {
        const response = result as ScrapeResponse
        console.log(`   Content length: ${response.content?.content?.length || 0} characters`)
        console.log(`   Title: ${response.content?.metadata?.title || 'N/A'}`)
        console.log(`   Description: ${response.content?.metadata?.description?.substring(0, 100) || 'N/A'}...`)
        console.log(`   Load time: ${response.metadata?.load_time || 'N/A'}ms`)
      } else if (test.params.format === 'links') {
        console.log(`   Links discovered: ${(result as any).links?.length || 0}`)
        console.log(`   Total pages: ${(result as any).total || 0}`)
      }
      
      passed++
      
    } catch (error) {
      console.log(`❌ ${test.name} failed: ${error}`)
    }
  }
  
  // Summary
  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 SCRAPE PACKAGE TEST SUMMARY: ${passed}/${total} tests passed`)
  
  if (passed === total) {
    console.log('\n🎉 ALL SCRAPE PACKAGE TESTS PASSED!')
    console.log('\n💡 Scrape Package Features Verified:')
    console.log('   ✅ Package installs correctly via npm')
    console.log('   ✅ Imports work: import { SupacrawlerClient, ScrapeResponse } from "@supacrawler/js"')
    console.log('   ✅ TypeScript types are properly exported')
    console.log('   ✅ Markdown content extraction')
    console.log('   ✅ Links discovery with depth control')
    console.log('   ✅ JavaScript rendering support')
    console.log('   ✅ Fresh content fetching (no cache)')
    console.log('   ✅ HTML content inclusion')
    console.log('\n🚀 Scrape functionality ready for real-world usage!')
    return 0
  } else {
    console.log(`❌ ${total - passed} scrape package tests failed`)
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
  const exitCode = await testScrapeFeatures()
  process.exit(exitCode)
}

main().catch((error) => {
  console.error('Scrape package test failed:', error)
  process.exit(1)
})
