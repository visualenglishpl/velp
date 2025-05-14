import puppeteer from 'puppeteer';

async function takeScreenshot() {
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  // Set a larger viewport to see more content
  await page.setViewport({ width: 1200, height: 800 });
  
  try {
    // Visit the admin page
    await page.goto('http://localhost:5000/admin', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });
    
    // Wait for content to load (adjust selector as needed)
    await page.waitForSelector('.grid', { timeout: 5000 });
    
    // Take a screenshot
    await page.screenshot({ path: 'admin_screenshot.png' });
    console.log('Screenshot saved as admin_screenshot.png');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshot();