const browser = globalThis.browser || globalThis.chrome;
async function close(favIconUrl) {
  await browser.tabs.query({ currentWindow: true }, async (tabs) => {
    const tabIds = tabs.filter((tab) => tab.favIconUrl === favIconUrl).map(
      (tab) => tab.id,
    );
    await browser.tabs.remove(tabIds);
  });
}

async function render() {
  await browser.tabs.query({ currentWindow: true }, (tabs) => {
    const icons = document.querySelector("#icons");
    icons.innerHTML = "";
    const visited = [];
    tabs.forEach((tab) => {
      const a = document.createElement("a");
      const icon = document.createElement("img");
      if (visited.includes(tab.favIconUrl)) {
        return;
      }
      visited.push(tab.favIconUrl);
      icon.src = tab.favIconUrl;
      icon.title = tab.title;
      icon.className = "favicon";
      icon.addEventListener("click", async () => {
        await close(tab.favIconUrl);
        await new Promise((_) => setTimeout(_, 100));
        await render();
        setTimeout(render, 100);
        return false;
      });
      a.appendChild(icon);
      icons.appendChild(a);
    });
  });
}
window.addEventListener("DOMContentLoaded", () => {
  render();
});
