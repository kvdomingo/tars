import { expect, test } from '../fixtures';
import { generateRandomTestUser } from '../helpers';
import { AuthPage } from '../pages/auth';
import { ChatPage } from '../pages/chat';

test.describe('Login and Registration', () => {
  let authPage: AuthPage;

  const testUser = generateRandomTestUser();

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
  });

  test('Register new account', async () => {
    await authPage.register(testUser.email, testUser.password);
    await authPage.expectToastToContain('Account created successfully!');
  });

  test('Register new account with existing email', async () => {
    await authPage.register(testUser.email, testUser.password);
    await authPage.expectToastToContain('Account already exists!');
  });

  test('Log into account that exists', async ({ page }) => {
    await authPage.login(testUser.email, testUser.password);

    await page.waitForURL('/');
    await expect(page.getByPlaceholder('Send a message...')).toBeVisible();
  });

  test('Display user email in user menu', async ({ page }) => {
    await authPage.login(testUser.email, testUser.password);

    await page.waitForURL('/');
    await expect(page.getByPlaceholder('Send a message...')).toBeVisible();

    const userEmail = await page.getByTestId('user-email');
    await expect(userEmail).toHaveText(testUser.email);
  });

  test('Log out as non-guest user', async () => {
    await authPage.logout(testUser.email, testUser.password);
  });

  test('Log out is available for non-guest users', async ({ page }) => {
    await authPage.login(testUser.email, testUser.password);
    await page.waitForURL('/');

    authPage.openSidebar();

    const userNavButton = page.getByTestId('user-nav-button');
    await expect(userNavButton).toBeVisible();

    await userNavButton.click();
    const userNavMenu = page.getByTestId('user-nav-menu');
    await expect(userNavMenu).toBeVisible();

    const authMenuItem = page.getByTestId('user-nav-item-auth');
    await expect(authMenuItem).toContainText('Sign out');
  });

  test('Do not navigate to /register for non-guest users', async ({ page }) => {
    await authPage.login(testUser.email, testUser.password);
    await page.waitForURL('/');

    await page.goto('/register');
    await expect(page).toHaveURL('/');
  });

  test('Do not navigate to /login for non-guest users', async ({ page }) => {
    await authPage.login(testUser.email, testUser.password);
    await page.waitForURL('/');

    await page.goto('/login');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Entitlements', () => {
  let chatPage: ChatPage;

  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPage(page);
  });

  test('Guest user cannot send more than 20 messages/day', async () => {
    await chatPage.createNewChat();

    for (let i = 0; i <= 20; i++) {
      await chatPage.sendUserMessage('Why is the sky blue?');
      await chatPage.isGenerationComplete();
    }

    await chatPage.sendUserMessage('Why is the sky blue?');
    await chatPage.expectToastToContain(
      'You have exceeded your maximum number of messages for the day! Please try again later.',
    );
  });
});
