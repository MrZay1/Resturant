const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
 const browser = await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  let payload;
  await page.route('**/api/checkout', async route=>{
   payload=route.request().postDataJSON();
   await route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({error:'Offline verification: payment was not submitted.'})});
  });
  async function fit(label){
   const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(dimensions.scroll<=dimensions.width,`${label}: ${JSON.stringify(dimensions)}`);
  }
  async function total(value){
   assert.ok((await page.getByText(value,{exact:true}).count())>0,`Missing total ${value}`);
  }
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:900});
   const response=await page.goto('http://localhost:4182/order',{waitUntil:'networkidle'});
   assert.equal(response.status(),200);
   await total('$149');
   const regulars=page.getByRole('button',{name:/^Regulars Program/});
   await regulars.click();
   await total('$228');
   const nav=page.getByRole('navigation',{name:'Design sections'});
   for(const label of ['Template','Text','Color','Logo','Link','Details']){
    await nav.getByRole('button',{name:label,exact:true}).click();
    await page.waitForTimeout(220);
    await fit(`${width} ${label}`);
   }
   await page.getByRole('spinbutton',{name:'Number of cards'}).fill('20');
   await page.getByRole('spinbutton',{name:'Number of cards'}).blur();
   await total('$378');
   await page.getByRole('button',{name:/^Review Starter/}).click();
   await total('$299');
   console.log(`${width}px: both plans, six panels, extra-card totals and no overflow passed`);
  }
  const nav=page.getByRole('navigation',{name:'Design sections'});
  await nav.getByRole('button',{name:'Text',exact:true}).click();
  await page.waitForTimeout(250);
  await page.getByLabel(/^Restaurant name/).fill('Offline Test Restaurant');
  await nav.getByRole('button',{name:'Details',exact:true}).click();
  await page.waitForTimeout(250);
  await page.getByLabel('Your name',{exact:true}).fill('Offline Owner');
  await page.getByLabel('Email',{exact:true}).fill('offline@example.com');
  await page.getByRole('button',{name:/Continue to secure checkout/}).click();
  await page.getByText('Offline verification: payment was not submitted.').waitFor();
  assert.equal(payload.plan,'starter');assert.equal(payload.cards,20);
  await page.getByRole('button',{name:/^Regulars Program/}).click();
  await page.getByRole('button',{name:/Continue to secure checkout/}).click();
  await page.waitForTimeout(200);
  assert.equal(payload.plan,'regulars');assert.equal(payload.cards,20);
  console.log('Both selected plans reach the checkout payload; checkout intercepted, no payment created');
  for(const [query,plan] of [['plan=regulars','Regulars Program'],['report=1','Regulars Program'],['report=0','Review Starter'],['plan=starter','Review Starter']]){
   await page.goto(`http://localhost:4182/order?${query}`,{waitUntil:'networkidle'});
   assert.equal(await page.getByRole('button',{name:new RegExp("^"+plan)}).getAttribute('aria-pressed'),'true');
  }
  const out=path.resolve('..','..','output','order-plans');fs.mkdirSync(out,{recursive:true});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://localhost:4182/order?plan=regulars',{waitUntil:'networkidle'});
  await page.screenshot({path:path.join(out,'mobile.png'),fullPage:true});
  await page.setViewportSize({width:1440,height:1000});
  await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  console.log('Plan links and legacy links passed; screenshots saved; no browser JS errors');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1)});
