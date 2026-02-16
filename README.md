# Pull Over SmartPOS - Deploy Instructions

These steps deploy the static app in this repository to GitHub Pages.

Recommended: create a GitHub repository and push this workspace. The included GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy the repository root to the `gh-pages` branch whenever you push to `main`.

Quick steps (PowerShell):

1. Initialize git (if not already) and push to GitHub (replace `<your-repo-url>`):

```powershell
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. After you push to `main`, GitHub Actions will run the deploy workflow and publish the site to the `gh-pages` branch. Open your repository Settings → Pages to confirm the site URL (it may appear under `gh-pages` branch).

Manual one-shot deploy (no Action): push `gh-pages` branch with subtree (optional):

```powershell
# Push repository root to gh-pages branch
git add -A
git commit -m "deploy"
git push origin `git subtree split --prefix . main`:gh-pages --force
```

Notes:
- The workflow uses the built-in `GITHUB_TOKEN`, so you don't need to create extra secrets.
- If you prefer Netlify/Vercel, connect your GitHub repo there and set the publish directory to the repository root.

If you want, I can:
- Attempt to create a local git repo and run the push commands here (I will need your repository URL and permission to run git commands), or
- Show exact commands to run locally and what to expect in the Actions logs.
