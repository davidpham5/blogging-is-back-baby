const { processObjectToMarkdown } = require("../json-to-markdown");
const fs = require("fs");
const slugger = require("../slugger");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const capitalize = (word) => {
  const capitalized = word.charAt(0).toUpperCase()
+ word.slice(1)
  return capitalized;
}
const transformExportToJSON = (data) => {
  const dom = new JSDOM(data);
  const window = dom.window;
	const document = window.document;
  //console.log(data);
	//const customElements = window.customElements;
	//const HTMLElement = window.HTMLElement;
  var linkList = [...document.querySelectorAll('li')].map(el => {
    console.log(el, el.outerHTML, el.firstChild.tagName, el.querySelector('A') )
    if (el.firstChild.tagName !== 'A') return;
    let aChild = el.querySelector('A');
    let dateString =  aChild.getAttribute('time_added');
    let dateObj = new Date(parseInt(dateString) * 1000);
          // Generate a file-slug YYYY-MM-DD string from the date
          let date = dateObj;
          let year = date.getFullYear();
          let month = String(date.getMonth() + 1).padStart(2, "0");
          let day = String(date.getDate()).padStart(2, "0");
          let dateFileString = `${year}-${month}-${day}`;
          let isoDate = '';
    try {
      isoDate = dateObj.toISOString();
    } catch (e) {
      console.log('Date error', e, dateString);
      throw new Error('Could not parse date' + dateString)
    }
    let dataSet = {
      link: aChild.href,
      date: isoDate,
      tags: aChild.getAttribute('tags').split(',').filter(e => e).map(tag => tag.toLowerCase()),
      title: aChild.textContent,
      content: '',
      isBasedOn: aChild.href,
      slug: slugger(dateFileString + "-" + aChild.textContent),
    }
    console.log('dataset', dataSet);
    return dataSet;
  });
  return linkList.filter(e => e);
};

const getPocketExport = () => {
  const links = fs.readFileSync(
    "./to-process/ril_export.html",
    "utf8"
  );

  return links;
}

const writeLinkToTurbo = (linkObj) => {
  return processObjectToMarkdown(
    "title",
    "content",
    "./src/content/turbo-hyperlinks",
    linkObj
  )
}

const processPocketExport = () => {
  const pocketExport = transformExportToJSON(getPocketExport());
  //write
  let writeResults = pocketExport.map((link) => {
    return writeLinkToTurbo(link);
  })
  return writeResults;
};


module.exports = {
  make: async () => {},
	writeTurbo: async () => {
		//var finishedArray = await Promise.all(quoteArray);
		var result = processPocketExport();
		return result;
	},
};
