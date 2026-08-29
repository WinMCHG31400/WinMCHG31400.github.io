let currentLanguage = "en";
const intro_container = document.getElementById('content-intro');
const contact_container = document.getElementById('content-contact');
const websites_container = document.getElementById('content-websites');
let intros = [];

async function fetchjson() {
    language = currentLanguage == "zh" ? "_zh" : "";
    try {
        const response = await fetch(`./datas/main${language}.json`);
        const data = await response.json();
        console.log(`./datas/main${language}.json`);
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error;
    }
}

function createIntro(intro) {
    intros = intro;
    const intro_paragraph = document.createElement('div');
    intro_paragraph.id = "content-intro-div";
    intro_paragraph.className = "content-intro-div";
    intro_paragraph.innerHTML = intro[0];
    intro_container.insertBefore(intro_paragraph, intro_container.firstChild);
}

function createLinkBoxs(websites) {
    const websites_container_title = document.createElement('h2');
    websites_container_title.textContent = currentLanguage == "zh" ? "我制作的网站" : "My Websites";
    websites_container.appendChild(websites_container_title);
    websites.forEach(website => {
        const linkBox = document.createElement('div');
        linkBox.className = 'content-linkbox';
        linkBox.innerHTML = `
            <h3>${website.name}</h3>
            <p>${website.description}</p>
            <p><a href="${website.github}" target="_blank" class="a-use">Github</a> | 
            <a href="${website.url}" target="_blank" class="a-use">` + (currentLanguage == "zh" ? "访问" : "Website") + `</a></p>
        `;
        websites_container.appendChild(linkBox);
    });
}

function createContactBoxs(contacts) {
    const contact_container_title = document.createElement('h2');
    contact_container_title.textContent = currentLanguage == "zh" ? "联系方式" : "Contact";
    contact_container.appendChild(contact_container_title);
    contacts.forEach(contactItem => {
        const linkBox = document.createElement('div');
        linkBox.className = 'content-linkbox';
        linkBox.innerHTML = `
            <h3>${contactItem.name}</h3>
            <p>${contactItem.description || (currentLanguage == "zh" ? "无描述" : "No description")}</p>
        `;
        if (contactItem.urls.length > 1) {
            const links_p = document.createElement('p');
            contactItem.urls.forEach((link, index) => {
                if (index > 0) {
                    links_p.appendChild(document.createTextNode(" | "));
                }
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.target = "_blank";
                linkElement.className = "a-use";
                linkElement.textContent = link.name;
                links_p.appendChild(linkElement);
            });
            linkBox.appendChild(links_p);
        }
        else {
            const linkElement = document.createElement('a');
            linkElement.href = contactItem.urls[0].url;
            linkElement.target = "_blank";
            linkElement.className = "a-use";
            linkElement.textContent = contactItem.urls[0].name;
            linkBox.appendChild(linkElement);
        }

        contact_container.appendChild(linkBox);
    });
}

function createElement() {
    const content_title = document.getElementById('content-title');
    const content_intro = document.getElementById('content-intro-1');
    content_title.textContent = currentLanguage == "zh" ? "WinMCHG31400的网站" : "Welcome to WinMCHG31400's Website";
    content_intro.textContent = currentLanguage == "zh" ? "" : "This is a personal website for WinMCHG31400.";
    const languageSwitchButton = document.getElementById('language-switch');
    const expandButton = document.getElementById('expandButton');
    expandButton.textContent = currentLanguage == "zh" ? "展开" : "Expand";
    expandButton.title = currentLanguage == "zh" ? "展开" : "Expand";
    languageSwitchButton.textContent = currentLanguage == "zh" ? "EN" : "中文";
    fetchjson().then(data => {
        createIntro(data.intro, content_intro);
        createLinkBoxs(data.websites);
        createContactBoxs(data.contacts);
    })
}

function switchLanguage() {
    currentLanguage = currentLanguage == "zh" ? "en" : "zh";
    const content_websites = document.getElementById('content-websites');
    const content_contact = document.getElementById('content-contact');
    const content_intro_div = document.getElementById('content-intro-div');
    content_websites.innerHTML = '';
    content_contact.innerHTML = '';
    content_intro_div.innerHTML = '';
    createElement();
}

function expandContent() {
    const contentIntro = document.querySelector('.content-intro');
    const expandButton = document.getElementById('expandButton');
    const contentIntroBox = document.getElementById('content-intro-div');
    if(expandButton.title == (currentLanguage == "zh" ? "收起" : "Collapse")) {
        contentIntroBox.innerHTML = intros[0];
        expandButton.textContent = currentLanguage == "zh" ? "展开" : "Expand";
        expandButton.title = currentLanguage == "zh" ? "展开" : "Expand";
        return;
    }
    intros.forEach((intro, index) => {
        if (index > 0) {
            contentIntroBox.innerHTML+= '<br>' + intro;
        }
    })
    expandButton.textContent = currentLanguage == "zh" ? "收起" : "Collapse";
    expandButton.title = currentLanguage == "zh" ? "收起" : "Collapse";
}

window.addEventListener('DOMContentLoaded', function () {
    console.log(navigator.languages);
    if (navigator.languages[0] == "zh-CN" || navigator.languages[0] == "zh" || navigator.languages[0] == "zh-Hans" || navigator.languages[0] == "zh-Hant") {
        currentLanguage = "zh"
    }
    else {
        currentLanguage = "en"
    }
    createElement();
})