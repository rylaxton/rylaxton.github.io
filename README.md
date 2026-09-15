# Engineering portfolio website

A plain HTML/CSS site. No frameworks, no build step, no npm. You edit the files and upload them.

```
index.html          Home page: intro, about, project grid, skills, resume, contact
styles.css          All styling for the whole site
script.js           Only script on the site: the project category filter
resume.pdf          Add your own file with this exact name
images/             Project photos, CAD screenshots, schematics, plots
projects/           One page per project (project-01.html ... project-10.html)
projects/_template.html   Copy this when you add project 11
```

Every spot that needs your information is written inside square brackets, like
`[Your Name]` or `[Add test result here]`. To find them all, open a file and search for `[`.

---

## 1. Create the GitHub repository

1. Sign in at [github.com](https://github.com) (create a free account if you don't have one).
2. Click the **+** in the top right, then **New repository**.
3. Name it:
   - **`your-username.github.io`** (using your real username) if you want the site at
     `https://your-username.github.io` — this is the cleaner option for a personal portfolio, or
   - anything else, like `portfolio`, if you'd rather have `https://your-username.github.io/portfolio`.
4. Set it to **Public**. GitHub Pages is free on public repositories.
5. Leave the checkboxes alone and click **Create repository**.

## 2. Upload the files

Before uploading, do these two things locally:

- Put your resume in the main folder and name it exactly `resume.pdf`.
- Put your project photos in `images/`. Lowercase names with dashes and no spaces work best,
  for example `gearbox-housing-cad.jpg`.

Then, on the repository page:

1. Click **uploading an existing file** (or **Add file → Upload files**).
2. Drag in `index.html`, `styles.css`, `script.js`, `README.md`, `resume.pdf`, and the
   `images` and `projects` **folders**. Dragging folders keeps the structure, which matters —
   the project pages look for `../styles.css` and `../images/`.
3. Type a short message like `Add portfolio site` and click **Commit changes**.

## 3. Turn on GitHub Pages

1. In the repository, go to **Settings** (top bar) → **Pages** (left sidebar).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
4. Wait one to two minutes. Refresh the page and the live URL appears at the top.

## 4. Preview the website

- **Live:** open the URL from the Pages settings screen. First publish can take a few minutes;
  after later edits, changes usually appear within a minute. A hard refresh
  (Ctrl+Shift+R, or Cmd+Shift+R on Mac) clears a stale cached copy.
- **On your computer, before uploading:** double-click `index.html` and it opens in your browser.
  Everything works locally except that the page needs internet access to load the two web fonts.

## 5. Update projects later

**Edit text.** On GitHub, click the file (for example `projects/project-03.html`), click the
pencil icon, change the text between the tags, then **Commit changes**. Only touch the words —
leave the `<tags>` in place.

**Add an image.** Upload it to `images/`, then point a figure at it:

```html
<img src="../images/your-file.jpg" alt="Short description of the image">
```

On `index.html` the path has no `../`, so it's `images/your-file.jpg`. Always fill in `alt` with a
short description — it shows if the image fails to load and screen readers read it aloud.

**Change a project's categories.** Two places must agree:

1. In `index.html`, the card's `data-groups` attribute controls filtering. Use any combination of
   `mechanical`, `electrical`, and `other`.
2. The `<li class="tag">` items are the visible labels, like `Mechanical Design` or
   `Test Engineering`. A project can have several.

**Add an 11th project.** Copy `projects/_template.html` to `projects/project-11.html`, fill it in,
then copy an existing `<li class="card">` block in `index.html` and update its title, summary,
link, tags, and `data-groups`.

**Delete a project.** Remove its `<li class="card">` block from `index.html` and delete the file
in `projects/`. Also fix the Previous/Next links at the bottom of the neighbouring project pages.

**Change colors or fonts.** Everything visual comes from the `:root` block at the top of
`styles.css`. Change `--accent` to change the one accent color site-wide.

## 6. Connect a domain you own through Squarespace

Do the GitHub side first, then the DNS side.

**On GitHub:** Settings → Pages → **Custom domain** → type your domain (for example
`www.yourdomain.com`) → **Save**. This adds a small `CNAME` file to the repository. That's expected.

**In Squarespace:** open your Squarespace account → **Domains** → click the domain →
**DNS** / **DNS settings**. The exact menu wording changes from time to time, but you're looking
for the panel where you add custom records. Delete or park any existing records that point the
domain at a Squarespace site, then add:

For `www.yourdomain.com`:

| Type  | Host  | Value                     |
|-------|-------|---------------------------|
| CNAME | `www` | `your-username.github.io` |

For the bare domain `yourdomain.com`, add four A records, all with host `@`:

| Type | Host | Value             |
|------|------|-------------------|
| A    | `@`  | `185.199.108.153` |
| A    | `@`  | `185.199.109.153` |
| A    | `@`  | `185.199.110.153` |
| A    | `@`  | `185.199.111.153` |

Optionally add the IPv6 equivalents as AAAA records on host `@`: `2606:50c0:8000::153`,
`2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Set up both the `www` and bare-domain records — GitHub then redirects one to the other
automatically, so visitors reach the site either way.

**Then go back to GitHub:** Settings → Pages, wait for the DNS check to pass, and tick
**Enforce HTTPS**. The certificate can take up to an hour to issue; DNS changes can take up to
24 hours to propagate, though it's usually much faster. If the DNS check keeps failing, the
usual cause is an old Squarespace record still sitting in the list.

GitHub's own reference, if you want to compare screens:
<https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>

---

## Getting help from AI later

When you want a change, paste in the file you want changed and say what you want. For example:

> Here is my `projects/project-04.html`. I ran a new test: the fixture held 1,450 lbf with a
> 0.010 in deflection at the load point. Rewrite the Results section to include this and delete
> the placeholder bullets.

Working one file at a time keeps the rest of the site from breaking.
