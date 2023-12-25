# Tidy Tabs

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

Available for Firefox here: https://addons.mozilla.org/firefox/addon/tidy_tabs/

# License

Tidy Tabs is licensed under the MIT license.

# Copyright

This project is created by TANIGUCHI Masaya.
