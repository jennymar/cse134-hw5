function loadLocalData() {
  const raw = localStorage.getItem("experienceData");
  return raw ? JSON.parse(raw) : [];
}

function saveLocalData(data) {
  localStorage.setItem("experienceData", JSON.stringify(data));
}

function populateDeleteDropdown() {
    const select = document.getElementById("delete-select");
    const data = loadLocalData();

    select.innerHTML = ""; 

    data.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.title;
        select.appendChild(option);
    });
}

function populateUpdateDropdown() {
  const select = document.getElementById("update-select");
  const data = loadLocalData();

  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "-- Select an experience --";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  data.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = item.title;
    select.appendChild(option);
  });

  console.log("select", select);
}


document.getElementById("add-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const category = document.getElementById("category").value;
  const title = document.getElementById("title").value.trim();
  const role = document.getElementById("role").value.trim();
  const imgSmall = document.getElementById("imgSmall").value.trim();
  const imgLarge = document.getElementById("imgLarge").value.trim();
  const alt = document.getElementById("alt").value.trim();
  const link = document.getElementById("link").value.trim();
  const linkText = document.getElementById("linkText").value.trim();

  const bulletInput = document.getElementById("bullets").value.trim();
  const bullets = bulletInput ? bulletInput.split(";").map(b => b.trim()) : [];

  const newItem = {
    category,
    title,
    role,
    imgSmall,
    imgLarge,
    alt,
    link,
    linkText,
    bullets
  };

  const data = loadLocalData();
  data.push(newItem);
  saveLocalData(data);

  document.getElementById("add-form").reset();

  alert("Experience added to localStorage!");
});

document.getElementById("delete-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const index = document.getElementById("delete-select").value;
  let data = loadLocalData();

  if (index === "" || index === null) {
    alert("Please select an experience to delete.");
    return;
  }

  const removed = data.splice(index, 1); 
  saveLocalData(data);

  populateDeleteDropdown();

  alert(`Deleted: ${removed[0].title}`);
});

document.getElementById("update-select").addEventListener("change", function () {
  const index = this.value;
  const data = loadLocalData();

  if (index === "" || !data[index]) return;

  const item = data[index];

  document.getElementById("update-category").value = item.category;
  document.getElementById("update-title").value = item.title;
  document.getElementById("update-role").value = item.role;
  document.getElementById("update-imgSmall").value = item.imgSmall || "";
  document.getElementById("update-imgLarge").value = item.imgLarge || "";
  document.getElementById("update-alt").value = item.alt || "";
  document.getElementById("update-link").value = item.link || "";
  document.getElementById("update-linkText").value = item.linkText || "";
  document.getElementById("update-bullets").value = (item.bullets || []).join("; ");
});

document.getElementById("update-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const index = document.getElementById("update-select").value;
  if (index === "" || index === null) {
    alert("Please select an experience to update.");
    return;
  }

  const data = loadLocalData();

  const updatedItem = {
    category: document.getElementById("update-category").value,
    title: document.getElementById("update-title").value.trim(),
    role: document.getElementById("update-role").value.trim(),
    imgSmall: document.getElementById("update-imgSmall").value.trim(),
    imgLarge: document.getElementById("update-imgLarge").value.trim(),
    alt: document.getElementById("update-alt").value.trim(),
    link: document.getElementById("update-link").value.trim(),
    linkText: document.getElementById("update-linkText").value.trim(),
    bullets: document.getElementById("update-bullets").value.trim()
              ? document.getElementById("update-bullets").value.split(";").map(b => b.trim())
              : []
  };

  // Replace the correct item — REAL PUT behavior
  data[index] = updatedItem;

  saveLocalData(data);

  populateDeleteDropdown();
  populateUpdateDropdown();

  alert("Experience updated!");
});


populateUpdateDropdown();

populateDeleteDropdown();

