import fs from 'fs';
import path from 'path';

const niche = process.argv[2] || 'hotel';
const validNiches = ['hotel', 'saas', 'ecommerce'];

if (!validNiches.includes(niche)) {
    console.error(`Invalid niche: ${niche}. Must be one of: ${validNiches.join(', ')}`);
    process.exit(1);
}

// 1. Update site.ts
const sitePath = path.join(process.cwd(), 'src/config/site.ts');
let siteContent = fs.readFileSync(sitePath, 'utf8');

// Regex to replace export const ACTIVE_NICHE: NicheType = "...";
const nicheRegex = /export const ACTIVE_NICHE: NicheType = ".*?";/;
if (nicheRegex.test(siteContent)) {
    siteContent = siteContent.replace(nicheRegex, `export const ACTIVE_NICHE: NicheType = "${niche}";`);
    fs.writeFileSync(sitePath, siteContent);
    console.log(`✅ [Niche Switcher] set site.ts to -> ${niche}`);
} else {
    console.error(`❌ [Niche Switcher] could not find ACTIVE_NICHE in site.ts`);
}

// 2. Update globals.css primary color
const cssPath = path.join(process.cwd(), 'src/app/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const colors = {
    hotel: '#EAC54F',      // Gold
    saas: '#6366F1',       // Indigo
    ecommerce: '#10B981'   // Emerald
};

const newColor = colors[niche];
const colorRegex = /--primary:\s*#[a-zA-Z0-9]{6};/;

if (colorRegex.test(cssContent)) {
    cssContent = cssContent.replace(colorRegex, `--primary: ${newColor};`);
    fs.writeFileSync(cssPath, cssContent);
    console.log(`✅ [Niche Switcher] set CSS --primary to -> ${newColor}`);
} else {
    console.warn(`⚠️ [Niche Switcher] could not find --primary inside globals.css`);
}

console.log(`🚀 Successfully configured Boilerplate for: ${niche.toUpperCase()}`);
