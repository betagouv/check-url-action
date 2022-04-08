# stats-action

"Github action that checks the presence of a specific page on url and report results as JSON.

## Usage

```yaml
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: "beta.gouv/check-url-action@main"
        with:
          url: https://beta.gouv.fr/stats
          output: 'stats.json'
```

You can choose output file name and the URL you want to check.

See [action.yml](action.yml) for details and default inputs.

## Hacking

To test locally, install [act](https://github.com/nektos/act).

```shell
npm run all
act
```
