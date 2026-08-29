let currentLanguage = "en";


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

function createLinkBoxs(websites, container) {
    const websites_container_title = document.createElement('h2');
    websites_container_title.textContent = currentLanguage == "zh" ? "我制作的网站" : "My Websites";
    container.appendChild(websites_container_title);
    websites.forEach(website => {
        const linkBox = document.createElement('div');
        linkBox.className = 'content-linkbox';
        linkBox.innerHTML = `
            <h3>${website.name}</h3>
            <p>${website.description}</p>
            <p><a href="${website.github}" target="_blank" class="a-use">Github</a> | 
            <a href="${website.url}" target="_blank" class="a-use">` + (currentLanguage == "zh" ? "访问" : "Website") + `</a></p>
        `;
        console.log(linkBox);
        container.appendChild(linkBox);
    });
}

function createContactBoxs(contacts, container) {
    const contact_container_title = document.createElement('h2');
    contact_container_title.textContent = currentLanguage == "zh" ? "联系方式" : "Contact";
    container.appendChild(contact_container_title);
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

        container.appendChild(linkBox);
    });
}

function createElement() {
    const content_websites = document.getElementById('content-websites');
    const content_contact = document.getElementById('content-contact');
    const languageSwitchButton = document.createElement('button');
    languageSwitchButton.id = 'language-switch';
    languageSwitchButton.textContent = currentLanguage == "zh" ? "EN" : "中文";
    languageSwitchButton.addEventListener('click', switchLanguage);
    document.body.insertBefore(languageSwitchButton, document.body.firstChild);
    fetchjson().then(data => {
        createLinkBoxs(data.websites, content_websites);
        createContactBoxs(data.contacts, content_contact);
    })
}

function switchLanguage() {
    currentLanguage = currentLanguage == "zh" ? "en" : "zh";
    const content_websites = document.getElementById('content-websites');
    const content_contact = document.getElementById('content-contact');
    const languageSwitchButton = document.getElementById('language-switch');
    document.body.removeChild(languageSwitchButton);
    content_websites.innerHTML = '';
    content_contact.innerHTML = '';
    createElement();
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