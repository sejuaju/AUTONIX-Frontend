# AUTONIX Responsive Styles Structure

## Overview
Struktur responsive CSS yang terorganisir untuk website AUTONIX, dengan pemisahan media queries berdasarkan ukuran layar ke dalam file-file terpisah.

## Struktur File

```
responsive/
├── index.css              # File utama yang mengimpor semua breakpoint
├── extra-small.css        # < 360px (Ultra small devices)
├── mobile.css             # 360px - 575px (Mobile devices)
├── tablet.css             # 576px - 991px (Tablet devices)
├── desktop.css            # 992px - 1199px (Desktop devices)
├── large-desktop.css      # 1200px+ (Large desktop devices)
└── README.md              # Dokumentasi ini
```

## Breakpoint Details

### Extra Small Devices (< 360px)
- **File**: `extra-small.css`
- **Target**: Ponsel dengan layar sangat kecil
- **Features**: Layout minimal, font kecil, navigasi mobile

### Mobile Devices (360px - 575px)
- **File**: `mobile.css`
- **Target**: Smartphone standar
- **Features**: Layout single column, navigasi hamburger, optimasi touch

### Tablet Devices (576px - 991px)
- **File**: `tablet.css`
- **Target**: Tablet dan smartphone landscape
- **Features**: Layout 2 kolom, navigasi horizontal, font sedang

### Desktop Devices (992px - 1199px)
- **File**: `desktop.css`
- **Target**: Desktop dan laptop standar
- **Features**: Layout multi-kolom, hover effects, navigasi penuh

### Large Desktop Devices (1200px+)
- **File**: `large-desktop.css`
- **Target**: Monitor besar dan ultra-wide
- **Features**: Layout maksimal, animasi advanced, spacing optimal

## Cara Penggunaan

### 1. Import di Layout.astro
```astro
---
import '../styles/responsive/index.css';
---
```

### 2. Import Individual Files (Opsional)
```css
@import './responsive/mobile.css';
@import './responsive/tablet.css';
/* dst... */
```

### 3. Menggunakan Utility Classes
```html
<!-- Hide/Show berdasarkan breakpoint -->
<div class="hide-mobile show-tablet">Hanya tampil di tablet+</div>
<div class="show-mobile hide-tablet">Hanya tampil di mobile</div>

<!-- Responsive text -->
<h1 class="title-responsive">Judul Responsif</h1>
<p class="text-responsive">Teks Responsif</p>

<!-- Responsive grid -->
<div class="grid-responsive">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## CSS Variables yang Disarankan

Untuk konsistensi, gunakan CSS variables berikut di file `global.css`:

```css
:root {
  /* Breakpoints */
  --breakpoint-xs: 360px;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;

  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Font sizes */
  --font-xs: 0.75rem;
  --font-sm: 0.875rem;
  --font-base: 1rem;
  --font-lg: 1.125rem;
  --font-xl: 1.25rem;
  --font-2xl: 1.5rem;
  --font-3xl: 2rem;
}
```

## Best Practices

1. **Mobile First**: Mulai dengan styling mobile, kemudian tambahkan untuk layar lebih besar
2. **Progressive Enhancement**: Tambahkan fitur advanced untuk layar besar
3. **Performance**: Import hanya file yang diperlukan
4. **Consistency**: Gunakan spacing dan font size yang konsisten
5. **Testing**: Test di berbagai device dan ukuran layar

## Maintenance

- **Update Breakpoints**: Edit di file individual sesuai kebutuhan
- **Add New Breakpoints**: Buat file baru dan tambahkan import di `index.css`
- **Remove Unused Styles**: Hapus CSS yang tidak digunakan untuk optimasi

## Notes

- Semua file menggunakan `max-width` dan `min-width` untuk precision
- Hover effects hanya diterapkan pada desktop+ untuk performa
- Utility classes tersedia untuk semua breakpoint
- Grid system otomatis menyesuaikan kolom berdasarkan layar
