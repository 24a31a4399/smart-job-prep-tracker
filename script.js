let topics = JSON.parse(localStorage.getItem("topics")) || [];

function addTopic() {
    let select = document.getElementById("topicSelect");
    let topicName = select.value;

    if (topicName === "") {
        alert("Please select a topic");
        return;
    }

    if (topics.some(t => t.name === topicName)) {
        alert("Topic already added!");
        return;
    }

    topics.push({ name: topicName, completed: false });
    localStorage.setItem("topics", JSON.stringify(topics));

    displayTopics();
}

function displayTopics() {
    let list = document.getElementById("topicList");
    list.innerHTML = "";

    topics.forEach((topic, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${topic.completed ? "checked" : ""}
            onchange="toggleComplete(${index})">
            ${topic.name}
        `;
        list.appendChild(li);
    });

    updateProgress();
}

function toggleComplete(index) {
    topics[index].completed = !topics[index].completed;
    localStorage.setItem("topics", JSON.stringify(topics));
    displayTopics();
}

function updateProgress() {
    let completed = topics.filter(t => t.completed).length;
    let total = topics.length;

    let percent = total === 0 ? 0 :
        Math.round((completed / total) * 100);

    document.getElementById("progress").innerText =
        "Progress: " + percent + "%";
}

displayTopics();
