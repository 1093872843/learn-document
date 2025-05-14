// 用于查询当前浏览器中的标签页。它返回一个标签页数组，包含符合查询条件的所有标签页的信息
const tabs = await chrome.tabs.query({
    url: [
      'https://developer.chrome.com/docs/webstore/*',
      'https://developer.chrome.com/docs/extensions/*'
    ]
  });
  
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById('li_template');
const elements = new Set();
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  const title = tab.title.split('|')[0].trim();
  const pathname = new URL(tab.url).pathname.slice('/docs'.length);

  element.querySelector('.title').textContent = title;
  element.querySelector('.pathname').textContent = pathname;
  element.querySelector('a').addEventListener('click', async () => {
    // 切换窗口中的某个标签页为当前活动窗口的前台标签页
    await chrome.tabs.update(tab.id, { active: true });
    // 切换窗口
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}
document.querySelector('ul').append(...elements);

const button = document.querySelector('button');
button.addEventListener('click', async () => {
  const tabIds = tabs.map(({ id }) => id);
  if (tabIds.length) {
    const group = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(group, { title: 'DOCS' });
  }
});