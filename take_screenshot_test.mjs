/**
 * Simple script to take a screenshot of a webpage using ES modules
 */

import puppeteer from 'puppeteer';

async function takeScreenshot() {
  console.log('Starting browser...');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 800 }
  });
  
  try {
    console.log('Opening page...');
    const page = await browser.newPage();
    
    // Navigate to our test page
    console.log('Navigating to test page...');
    await page.goto('http://localhost:5000/test/teacher-resources', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait a bit to ensure page is fully loaded
    await page.waitForTimeout(3000);
    
    // Take screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'test_resources_page.png' });
    
    console.log('Screenshot saved as test_resources_page.png');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshot();