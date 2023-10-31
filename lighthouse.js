const { URL } = require('url');
const fs = require('fs');
const { lighthouse } = require('lighthouse');
const { promisify } = require('util');

async function generateReport() {
  const url = new URL('http://localhost:3000/home'); // Update the URL to match your React app's development URL

  const reportOptions = {
    output: 'html',
    outputPath: './reports/lighthouse-report.html', // Update the output path as desired
  };

  const result = await lighthouse(url.href, {
    port: new URL('chrome://version').port,
  });

  const html = result.report;
  const writeFileAsync = promisify(fs.writeFile);

  await writeFileAsync(reportOptions.outputPath, html);
  console.log(`Lighthouse report generated at ${reportOptions.outputPath}`);
}

generateReport();
