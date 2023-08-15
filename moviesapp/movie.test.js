const { By, Builder, Browser, until, Key } = require("selenium-webdriver");

let driver;

// Build a new driver for each test
beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

// Quit a driver after each test
afterEach(async () => {
  await driver.quit();
});

describe("Test the movies list homepage", () => {
    test("can check off a movie", async () => {
        await driver.get("http://localhost:3001/")
        await driver.findElement(By.name('movieTitle')).sendKeys('Princess Bride', Key.RETURN)

        await driver.sleep(2000)

        await driver.findElement(By.id('movie-0')).click()

        await driver.sleep(2000)
        const checkBox = await driver.wait(until.elementLocated(By.css('input[type="checkbox"]')), 1000)
        const isEnabled = checkBox.isEnabled();
        expect(isEnabled).toBeTruthy()
    }),
    test("Can destroy an evil movie", async () => {
        await driver.get("http://localhost:3001/")
        await driver.findElement(By.name('movieTitle')).sendKeys('Princess Bride', Key.RETURN)

        await driver.sleep(2000)

        await driver.findElement(By.css('button[class= "delete-btn"]')).click()

        await driver.sleep(2000)

        const deletedMovie = await driver.findElement(By.id('message')).getText()
        expect(deletedMovie).toBe('Princess Bride deleted!')
    })
})