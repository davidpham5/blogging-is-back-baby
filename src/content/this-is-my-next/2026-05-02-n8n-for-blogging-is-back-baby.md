---
title: n8n for blogging is back, baby
date: 2026-05-02
tags:
---
I want to set up a n8n self hosting instance on my server and run a marketing funnel for this site. I want to present a pop up like substack to subscribe to a newsletter and build an audience. And at the end, turn some readers to paid members.

## Part 1: Self-Host n8n on DigitalOcean

### 1.1 Create a Droplet

- Log into DigitalOcean → Create → Droplets
- **Image:** Ubuntu 24.04 LTS
- **Plan:** Basic, $6/mo (1 GB RAM, 25 GB SSD) — sufficient for n8n
- **Region:** NYC1 or closest to you (East Coast)
- **Authentication:** SSH key (recommended) or password
- **Hostname:** `n8n-server`

### 1.2 Install Docker + n8n

SSH into your droplet:

```bash
ssh root@YOUR_DROPLET_IP
```

Install Docker:

```bash
apt update && apt upgrade -y
apt install -y docker.io docker-compose
systemctl enable docker
```

Create n8n directory and docker-compose file:

```bash
mkdir -p /opt/n8n && cd /opt/n8n
```

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=n8n.davidchicopham.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n.davidchicopham.com/
      - GENERIC_TIMEZONE=America/New_York
      - TZ=America/New_York
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

Start n8n:

```bash
docker-compose up -d
```

### 1.3 Set Up Domain + SSL

Point a DNS A record for `n8n.davidchicopham.com` → your droplet IP.

Install Caddy as a reverse proxy (handles SSL automatically):

```bash
apt install -y caddy
```

Edit `/etc/caddy/Caddyfile`:

```
n8n.davidchicopham.com {
    reverse_proxy localhost:5678
}
```

Restart Caddy:

```bash
systemctl restart caddy
```

Wait a few minutes for SSL provisioning. Visit `https://n8n.davidchicopham.com` — you should see the n8n login screen.

### 1.4 Verify

- Log in with the basic auth credentials you set
- Create a test workflow with a Webhook trigger node
- Copy the webhook URL — you'll need it in Part 3

What is n8n? It's like Zapier or Make, a canvas drag and drop flow chart that can build triggers, actions, and output stuff. It's source can be self hosted or through paid cloud account.

[Master 80% of n8n in 36 Minutes - YouTube](https://www.youtube.com/watch?v=e3OV3LnrS7o)

There is a number of actions a trigger could attach to. Actions are apps like dropbox, google sheets, or airtable. It occurred to me that a level of automation could happen in organizing. For example, when we were recruiting for elected officials or stewards, we used a conversion logger that fed into a google sheet. 

If that conversation was an assessment, e.g. how interested are you in becoming a steward, a scale from 1 to 5, 1 being LFG to 5 being don't ask me ever again -- a friend said politely to me that he was not interested in further involvement with the union and didn't want to be asked again -- that's a 5, then based on that assessment, follow up automated email is sent a couple days later with an ask for a 1 on 1. 

Or how about an outreach plan triggers a text/phone bank.

I can imagine also a directional change could be tracked like when voters switch from republican to democrat, visualized with arrows on a map of congressional districts, but for assessment conversations.

Another example in n8n development and organizing is something like a virtual organizer. Imagine the system prompt had the role of someone like Jane McAlevey (rest in power) and you can ask how did a conversation go and what are next steps to organizing a person. Instead of a AI personal assistant, how about a personal co-organizer?

Structural tests can be signals to who is engaged. It reminds me of the like button by Facebook that sent a signal to the platform, or even the skip button on youtube is a signal. What about structural tests such as an emoji response?

## Asking Claude to develop a plan for the n8n newsletter & plausible.io integration. 

*I want to set up a n8n self hosting instance on my server and run a marketing funnel for this site. I want to present a pop up like substack to subscribe to a newsletter and build an audience. And at the end, turn some readers to paid members.*

[plugin, superpowers](https://github.com/obra/superpowers) used to plan newsletter component. 

To achieve substack fade to popup as a user scrolls down content, [Intersection Observer API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) will observe an element threshold to which the popup will come into view. Once that threshold is hit, the observer will disconnect. Notably, intersection observer solves for implementing infinite scroll.

---
Current song on the iPod: Thnks fr th mmris by Fallout Boy

---

Where does this stack hook into plausible.io? Maybe via n8n

How to handle errors:
## Error Handling

| Failure                                                           | What user sees                                                                       | What system does                                                             |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Honeypot tripped                                                  | "Thanks — check your inbox" (lie)                                                    | Edge fn returns 200, no Buttondown call, no n8n call                         |
| Submit <2s after popup shown                                      | Same as above                                                                        | Same — silent rejection                                                      |
| Invalid email format                                              | Inline form error: "Enter a valid email"                                             | Edge fn returns 400, no downstream calls                                     |
| Buttondown 5xx / network error                                    | "Something went wrong, try again in a moment"                                        | Edge fn returns 502; no localStorage write; user can retry                   |
| Buttondown "already subscribed" (400 with `email_already_exists`) | "Thanks for being a subscriber"                                                      | Edge fn returns `{ ok: true, already: true }`; localStorage marks subscribed |
| n8n down (submit path)                                            | Success (Buttondown succeeded)                                                       | `Promise.allSettled` — n8n failure logged, doesn't affect user response      |
| n8n down (event-only path)                                        | Nothing                                                                              | sendBeacon fires fire-and-forget; events lost — acceptable                   |
| User has JS disabled                                              | Popup never shows; inline form is inert HTML with `<noscript>` link to `/newsletter` | No subscribe path; acceptable degradation                                    |
| localStorage blocked (private mode)                               | Popup may show repeatedly across sessions                                            | Acceptable — small audience, graceful degradation                            |
| Edge function down                                                | Submit fails with network error; user sees retry message                             | No silent data loss                                                          |