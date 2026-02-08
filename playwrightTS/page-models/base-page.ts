import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
    constructor(readonly page: Page) { }

    locator = {
        buttonByText: (text: string) =>
            this.page.getByRole("button", { name: text }).or(
                this.page.locator(`//button[contains(., "${text}")]`)
            ),
        spinner: () => this.page.locator('//span[contains(@class, "spinner-border")]'),
        inputByPlaceholder: (ph: string) => this.page.getByPlaceholder(ph)
    };

    async type(selector: Locator, text: string) {
        await expect(selector).toBeVisible();
        await selector.fill(text);
    }

    async click(selector: Locator) {
        await expect(selector).toBeVisible();
        await selector.click();
    }

    async hover(selector: Locator) {
        await expect(selector).toBeVisible();
        await selector.hover();
    }

    async visit(url: string) {
        await this.page.goto(url);
    }
}
