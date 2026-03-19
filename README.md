# Queerolina TV 📡

**queer culture like you've never seen it before**

---

## Deploy to Vercel (step by step)

### 1. Set up GitHub (if you don't have an account)
- Go to github.com → sign up free
- Create a new repository called `queerolina-tv`
- Make it **private** if you want

### 2. Upload these files to GitHub
Upload the entire folder structure:
```
queerolina-tv/
  package.json
  public/
    index.html
  src/
    index.js
    App.js
```
You can drag and drop the files directly in the GitHub web interface.

### 3. Deploy on Vercel
- Go to vercel.com → sign up free with your GitHub account
- Click **"Add New Project"**
- Select your `queerolina-tv` repository
- Vercel will auto-detect it as a React app
- Click **Deploy** — you'll have a live URL in ~60 seconds 🎉

### 4. Connect your domain (tv.queerolina.com)
- In Vercel → your project → **Settings → Domains**
- Add: `tv.queerolina.com`
- In your domain registrar, add a CNAME record:
  - Name: `tv`
  - Value: `cname.vercel-dns.com`
- Wait 10-30 min for DNS to propagate

---

## Customizing the app

### Update your social links
In `src/App.js`, find the Footer section and update:
```js
{ label: "INSTAGRAM", url: "https://instagram.com/YOUR_HANDLE" },
{ label: "TIKTOK", url: "https://tiktok.com/@YOUR_HANDLE" },
{ label: "PATREON", url: "https://patreon.com/YOUR_PAGE" },
```

### Update show cards
Find the `SHOWS` array in `src/App.js` and edit title, description, and accent color for each show.

### Hook up real subscriptions
Replace the subscribe modal form with your actual Squarespace member area link or a payment provider like Stripe.

### Update pricing
Find `$8/mo` and `$72/yr` in the SubscribeModal and change to your real prices.

---

Built with React · Hosted on Vercel · Made by Queerolina LLP, Durham NC
