const puppeteer = require('puppeteer');

const getTimeFromPerformanceMetrics = (metrics, name) =>
  metrics.metrics.find(x => x.name === name).value * 1000;

const extractDataFromPerformanceMetrics = (metrics, ...dataNames) => {
  const navigationStart = getTimeFromPerformanceMetrics(
    metrics,
    'NavigationStart'
  );

  const extractedData = {};
  dataNames.forEach(name => {
    extractedData[name] =
      getTimeFromPerformanceMetrics(metrics, name) - navigationStart;
  });

  return extractedData;
};

async function getFirstMeaningfulPaint (page, url) {
  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');

  await page.goto(url);

  let firstMeaningfulPaint = 0;
  let performanceMetrics;
  while (firstMeaningfulPaint === 0) {
    await page.waitFor(300);
    performanceMetrics = await client.send('Performance.getMetrics');
    firstMeaningfulPaint = getTimeFromPerformanceMetrics(
      performanceMetrics,
      'FirstMeaningfulPaint'
    );
  }


  return extractDataFromPerformanceMetrics(
    performanceMetrics,
    'FirstMeaningfulPaint'
  );
}

async function testURL(name, url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(name);
  console.log(await getFirstMeaningfulPaint(page, url));

  await page.screenshot({ path: 'screenshot-' + name + '.png' });

  return browser.close();
}

(async () => {
  await testURL('React', 'http://localhost:5000');
  await testURL('Panda', 'http://localhost:4949');
})();
