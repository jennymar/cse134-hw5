const industryContainer = document.getElementById("cards-industry");
const academiaContainer = document.getElementById("cards-academia");
const projectContainer = document.getElementById("cards-project");

document.getElementById("load-local").addEventListener("click", loadLocal);
document.getElementById("load-remote").addEventListener("click", loadRemote);

function renderCards(data) {
    if (industryContainer) {
        industryContainer.innerHTML = "";
    } 
    if (academiaContainer) {
        academiaContainer.innerHTML = "";
    }
    if (projectContainer) {
        projectContainer.innerHTML = "";
    }


    data.forEach(item => {
        const card = document.createElement("project-card");
        console.log("category", item.category);

        card.setAttribute("title", item.title);
        card.setAttribute("role", item.role);
        card.setAttribute("img-small", item.imgSmall);
        card.setAttribute("img-large", item.imgLarge);
        card.setAttribute("alt", item.alt);
        card.setAttribute("link", item.link);
        if (item.linkText) {
            card.setAttribute("link-text", item.linkText);
        }

        item.bullets.forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            card.appendChild(li);
        });

        if (item.category === "industry" && industryContainer) {
            industryContainer.appendChild(card);
        } else if (item.category === "academia" && academiaContainer) {
            academiaContainer.appendChild(card);
        } else if (item.category === "project" && projectContainer) {
            projectContainer.appendChild(card);
        }

    });
}

function loadLocal() {
    const raw = localStorage.getItem("experienceData");

    if (!raw) {
        alert("No local data found in localStorage.\n\nMake sure you ran:\nlocalStorage.setItem('experienceData', JSON.stringify(data));");
        return;
    }

    const data = JSON.parse(raw);
    renderCards(data);
}


async function loadRemote() {
    try {
        const remoteURL = "https://my-json-server.typicode.com/jennymar/cse134-hw5/experience";

        const response = await fetch(remoteURL);
        if (!response.ok) throw new Error("Failed to fetch remote data.");

        const data = await response.json();
        console.log("data", data);
        renderCards(data);

    } catch (error) {
        console.error(error);
        alert("Error loading remote data. Check your URL and try again.");
    }
}
