// pages/LoginPage.js
export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ✅ Remplace ces sélecteurs par ceux de ton app (id, data-testid, etc.)
    this.usernameInput = page.locator('[data-test="username"] ');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginBtn = page.getByRole('button', { name: /login/i });

    // // Optionnel (messages / erreurs)
    this.errorAlert = page.locator('[data-test="error"]');
  }

  async goto(url = 'https://www.saucedemo.com/') {
    await this.page.goto(url);
    // petite sécurité: attendre que le formulaire soit visible
    await this.usernameInput.first().waitFor({ state: 'visible' });
  }

  async fillCredentials(username, password) {
    await this.usernameInput.first().fill(username);
    await this.passwordInput.first().fill(password);
  }

// promise permet de faire plusrieurs actions en même temps 
  async submit() {
    await Promise.all([
      this.page.waitForLoadState('networkidle').catch(() => {}), // évite de casser si SPA
      this.loginBtn.click(),
    ]);
  }

  // async login(username, password) {
  //   await this.fillCredentials(username, password);
  //   await this.submit();
  // }

  async expectErrorVisible() {
    await this.errorAlert.first().waitFor({ state: 'visible' });
  }
}