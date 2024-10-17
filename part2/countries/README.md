# Country lookup

## Why do you not have icons?

No icons are shown because that would be wayy too much trouble with the chosen API (I used [Open-Meteo], which does not have icons). But a brief text summary of the local weather is provided via the retrieved WMO code.

The exercise's text was very vague on the requirements, so I just showed what info I thought was most relevant (temp, apparent temp, wind speed, general weather summary).

Also, I did not like the suggested weather API. So I looked for another that required less making-yet-another-account-somewhere.

## Environment config

The weather info from [Open-Meteo] itself does not require an API key, BUT the [geolocation service][API Ninjas] I used to find all the latitude & longitude info of capitals DOES need it.

For security reasons, and because I was very thorough in providing as much coverage for countries as I could, you will need to use your own api key to test this.

Before running `yarn dev` to set up the local server, you need to set up a `VITE_NINJA_API_KEY` environment variable to the value of your API key. You can get one from [here][API Ninjas].

## Why use a geolocation service too?

During this exercise, I encountered some issues:

- Some countries have more than one capital (i.e. [South Africa](https://studies.cs.helsinki.fi/restcountries/api/name/South%20Africa)).
- The [REST Countries API][REST Countries] provide only one capital's gelocation, identified by a field named `capitalInfo`. As such, there is no way to know which capital it refers to when multiple capitals exist.
- Some territories share a capital with a different mainland-country (i.e. [US Minor Outlying Islands](https://studies.cs.helsinki.fi/restcountries/api/name/United%20States%20Minor%20Outlying%20Islands)). These do not have the `capitalInfo` field providing any kind of geolocation, but they do have geolocation info of the territory itself in the field `latlng`.

So what I did was:

- Use the [API Ninjas] geolocation API (which requires an api-key) to search the geolocation of every capital in a selected country. This way I can always properly match geolocation to capital.
- If the search fails, I assume the country has only one capital and fallback to the `capitalInfo` provided by the [REST Countries API][REST Countries].
- If that fails, then I use the `latlng` field. I assume these exceptions are small enough countries that we do not care about its capital and that the provided geolocation for the country itself is accurate enough.

I would have used [Open-Meteo]'s own geolocation service, but it had trouble matching some capitals of small countries like Seychelles.

## Credits

Made with these third-party APIs:

- [Open-Meteo] (weather)
- [API Ninjas] (geolocation)

And the provided REST API to query country information:

- [REST Countries] (country info)

[Open-Meteo]: https://open-meteo.com/
[API Ninjas]: https://api-ninjas.com/
[REST Countries]: https://studies.cs.helsinki.fi/restcountries/

