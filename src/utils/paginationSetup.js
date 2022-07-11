export default function paginationSetup(headerLink) {
  let lastPage = null;
  const paginationLinks = headerLink.split(", ");

  paginationLinks.map((paginationLink) => {
    const paginationURL = paginationLink.split("; ")[0].match("<(.*)>")[1];
    const paginationRel = paginationLink.split("; ")[1].match('"(.*)"')[1];

    if (paginationRel === "last") {
      lastPage = paginationURL.match(/&page=(\d+).*$/)[1];
      return parseInt(lastPage);
    }

    return null;
  });

  return lastPage;
}
