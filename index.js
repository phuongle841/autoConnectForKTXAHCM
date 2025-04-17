const puppeteer = require("puppeteer");

const delayBeforeStart = 15 * 60 * 1000 + 0.1 * 60 * 1000; // 15 minutes + 6 seconds

async function runScript() {
  const runTime = new Date().toLocaleString();
  console.log(`\n[${runTime}] Starting script...`);

  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome", // Or adjust path if needed
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(
    "http://v1.awingconnect.vn/login?serial=85-1A-07-07-FD-86&client_mac=F4:26:79:1C:08:AE&client_ip=192.168.205.33&userurl=http://acm.awingconnect.vn/&login_url=http://192.168.200.1/login&chap_id=&chap_challenge="
  );

  try {
    await page.waitForSelector("#remind-me", { visible: true, timeout: 10000 });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await page.click("#remind-me");

    await new Promise((resolve) => setTimeout(resolve, 10000));
    await page.waitForSelector("#connectToInternet", { visible: true });
    await page.click("#connectToInternet");

    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(`[${runTime}] Successfully completed.`);
  } catch (err) {
    console.error(`[${runTime}] Something went wrong:`, err.message);
  } finally {
    await browser.close();
  }
}

// Run once immediately
runScript();

// Repeat every 15 minutes
setInterval(runScript, delayBeforeStart);

