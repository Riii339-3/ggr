const ggr = () => {
  const hash = location.hash.substring(1);
  const encodedHash = hash.replace(/&/g, "%26").replace(/#/, "%23");
  if (!encodedHash) {
    document.getElementById("tips").style.display = "unset";
    return;
  }
  const urls = {};
  Object.entries({
    "Google": "search?q=",
    "Bing": "search?q=",
    "DuckDuckGo": "?q=",
    "Yahoo": "search?p=",
    "Brave": "search?q=",
    "Ecosia": "search?q=",
  }).forEach(([engine, query]) => {
    urls[engine] = query + encodedHash;
  });
  const search = document.getElementById("search");
  search.innerHTML += decodeURI(hash.replace("+", " ")).replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  search.style.display = "unset";
  Array.from(document.body.querySelectorAll("li > a")).forEach((element) => {
    const href = element.attributes.getNamedItem("href");
    href.value += urls[element.textContent];
  });
};
window.addEventListener("hashchange", () => location.reload());
