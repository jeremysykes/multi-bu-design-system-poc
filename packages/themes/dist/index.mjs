// src/bu-a.ts
import { buildTheme, loadTokens } from "@multi-bu/theme-engine";
var buATheme = null;
async function getBuATheme() {
  if (!buATheme) {
    const tokens = await loadTokens("bu-a");
    buATheme = buildTheme(tokens);
  }
  return buATheme;
}
var buAThemeSync = /* @__PURE__ */ (() => {
  return null;
})();

// src/bu-b.ts
import { buildTheme as buildTheme2, loadTokens as loadTokens2 } from "@multi-bu/theme-engine";
var buBTheme = null;
async function getBuBTheme() {
  if (!buBTheme) {
    const tokens = await loadTokens2("bu-b");
    buBTheme = buildTheme2(tokens);
  }
  return buBTheme;
}
var buBThemeSync = /* @__PURE__ */ (() => {
  return null;
})();

// src/bu-c.ts
import { buildTheme as buildTheme3, loadTokens as loadTokens3 } from "@multi-bu/theme-engine";
var buCTheme = null;
async function getBuCTheme() {
  if (!buCTheme) {
    const tokens = await loadTokens3("bu-c");
    buCTheme = buildTheme3(tokens);
  }
  return buCTheme;
}
var buCThemeSync = /* @__PURE__ */ (() => {
  return null;
})();

// src/bu-d.ts
import { buildTheme as buildTheme4, loadTokens as loadTokens4 } from "@multi-bu/theme-engine";
var buDTheme = null;
async function getBuDTheme() {
  if (!buDTheme) {
    const tokens = await loadTokens4("bu-d");
    buDTheme = buildTheme4(tokens);
  }
  return buDTheme;
}
var buDThemeSync = /* @__PURE__ */ (() => {
  return null;
})();
export {
  buAThemeSync,
  buBThemeSync,
  buCThemeSync,
  buDThemeSync,
  getBuATheme,
  getBuBTheme,
  getBuCTheme,
  getBuDTheme
};
