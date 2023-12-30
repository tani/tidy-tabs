# Tidy Tabs

[![](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chromewebstore.google.com/detail/tidy-tabs/geilkiigpbckhddbddokhnmdfpkcdgno)
[![](https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png)](https://addons.mozilla.org/firefox/addon/tidy_tabs/)

Tidy Tabs is a browser extension that keeps your tabs tidy. It allows you to
automatically sort tabs based on their domain as follows:

- It compares components (top-level domain, second-level domain, etc.)
  lexicographically. (e.g. com is smaller than org, example1 is smaller than
  example2)
- It compares hostnames reverse lexicographically. (e.g. example1.com is smaller
  than example2.org because com is smaller than org)
- If one hostname contains another, the shorter one is smaller. (e.g.
  example2.org is smaller than www.example2.org because example2.org is shorter
  than www.example2.org)

# Availability

- Firefox: https://addons.mozilla.org/firefox/addon/tidy_tabs/
- Chrome: https://chromewebstore.google.com/detail/tidy-tabs/geilkiigpbckhddbddokhnmdfpkcdgno

# License

Tidy Tabs is licensed under the MIT license.

# Copyright

This project is created by TANIGUCHI Masaya.
