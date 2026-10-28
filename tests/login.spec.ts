import {test, expect} from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('deve exibir a tela de login', async ({ page }) => {
    await expect(page.getByText('Bem-vindo de volta')).toBeVisible();
    await expect(page.getByRole('button', { name: ' Entrar' })).toBeVisible();
  });

  test('deve fazer login com credenciais válidas', async ({ page }) => {  
    await page.getByLabel('E-mail').fill(process.env.USER_EMAIL!);
    console.log('Tamanho da senha lida:', process.env.USER_PASSWORD?.length);
    await page.getByLabel('Senha').fill(process.env.USER_PASSWORD!);
    await page.getByRole('button', { name: ' Entrar' }).click();

    // Verifica se o login foi bem-sucedido, por exemplo, verificando se a página inicial é exibida
    await expect(page).toHaveURL(/login/);
  });
  
  test('deve exibir mensagem de erro com senha inválidas', async ({ page }) => {  
    await page.getByLabel('E-mail').fill(process.env.USER_EMAIL!);
    await page.getByLabel('Senha').fill('senha-errada-123');
    await page.getByRole('button', { name: ' Entrar' }).click();

    await expect(page).toHaveURL(/login/);
    await expect(page.getByText('E-mail ou senha incorretos.')).toBeVisible(); //mensagem de erro
  });
}); 