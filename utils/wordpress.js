// const BASE_URL = "https://stage.asparagusmagazine.com/wp-json/wp/v2";
const BASE_URL = `${process.env.BASE_URL}`;

/// Posts ///

// export async function getPosts() {
//   const postsRes = await fetch(BASE_URL + "/posts?_embed");
//   const posts = await postsRes.json();
//   return posts;
// }

// export async function getPost(slug) {
//   const posts = await getPosts();
//   const postArray = posts.filter((post) => post.slug == slug);
//   const post = postArray.length > 0 ? postArray[0] : null;
//   return post;
// }

/// Events ///

export async function getEvents() {
  const eventsRes = await fetch(BASE_URL + "/events?_embed");
  const events = await eventsRes.json();
  return events;
}

export async function getEvent(slug) {
  const events = await getEvents();
  const eventArray = events.filter((event) => event.slug == slug);
  const event = eventArray.length > 0 ? eventArray[0] : null;
  return event;
}

/// Categories ///

export async function getCategories() {
  const categoriesRes = await fetch(BASE_URL + "/categories?per_page=100");
  const categories = await categoriesRes.json();
  return categories;
}

export async function getCategory(slug) {
  const categories = await getCategories();
  const categoryArray = categories.filter((category) => category.slug == slug);
  const category = categoryArray.length > 0 ? categoryArray[0] : null;
  return category;
}

/// Articles ///

export async function getArticles() {
  const articlesRes = await fetch(BASE_URL + "/articles?_embed&per_page=300");
  const articles = await articlesRes.json();
  return articles;
}

export async function getArticle(slug) {
  const articles = await getArticles();
  const articleArray = articles.filter((article) => article.slug == slug);
  const article = articleArray.length > 0 ? articleArray[0] : null;
  return article;
}

/// Contributors ///

export async function getContributors() {
  const contributorsRes = await fetch(
    BASE_URL + "/contributors?_embed&per_page=300"
  );
  const contributors = await contributorsRes.json();
  return contributors;
}

export async function getContributor(slug) {
  const contributors = await getContributors();
  const contributorArray = contributors.filter(
    (contributor) => contributor.slug == slug
  );
  const contributor = contributorArray.length > 0 ? contributorArray[0] : null;
  return contributor;
}

/// Stockists ///

export async function getStockists() {
  const stockistsRes = await fetch(BASE_URL + "/stockists?_embed&per_page=100");
  const stockists = await stockistsRes.json();
  return stockists;
}

/// General Pages ///

export async function getGeneralPages() {
  const genpagesRes = await fetch(
    BASE_URL + "/general_pages?_embed&per_page=100"
  );
  const genpages = await genpagesRes.json();
  return genpages;
}

export async function getGeneralPage(slug) {
  const genpages = await getGeneralPages();
  const genpagesArray = genpages.filter((genpage) => genpage.slug == slug);
  const genpage = genpagesArray.length > 0 ? genpagesArray[0] : null;
  return genpage;
}

/// Gus Tips Newsletter ///

export async function getTips() {
  const tipsRes = await fetch(BASE_URL + "/asparagus_tips?_embed&per_page=100");
  const tips = await tipsRes.json();
  return tips;
}

export async function getTip(slug) {
  const tips = await getContributors();
  const tipsArray = tips.filter((tip) => tip.slug == slug);
  const tip = tipsArray.length > 0 ? tipsArray[0] : null;
  return tip;
}

/// Team ///

export async function getTeamMembers() {
  const membersRes = await fetch(
    BASE_URL + "/team_members?_embed&per_page=100"
  );
  const members = await membersRes.json();
  return members;
}

export async function getTeamMember(slug) {
  const members = await getTeamMembers();
  const membersArray = members.filter((member) => member.slug == slug);
  const member = membersArray.length > 0 ? membersArray[0] : null;
  return member;
}

/// Issues ///

export async function getIssues() {
  const issuesRes = await fetch(BASE_URL + "/issues?_embed&per_page=100");
  const issues = await issuesRes.json();
  return issues;
}

export async function getIssue(slug) {
  const issues = await getIssues();
  const issuesArray = issues.filter((issue) => issue.slug == slug);
  const issue = issuesArray.length > 0 ? issuesArray[0] : null;
  return issue;
}

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case "events":
      elements = await getEvents();
      break;
    case "categories":
      elements = await getCategories();
      break;
    case "articles":
      elements = await getArticles();
      break;
    case "contributors":
      elements = await getContributors();
      break;
    case "stockists":
      elements = getStockists();
      break;
    case "asparagus-tips":
      elements = await getTips();
      break;
    case "general_pages":
      elements = await getGeneralPages();
      break;
    case "team_members":
      elements = await getTeamMembers();
      break;
    case "issues":
      elements = await getIssues();
      break;
  }
  const elementsIds = elements.map((element) => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });
  return elementsIds;
}
