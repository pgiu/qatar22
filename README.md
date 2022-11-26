# Qatar 22 World Cup Results

[![Trigger Credentials Update](https://github.com/pgiu/qatar22/actions/workflows/test.yaml/badge.svg)](https://github.com/pgiu/qatar22/actions/workflows/test.yaml)


Displays Qatar 2022 World Cup results.

Features: 
- Incremental Static Regeneration (ISR) The page will be regenerated at almost every 60s. This helps not to overload the API.
- Image component. Images are cached by Vercel (faster delivery)

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API 

We are using the Free World cup API provided [here](https://github.com/raminmr/free-api-worldcup2022). The credentials 
(FOOTBALL_API_EMAIL, FOOTBALL_API_PASSWORD) are saved in Vercel as an environment variable. We have a cron job that 
runs daily with a GitHub action and uses the login endpoint to update the auth token stored in vercel (API_TOKEN).
See `credential-update-cron.yaml` and `pages/api/cron for more info. 

You should create a new user if you want to test locally.

## Licences

Favicon

- Graphics Title: 26bd.svg
- Graphics Author: Copyright 2020 Twitter, Inc and other contributors (https://github.com/twitter/twemoji)
- Graphics Source: https://github.com/twitter/twemoji/blob/master/assets/svg/26bd.svg
- Graphics License: CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/)


## TODO
- [ ] Simplify the auth token process.
- [ ] Add a message for when the world cup ends
- [ ] Create a page for each day
- [ ] Write a nicer message if there are no matches for this day (will happen later in the tournament)
- [ ] Create a team page (e.g. teams/argentina) with statistics for the team and maybe some fan info too
- [ ] If the API fails to respond, the page will be generated with wrong data. We should prevent this from happening.

## Contributing

Want to help here? That's great! Just create a pull request here.