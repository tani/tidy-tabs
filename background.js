/****************************************************************************************
 * background.js is a part of Tidy Tabs
 *
 * The MIT License (MIT)
 * (c) 2023 TANIGUCHI Masaya
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 *  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 ****************************************************************************************/

/**
 * revlex is a reverse lexicographic comparison of two arrays of strings.
 * @param {Array<string>} components1
 * @param {Array<string>} components2
 * @return {number} -1 if components1 < components2, 0 if components1 == components2, 1 if components1 > components2
 */
function revlex(a, b, cmp) {
  const minLen = Math.min(a.length, b.length);
  const ra = a.slice().reverse();
  const rb = b.slice().reverse();
  for (let i = 0; i < minLen; i++) {
    const c = cmp(ra[i], rb[i]);
    if (c != 0) {
      return c;
    }
  }
  return a.length - b.length;
}

/**
 * strCmp is a string comparison function.
 * @param {string} component1
 * @param {string} component2
 * @return {number} -1 if component1 < component2, 0 if component1 == component2, 1 if component1 > component2
 */
function strCmp(a, b) {
  return a < b ? -1 : a == b ? 0 : 1;
}

/**
 * urlCmp is a URL comparison function.
 * @param {string} url1
 * @param {string} url2
 * @return {number} -1 if url1 < url2, 0 if url1 == url2, 1 if url1 > url2
 */
function urlCmp(url1, url2) {
  const hostname1 = new URL(url1).hostname;
  const hostname2 = new URL(url2).hostname;
  const components1 = hostname1.split(".");
  const components2 = hostname2.split(".");
  return revlex(components1, components2, strCmp);
}

// Sort tabs when a tab is updated.
browser.tabs.onUpdated.addListener(async () => {
  await new Promise((resolve) => setTimeout(resolve, 30));
  await browser.tabs.query({ currentWindow: true }, async (tabs) => {
    const sortedTabs = tabs.toSorted((a, b) => urlCmp(a.url, b.url));
    for (let i = 0; i < sortedTabs.length; i++) {
      await browser.tabs.move(sortedTabs[i].id, { index: i });
    }
  });
});
