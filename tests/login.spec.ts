import {test, expect} from '@playwright/test';

test('deve exibir a tela de login', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: 'Bem-vindo de volta' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();

});
