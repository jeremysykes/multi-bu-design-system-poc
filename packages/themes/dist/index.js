"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  buAThemeSync: () => buAThemeSync,
  buBThemeSync: () => buBThemeSync,
  buCThemeSync: () => buCThemeSync,
  buDThemeSync: () => buDThemeSync,
  getBuATheme: () => getBuATheme,
  getBuBTheme: () => getBuBTheme,
  getBuCTheme: () => getBuCTheme,
  getBuDTheme: () => getBuDTheme
});
module.exports = __toCommonJS(index_exports);

// src/bu-a.ts
var import_theme_engine = require("@multi-bu/theme-engine");
var buATheme = null;
async function getBuATheme() {
  if (!buATheme) {
    const tokens = await (0, import_theme_engine.loadTokens)("bu-a");
    buATheme = (0, import_theme_engine.buildTheme)(tokens);
  }
  return buATheme;
}
var buAThemeSync = /* @__PURE__ */ (() => {
  return null;
})();

// src/bu-b.ts
var import_theme_engine2 = require("@multi-bu/theme-engine");
var buBTheme = null;
async function getBuBTheme() {
  if (!buBTheme) {
    const tokens = await (0, import_theme_engine2.loadTokens)("bu-b");
    buBTheme = (0, import_theme_engine2.buildTheme)(tokens);
  }
  return buBTheme;
}
var buBThemeSync = /* @__PURE__ */ (() => {
  return null;
})();

// src/bu-c.ts
var import_theme_engine3 = require("@multi-bu/theme-engine");
var buCTheme = null;
async function getBuCTheme() {
  if (!buCTheme) {
    const tokens = await (0, import_theme_engine3.loadTokens)("bu-c");
    buCTheme = (0, import_theme_engine3.buildTheme)(tokens);
  }
  return buCTheme;
}
var buCThemeSync = /* @__PURE__ */ (() => {
  return null;
})();

// src/bu-d.ts
var import_theme_engine4 = require("@multi-bu/theme-engine");
var buDTheme = null;
async function getBuDTheme() {
  if (!buDTheme) {
    const tokens = await (0, import_theme_engine4.loadTokens)("bu-d");
    buDTheme = (0, import_theme_engine4.buildTheme)(tokens);
  }
  return buDTheme;
}
var buDThemeSync = /* @__PURE__ */ (() => {
  return null;
})();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buAThemeSync,
  buBThemeSync,
  buCThemeSync,
  buDThemeSync,
  getBuATheme,
  getBuBTheme,
  getBuCTheme,
  getBuDTheme
});
