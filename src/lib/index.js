// place files you want to import through the `$lib` alias in this folder.
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }
        : null;
}

// Calculate relative luminance
function getLuminance(r, g, b) {
    let [rs, gs, bs] = [r / 255, g / 255, b / 255].map((val) => {
        if (val <= 0.03928) {
            return val / 12.92;
        }
        return Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Get contrasting text color (black or white)
export function getContrastColor(hexColor) {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return 'oklch(0.208 0.042 265.755)';

    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
    return luminance > 0.5 ? 'oklch(0.208 0.042 265.755)' : '#FFFFFF';
}

// OKLCH -> OKLab -> Linear sRGB -> sRGB (with gamma correction)
function oklchToRgb(l, c, h) {
    // Step 1: Convert OKLCH to OKLab
    // h should be in radians for calculations
    const hRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);

    // Step 2: Convert OKLab to Linear sRGB
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.291485548 * b;

    const l_cube = l_ * l_ * l_;
    const m_cube = m_ * m_ * m_;
    const s_cube = s_ * s_ * s_;

    const r = 4.0767416621 * l_cube - 3.3077115913 * m_cube + 0.2309699292 * s_cube;
    const g = -1.2684380046 * l_cube + 2.6097574011 * m_cube - 0.3413193965 * s_cube;
    const bl = -0.0041960863 * l_cube - 0.7034186147 * m_cube + 1.707614701 * s_cube;

    // Step 3: Apply gamma correction and convert to 0-255 range
    function toSRGB(x) {
        if (x <= 0) return 0;
        if (x >= 1) return 255;
        return Math.round(255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055));
    }

    return {
        r: toSRGB(r),
        g: toSRGB(g),
        b: toSRGB(bl)
    };
}

// Convert RGB values to hex string
function rgbToHex({ r, g, b }) {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}

// Combined function to go from OKLCH to hex
function oklchToHex(l, c, h) {
    return rgbToHex(oklchToRgb(l, c, h));
}

export function tailwindColor(name) {
    if (name == 'white') {
        return "#ffffff"
    }
    if (name == 'black') {
        return "#000000"
    }
    const variableName = `--color-${name}`;
    const color = getComputedStyle(document.documentElement).getPropertyValue(variableName);
    const { lightness: l, chroma: c, hue: h } = parseOKLCH(color);
    return oklchToHex(l, c, h);
}

function parseOKLCH(oklchString) {
    // Remove 'oklch(' and ')' and any whitespace
    const cleaned = oklchString.replace(/oklch\(|\)/g, '').trim();

    // Split the string by spaces or commas
    const values = cleaned.split(/[\s,]+/);

    // Extract the numeric values and remove any '%' or 'deg' units
    const lightness = parseFloat(values[0].replace('%', ''));
    const chroma = parseFloat(values[1]);
    const hue = parseFloat(values[2].replace('deg', ''));

    return {
        lightness, // Range: 0 to 1
        chroma, // Range: 0 to 0.4
        hue // Range: 0 to 360
    };
}