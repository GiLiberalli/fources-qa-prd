import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env (BASE_URL, USER_EMAIL, USER_PASSWORD)
dotenv.config();

export default defineConfig({
  // Pasta onde ficam os arquivos de teste (*.spec.ts)
  testDir: './tests',

  // Executa os testes de arquivos diferentes em paralelo (mais rápido)
  fullyParallel: true,

  // Na CI, falha o build se alguém esquecer um test.only no código
  forbidOnly: !!process.env.CI,

  // Tentativas extras quando um teste falha: 2 na CI, 0 na sua máquina
  retries: process.env.CI ? 2 : 0,

  // Quantos testes rodam ao mesmo tempo: 1 na CI, automático local
  workers: process.env.CI ? 1 : undefined,

  // Tipo de relatório gerado ao final (abra com: npx playwright show-report)
  reporter: 'html',

  // Configurações compartilhadas por todos os testes
  use: {
    // URL base: nos testes usamos apenas page.goto('/login')
    baseURL: process.env.BASE_URL,

    // Gera o "trace" (gravação detalhada) quando um teste falha e é repetido
    trace: 'on-first-retry',
  },

  // Navegadores em que os testes rodam
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
