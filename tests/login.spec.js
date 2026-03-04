// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login OK', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  page.pause
  await loginPage.fillCredentials('standard_user', 'secret_sauce');
  await loginPage.submit();


  // ✅ Exemple: vérifier qu’on a changé de page (adapte)
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');  // le navigateur doit être sur cette page après login
});

test('login KO affiche une erreur', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillCredentials('wrong@test.com', 'wrongpass');

  await loginPage.expectErrorVisible();
});