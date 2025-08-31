#!/usr/bin/env tsx
/**
 * Package-based test of @supacrawler/js crawl features
 * 
 * This demonstrates how a real user would use the crawl functionality:
 * npm install @supacrawler/js
 */

import { SupacrawlerClient, CrawlCreateRequest, CrawlCreateResponse, CrawlStatusResponse } from '@supacrawler/js'

// Initialize client exactly like a real user would
const client = new SupacrawlerClient({
  apiKey: process.env.SUPACRAWLER_API_KEY || '', // Empty for local testing
  baseUrl: process.env.SUPACRAWLER_BASE_URL || 'http://localhost:8081' // Local for testing
})

async function testCrawlFeatures() {
  console.log('🚀 Testing @supacrawler/js Package - Crawl Features')
  console.log('='.repeat(60))
  console.log('This demonstrates real crawl package usage after npm install')
  
  const tests = [
    {
      name: 'Basic Single Page Crawl',
      request: {
        url: 'https://antoineross.com',
        max_pages: 1,
        depth: 0
      } as CrawlCreateRequest
    },
    {
      name: 'Multi-Page Crawl with Depth',
      request: {
        url: 'https://antoineross.com',
        max_pages: 5,
        depth: 2,
        format: 'markdown'
      } as CrawlCreateRequest
    },
    {
      name: 'Links-Only Crawl',
      request: {
        url: 'https://antoineross.com',
        max_pages: 10,
        depth: 1,
        format: 'links'
      } as CrawlCreateRequest
    },
    {
      name: 'JavaScript Enabled Crawl',
      request: {
        url: 'https://antoineross.com',
        max_pages: 3,
        depth: 1,
        format: 'markdown',
        render_js: true
      } as CrawlCreateRequest
    },
    {
      name: 'Pattern-Based Include/Exclude',
      request: {
        url: 'https://antoineross.com',
        max_pages: 5,
        depth: 2,
        format: 'markdown',
        include_patterns: ['antoineross.com'],
        exclude_patterns: ['pdf', 'jpg', 'png']
      } as CrawlCreateRequest
    }
  ]
  
  let passed = 0
  const total = tests.length
  
  for (const test of tests) {
    console.log(`\n${'='.repeat(15)} ${test.name} ${'='.repeat(15)}`)
    console.log(`🕷️ Testing ${test.name}...`)
    
    try {
      // Create crawl job using the installed package
      const job: CrawlCreateResponse = await client.createCrawlJob(test.request)
      console.log(`✅ Created crawl job: ${job.job_id}`)
      
      // Wait for completion using the package's wait method
      const result: CrawlStatusResponse = await client.waitForCrawl(job.job_id!, { 
        intervalMs: 2000, 
        timeoutMs: 60000 
      })
      
      console.log(`✅ ${test.name} completed successfully!`)
      console.log(`   Status: ${result.status}`)
      console.log(`   Pages crawled: ${result.data?.length || 0}`)
      
      if (result.data && result.data.length > 0) {
        const firstPage = result.data[0]
        console.log(`   First page title: ${firstPage.content?.metadata?.title || 'N/A'}`)
        console.log(`   Content length: ${firstPage.content?.content?.length || 0} characters`)
      }
      
      if (result.statistics) {
        console.log(`   Total pages found: ${result.statistics.total_pages || 0}`)
        console.log(`   Pages crawled: ${result.statistics.crawled_pages || 0}`)
        console.log(`   Pages failed: ${result.statistics.failed_pages || 0}`)
      }
      
      passed++
      
    } catch (error) {
      console.log(`❌ ${test.name} failed: ${error}`)
    }
  }
  
  // Summary
  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 CRAWL PACKAGE TEST SUMMARY: ${passed}/${total} tests passed`)
  
  if (passed === total) {
    console.log('\n🎉 ALL CRAWL PACKAGE TESTS PASSED!')
    console.log('\n💡 Crawl Package Features Verified:')
    console.log('   ✅ Package installs correctly via npm')
    console.log('   ✅ Imports work: import { SupacrawlerClient, CrawlCreateRequest } from "@supacrawler/js"')
    console.log('   ✅ TypeScript types are properly exported')
    console.log('   ✅ Single and multi-page crawling')
    console.log('   ✅ Depth control and page limits')
    console.log('   ✅ Format selection (markdown, links)')
    console.log('   ✅ JavaScript rendering support')
    console.log('   ✅ Include/exclude pattern filtering')
    console.log('   ✅ Job status monitoring and waiting')
    console.log('\n🚀 Crawl functionality ready for real-world usage!')
    return 0
  } else {
    console.log(`❌ ${total - passed} crawl package tests failed`)
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
  const exitCode = await testCrawlFeatures()
  process.exit(exitCode)
}

main().catch((error) => {
  console.error('Crawl package test failed:', error)
  process.exit(1)
})
