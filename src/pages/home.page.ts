import { Locator, Page } from "@playwright/test";

export class HomePage{
    readonly page: Page;
    readonly url="https://demoqa.com/books";
    readonly listBooks: Locator;


    constructor(page: Page){
        this.page=page;
        this.listBooks=this.page.locator("//div[@class='books-wrapper']//tbody/tr");
    }

   async getBookTitle(bookLocator: Locator): Promise<string> {
        return await bookLocator.locator('//a').innerText();
    }
}