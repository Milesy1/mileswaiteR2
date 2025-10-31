// Script to verify Google Analytics is loading on the live site
const https = require('https');
const { URL } = require('url');

const LIVE_URL = 'https://mileswaite.net'; // Update if different
const GA_TEST_URL = `${LIVE_URL}/ga-test`;

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function verifyGA() {
  console.log('🔍 Verifying Google Analytics on live site...\n');
  console.log(`📍 Checking: ${LIVE_URL}\n`);

  try {
    // Check main page
    console.log('1. Fetching homepage...');
    const homePage = await fetchPage(LIVE_URL);
    
    if (homePage.statusCode !== 200) {
      console.log(`❌ Homepage returned status ${homePage.statusCode}`);
      return;
    }

    // Check for GA script
    const hasGAScript = homePage.body.includes('googletagmanager.com/gtag/js');
    const hasGAConfig = homePage.body.includes('gtag') || homePage.body.includes('dataLayer');
    const hasMeasurementId = homePage.body.includes('G-');

    console.log('2. Checking for Google Analytics script...');
    console.log(`   - GTM Script: ${hasGAScript ? '✅ Found' : '❌ Not found'}`);
    console.log(`   - GA Config: ${hasGAConfig ? '✅ Found' : '❌ Not found'}`);
    console.log(`   - Measurement ID: ${hasMeasurementId ? '✅ Found' : '❌ Not found'}`);

    // Check GA test page
    console.log('\n3. Checking GA test page...');
    try {
      const testPage = await fetchPage(GA_TEST_URL);
      if (testPage.statusCode === 200) {
        console.log(`   ✅ GA test page accessible: ${GA_TEST_URL}`);
      } else {
        console.log(`   ⚠️  GA test page returned status ${testPage.statusCode}`);
      }
    } catch (err) {
      console.log(`   ⚠️  Could not access GA test page: ${err.message}`);
    }

    // Summary
    console.log('\n📊 Summary:');
    if (hasGAScript || hasGAConfig) {
      console.log('✅ Google Analytics appears to be configured!');
      console.log('\n📝 Next steps:');
      console.log('   1. Visit your live site in a browser');
      console.log('   2. Open Chrome DevTools (F12) → Network tab');
      console.log('   3. Filter by "google-analytics.com"');
      console.log('   4. You should see requests to Google Analytics');
      console.log('   5. Check Google Analytics Realtime dashboard');
    } else {
      console.log('❌ Google Analytics script not found in HTML');
      console.log('\n⚠️  Possible issues:');
      console.log('   - NEXT_PUBLIC_GA_MEASUREMENT_ID not set in Vercel');
      console.log('   - Site needs to be redeployed after adding env variable');
      console.log('   - Check Vercel deployment logs');
    }

  } catch (error) {
    console.error('❌ Error verifying GA:', error.message);
  }
}

verifyGA();

