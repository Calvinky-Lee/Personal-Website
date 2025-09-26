# Public Assets

This folder contains static assets that are served directly by the web server.

## Structure

- `images/` - Image files (PNG, JPG, SVG, etc.)
- `assets/` - Other static assets (fonts, icons, etc.)

## Usage

Files in this folder can be referenced directly from your HTML/CSS/JS:

```html
<img src="/images/photo.jpg" alt="Description" />
```

```css
background-image: url('/images/background.png');
```

```javascript
const imageUrl = '/images/logo.svg';
```

## Notes

- Files in the `public` folder are copied to the build output as-is
- Use relative paths starting with `/` to reference these files
- Keep file sizes optimized for web performance
