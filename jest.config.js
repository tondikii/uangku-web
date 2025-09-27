export default {
  // Menggunakan ts-jest preset untuk menangani TypeScript
  preset: "ts-jest",
  // Environment testing yang digunakan adalah jsdom (simulasi browser)
  testEnvironment: "jsdom",
  // File yang dijalankan setelah environment test setup, biasanya untuk setup tambahan seperti import matchers
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  // Mapping module, misalnya untuk alias path atau file static seperti CSS dan gambar
  moduleNameMapper: {
    // Jika menggunakan alias @ untuk src (sesuaikan dengan konfigurasi vite Anda)
    "^@/(.*)$": "<rootDir>/src/$1",
    // Mock untuk CSS/SCSS imports (biar ga error saat import styles)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Mock untuk file asset (gambar, font, dll.) - ini untuk runtime
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|svg)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
};
