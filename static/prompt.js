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
const labelcolor2 = document.getElementById("labelcolor2");
const colorpicker2 = document.getElementById("colorpicker2");
const labelcolor3 = document.getElementById("labelcolor3");
const colorpicker3 = document.getElementById("colorpicker3");
const labelcolor4 = document.getElementById("labelcolor4");
const colorpicker4 = document.getElementById("colorpicker4");


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
    let url = "/";
    data.append("file", uploadButton.value);
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


var firstChild = messagesContainer.firstElementChild;

const handleresetbutton = (event) => {
  while (messagesContainer.children.length > 1) {
    if (messagesContainer.children[1] !== firstChild) {
      messagesContainer.removeChild(messagesContainer.children[1]);
    } else {
      break;
    }

  }
}


resetbutton.addEventListener("click", handleresetbutton);
const selectMenu = document.getElementById("choix-menu");

const handleselectMenu = async (event) => {
  const selectedTheme = selectMenu.value;
  const elements = document.querySelectorAll("*");
  for (const element in elements) {
    if (elements[element].classList) {
      if (selectedTheme === "custom") {
        labelcolor1.style.display = "inline-block";
        colorpicker1.style.display = "inline-block";
        labelcolor2.style.display = "inline-block";
        colorpicker2.style.display = "inline-block";
        labelcolor3.style.display = "inline-block";
        colorpicker3.style.display = "inline-block";
        labelcolor4.style.display = "inline-block";
        colorpicker4.style.display = "inline-block";
        elements[element].classList.remove("darkmode", "lightmode", "barbie");
      }
      else {
        labelcolor1.style.display = "none";
        colorpicker1.style.display = "none";
        labelcolor2.style.display = "none";
        colorpicker2.style.display = "none";
        labelcolor3.style.display = "none";
        colorpicker3.style.display = "none";
        labelcolor4.style.display = "none";
        colorpicker4.style.display = "none";
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

const handlebordercolor = async (event) => {
  const selectedColor = colorpicker3.value;
  const elements = document.querySelectorAll("*");
  for (const element in elements) {
    if (elements[element].classList) {
      elements[element].style.bordercolor = selectedColor;
    }
  }
}

colorpicker3.addEventListener("change", handlebordercolor);

const handlesecondarycolor = async (event) => {
  const selectedColor = colorpicker4.value;
  const elements = document.querySelectorAll("*");
  for (const element in elements) {
    if (elements[element].classList) {
      elements[element].style.secondarycolor = selectedColor;
    }
  }
}

colorpicker4.addEventListener("change", handlesecondarycolor);

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}