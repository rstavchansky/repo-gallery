// select the div with a class of “overview”
const overview = document.querySelector(".overview");

// select the ul element to display repos
const reposList = document.querySelector(".repo-list");

// define GitHub username
const username = "rstavchansky";

// fetch information from GitHub profile
const getProfile = async function () {
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();
    showProfile(data);
};

getProfile();

// show profile info from GitHub
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
    getRepoInfo();
};

// fetch repo information
const getRepoInfo = async function () {
    const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated?per_page=100`);
    const repoData = await repos.json();
    //console.log(repoData);
    showRepos(repoData);
};

// show repo information
const showRepos = function (repoData) {
    for (const repo of repoData) {
        const repoInfo = document.createElement("li");
        repoInfo.classList.add("repo");
        repoInfo.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(repoInfo);
  }
};
