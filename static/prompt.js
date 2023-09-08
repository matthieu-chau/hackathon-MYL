const promptForm = document.getElementById("prompt-form");
const submitButton = document.getElementById("submit-button");
const questionButton = document.getElementById("question-button");
const darkmodeButton = document.getElementById("darkbutton");
const messagesContainer = document.getElementById("messages-container");
const uploadButton = document.getElementById("file");
const submitfileButton = document.getElementById("submit-file");
const resetbutton = document.getElementById('reset-button')
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
const labelcolor1 = document.getElementById("labelcolor1");
const colorpicker1 = document.getElementById("colorpicker1");
const change = document.getElementById('change');
var save1 = messagesContainer.children;
var save2 = messagesContainer.children;
const labelcolor2 = document.getElementById("labelcolor2");
const colorpicker2 = document.getElementById("colorpicker2");


const appendHumanMessage = (message) => {
  const humanMessageElement = document.createElement("div");
  humanMessageElement.classList.add("message", "message-human");
  humanMessageElement.innerHTML = message;
  messagesContainer.appendChild(humanMessageElement);
};

const appendAIMessage = async (messagePromise) => {
  // Add a loader to the interface
  const loaderElement = document.createElement("div");
  loaderElement.classList.add("message");
  loaderElement.innerHTML =
    "<div class='loader'><div></div><div></div><div></div>";
  messagesContainer.appendChild(loaderElement);

  // Await the answer from the server
  const messageToAppend = await messagePromise();

  // Replace the loader with the answer
  loaderElement.classList.remove("loader");
  loaderElement.innerHTML = messageToAppend;
};

const handlePrompt = async (event) => {
  event.preventDefault();
  // Parse form data in a structured object
  const data = new FormData(event.target);
  promptForm.reset();

  let url = "/prompt";
  if (questionButton.dataset.question !== undefined) {
    url = "/answer";
    data.append("question", questionButton.dataset.question);
    delete questionButton.dataset.question;
    questionButton.classList.remove("hidden");
    submitButton.innerHTML = "Message";
  }

  const handlesubmitfile = async (event) => {
    url = "/";
  }

  submitfileButton.addEventListener("click", handlesubmitfile);

  appendHumanMessage(data.get("prompt"));

  await appendAIMessage(async () => {
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    return result.answer;
  });
};

promptForm.addEventListener("submit", handlePrompt);

const handleQuestionClick = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/question", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    questionButton.classList.add("hidden");
    submitButton.innerHTML = "Répondre à la question";
    return question;
  });
};

questionButton.addEventListener("click", handleQuestionClick);

darkmodeButton.onclick = function () {
  modal.style.display = "block";
  uploadButton.style.display = "block";
}

const handleresetbutton = (event) => {
  var firstChild = messagesContainer.firstElementChild;
  while (messagesContainer.children.length > 1) {
    if (messagesContainer.children[1] !== firstChild) {
      messagesContainer.removeChild(messagesContainer.children[1]);
    } else {
      break;
    }
  }
}

resetbutton.addEventListener("click", handleresetbutton);

const handlechange = (event) => {
  save1 = messagesContainer.children;

  while (messagesContainer.firstChild) {
    messagesContainer.removeChild(messagesContainer.firstChild);
  }

  messagesContainer.children = save2;
  save2 = save1;

  var i = 0;
  while(i < messagesContainer.children.length){
    if (i%2 === 0){
      appendHumanMessage(toString(save2.children[i]));
    }
    else{
      appendAIMessage(toString(save2.children[i]));
    }
    i = i + 1;
  }
};

change.addEventListener("click", handlechange);

const selectMenu = document.getElementById("choix-menu");

const handleselectMenu = async (event) => {
  const selectedTheme = selectMenu.value;
  const elements = document.querySelectorAll("*");
  for (const element in elements) {
    if (elements[element].classList) {
      if (selectedTheme === "custom") {
        labelcolor1.style.display = "inline";
        colorpicker1.style.display = "inline";
        labelcolor2.style.display = "inline";
        colorpicker2.style.display = "inline";
        elements[element].classList.remove("darkmode", "lightmode", "barbie");
      }
      else {
        labelcolor1.style.display = "none";
        colorpicker1.style.display = "none";
        labelcolor2.style.display = "none";
        colorpicker2.style.display = "none";
        elements[element].classList.remove("darkmode", "lightmode", "barbie");
        elements[element].classList.add(selectedTheme);
      }

    }
  }
};

selectMenu.addEventListener("change", handleselectMenu);

const handlebackgroundcolor = async (event) => {
  const selectedColor = colorpicker1.value;
  const elements = document.querySelectorAll("*");
  for (const element in elements) {
    if (elements[element].classList) {
      elements[element].style.backgroundColor = selectedColor;
    }
  }
}

colorpicker1.addEventListener("change", handlebackgroundcolor);

const handletextcolor = async (event) => {
  const selectedColor = colorpicker2.value;
  const elements = document.querySelectorAll("*");
  for (const element in elements) {
    if (elements[element].classList) {
      elements[element].style.color = selectedColor;
    }
  }
}

colorpicker2.addEventListener("change", handletextcolor);

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}