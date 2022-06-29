const BASE_URL = "http://asparagus.local/wp-json/wp/v2";

/// Posts ///

export async function getPosts() {
  const postsRes = await fetch(BASE_URL + "/posts?_embed");
  const posts = await postsRes.json();
  return posts;
}

export async function getPost(slug) {
  const posts = await getPosts();
  const postArray = posts.filter((post) => post.slug == slug);
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}

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
  const categoriesRes = await fetch(BASE_URL + "/categories?_embed");
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
  const articlesRes = await fetch(BASE_URL + "/articles?_embed");
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

/// Stockists ///

/// Issues ///

/// Gus Tips Newsletter ///

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case "posts":
      elements = await getPosts();
      break;
    case "events":
      elements = await getEvents();
      break;
    case "categories":
      elements = await getCategories();
      break;
    case "articles":
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
