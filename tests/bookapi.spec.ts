import { test, expect, request } from '@playwright/test';
import { Book, GetBookRest } from '../src/types/book';
import { HomePage } from '../src/pages/home.page';

test('API get list books', async ({ request }) => {
  const getBooksRes = await request.get("/BookStore/v1/Books");
  expect(getBooksRes.status()).toEqual(200);
  const listBookData: GetBookRest = await getBooksRes.json();
  const listBook: Book[] = listBookData.books;
  expect(listBookData.books.length).toBeGreaterThan(0);
  let hasBook = false;
  for (const book of listBook) {
    expect(book.isbn).not.toBeNull();
    expect(book.title).not.toBeNull();
    expect(book.author).not.toBeNull();
    if (book.title === 'Git Pocket Guide') {
      hasBook = true;
    }
  };
  expect(hasBook).toBe(true);
});

test("Verify list book same UI and API", async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto(homePage.url);
   await homePage.listBooks.first().waitFor({ state: 'visible' });
  const totalBooks = await homePage.listBooks.count();
  console.log(`Show total: ${totalBooks}`);
  for (let i = 0; i < totalBooks; i++) {
    const bookTitle = await homePage.getBookTitle(homePage.listBooks.nth(i));
    console.log(bookTitle);
  }
});

