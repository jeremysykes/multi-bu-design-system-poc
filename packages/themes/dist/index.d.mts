import { Theme } from '@mui/material/styles';

declare function getBuATheme(): Promise<Theme>;
declare const buAThemeSync: Theme | null;

declare function getBuBTheme(): Promise<Theme>;
declare const buBThemeSync: Theme | null;

declare function getBuCTheme(): Promise<Theme>;
declare const buCThemeSync: Theme | null;

declare function getBuDTheme(): Promise<Theme>;
declare const buDThemeSync: Theme | null;

export { buAThemeSync, buBThemeSync, buCThemeSync, buDThemeSync, getBuATheme, getBuBTheme, getBuCTheme, getBuDTheme };
