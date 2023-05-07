// select the div with a class of “overview”
const overview = document.querySelector(".overview");

// select the ul element to display repos
const listedRepos = document.querySelector(".repo-list");

// select the element that surrounds the list of repos
const reposSection = document.querySelector(".repos");

// select the element to display individual repo information
const singleRepo = document.querySelector(".repo-data");

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
        const repoInfoLi = document.createElement("li");
        repoInfoLi.classList.add("repo");
        repoInfoLi.innerHTML = `<h3>${repo.name}</h3>`;
        listedRepos.append(repoInfoLi);
  }
};

// listen for a click on a repo title
const repoList = listedRepos.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSingleRepo(repoName);
    }
});

const getSingleRepo = async function (repoName) {
    const singleRepo = await fetch(`https://api.github.com/repos/${username}
/${repoName}`);
    const repoInfo = await singleRepo.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    };
    //console.log(languages);
    showSingleRepo(repoInfo, languages);
};

const showSingleRepo = function (repoInfo, languages) {
    singleRepo.innerHTML = "";
    singleRepo.classList.remove("hide");
    const singleRepoInfo = document.createElement("div");
    singleRepoInfo.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    singleRepo.append(singleRepoInfo);
    reposSection.classList.add("hide");
};
