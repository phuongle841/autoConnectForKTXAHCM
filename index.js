const puppeteer = require("puppeteer");

// Delay 15 minutes (in milliseconds)
const delayBeforeStart = 15 * 60 * 1000;

setTimeout(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome", // Adjust if needed
    headless: false,
  });

  const page = await browser.newPage();

  // Go to the login page
  await page.goto(
    "http://v1.awingconnect.vn/login?serial=85-1A-07-07-FD-86&client_mac=F4:26:79:1C:08:AE&client_ip=192.168.205.33&userurl=http://acm.awingconnect.vn/&login_url=http://192.168.200.1/login&chap_id=&chap_challenge="
  );

  // Wait for and click the "remind-me" button
  await page.waitForSelector("#remind-me", { visible: true });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await page.click("#remind-me");

  // Wait 10 more seconds
  await new Promise((resolve) => setTimeout(resolve, 10000));

  // Click the "connectToInternet" button
  await page.waitForSelector("#connectToInternet", { visible: true });
  await page.click("#connectToInternet");

  // Keep the browser open or close it
  // await browser.close();
}, delayBeforeStart);
