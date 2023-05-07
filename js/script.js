// select the div with a class of “overview”
const overview = document.querySelector(".overview");

// define GitHub username
const username = "rstavchansky";

// fetch information from GitHub profile

const getProfile = async function () {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    showProfile(data);
};

getProfile();

const showProfile = function (data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url}/>
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(userInfo);
};
