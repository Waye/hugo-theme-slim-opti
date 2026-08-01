# Hugo Theme Slim Opti

A personal, opinionated Hugo blog theme based on
[hugo-blog-awesome](https://github.com/hugo-sid/hugo-blog-awesome).

This fork keeps the clean and responsive foundation of the original theme while
adding new layouts and features for photography, travel notes, article series,
and long-form personal writing.

**Live demo:** [weiyi-hu.com](https://weiyi-hu.com/)

## What Changed

Compared with the original theme, Slim Opti adds:

- A redesigned editorial-style homepage
- Rotating homepage photo gallery
- Homepage post search and recent-post sections
- Interactive post timeline
- Travel maps with locations, routes, and map/satellite views
- Per-post location maps
- Data-driven photography gallery
- Article table of contents with scroll tracking
- Ordered navigation for multi-part article series
- Optional donation and support section
- Additional visual themes, motion, and responsive styling
- Chinese, English, Japanese, and other localization support

## Requirements

- Hugo Extended
- Tested with Hugo `v0.148.2+extended`

## Installation

Create a Hugo site if you do not already have one:

```bash
hugo new site myblog
cd myblog
git init
```

Add the theme as a Git submodule:

```bash
git submodule add https://github.com/Waye/hugo-theme-slim-opti.git themes/hugo-theme-slim-opti
```

Add the following to `config.toml`:

```toml
theme = "hugo-theme-slim-opti"

[params]
mainSections = ["posts"]
goToTop = true
```

Start the development server:

```bash
hugo server
```

Open [http://localhost:1313/](http://localhost:1313/).

## Article Series

Add the same `series` value to related posts and use `weight` to control their
order:

```yaml
---
title: "Part One"
series:
  - "My Series"
weight: 1
---
```

When a series contains more than one post, navigation is displayed below the
article.

## Updating

If installed as a Git submodule:

```bash
git submodule update --remote --merge
```

## Attribution

Slim Opti is based on
[hugo-blog-awesome](https://github.com/hugo-sid/hugo-blog-awesome) by Sidharth R.

The original project history and contributor attribution are preserved.

## License

Released under the [MIT License](LICENSE).
