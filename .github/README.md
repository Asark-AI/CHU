# Coastal Heritage University — Course Site

This repository contains a static course site for "Introduction to Information Systems" (CHU). The site is pure HTML/CSS/JS and can be hosted on GitHub Pages.

How to publish on GitHub Pages (recommended flow)

1. Create a GitHub repository and push this project to the `main` branch.
2. The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy the repository contents to GitHub Pages when you push to `main`.

Manual setup (alternative)

- Create a new GitHub repository.
- Commit all files and push to `main`.
- In the repository Settings → Pages, set the source to `gh-pages` or the `main` branch (root) depending on your preference. If you use the workflow, it will create/update `gh-pages` automatically.

Local preview

Start a local server from the project root and open `http://localhost:8000`:

```powershell
cd 'C:\Users\Hp\OneDrive\Desktop\UPSA'
python -m http.server 8000
```

Notes

- `.nojekyll` is included so files in directories such as `css/` and `js/` are served without Jekyll processing.
- If you want a custom domain, add a `CNAME` file with your domain and configure DNS.

If you want, I can also (a) remove duplicate `styles.css` (upper-case `CSS/` copy), (b) optimize `assets/logo.png` into `logo.webp`, or (c) create a minimal `CNAME` if you tell me the domain.
