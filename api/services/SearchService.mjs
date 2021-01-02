import puppeteer from 'puppeteer';
import targets from './BookServiceTargets.json';
import moment from 'moment/min/moment-with-locales';

const LEFT_HAND_SIDE = 0;
const RIGHT_HAND_SIDE = 1;

const translate = {
  'Capa comum': 'Paperback',
  'Inglês': 'English',
  'Português': 'Portuguese'
};

const args = [
  '--no-sandbox', 
  '--disable-setuid-sandbox', 
  '--window-size=1920,1080',
  '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
];

const errorHandler = async (browser, e) => {
  await browser.close();
  throw new Error(e);   
};

const click = async (page, target) => {
  return await Promise.all([
    page.waitForNavigation(),
    page.click(target.link)
  ]);      
};

const checkButton = async (page, target) => {
  return await page.evaluate(target => { 
    return document.querySelector(target.link) !== null 
  }, target);  
};

const getDetail = (details, words) => {
  let detail = details.find(item => {
    return words.some(word => item[LEFT_HAND_SIDE].toLowerCase().indexOf(word.toLowerCase()) >= 0)
    || words.some(word => item[RIGHT_HAND_SIDE].toLowerCase().indexOf(word.toLowerCase()) >= 0)
  });
  return detail ? detail : ['', ''];
}

const parseDetails = (details) => {
  if (details.length > 0) {
    details = details.split('\n').map(item => item.split(' : ').map(subitem => subitem.trim()));

    let format = getDetail(details, ['páginas', 'pages'])[LEFT_HAND_SIDE];
    format = translate[format] ? translate[format] : format;  

    let pages = getDetail(details, ['páginas', 'pages'])[RIGHT_HAND_SIDE].replace(/\D/g, '');
    
    let isbn10 = getDetail(details, ['ISBN-10'])[RIGHT_HAND_SIDE].replace(/\D/g, '');

    let isbn13 = getDetail(details, ['ISBN-13'])[RIGHT_HAND_SIDE].replace(/\D/g, '');

    let dimensions = getDetail(details, ['dimensions', 'dimensões'])[1];

    let publisher = getDetail(details, ['publisher', 'editor'])[RIGHT_HAND_SIDE].replace(/\(.+\)/, '').trim();

    let publishDate = getDetail(details, ['publisher', 'editor'])[RIGHT_HAND_SIDE].replace(/^.+\(/, '').replace(/\)/, '');
    publishDate = moment(publishDate, ['D MMMM YYYY'], 'pt-BR');
    publishDate = publishDate.isValid() ? publishDate.toJSON().slice(0, 10) : '';

    let weight = getDetail(details, ['weight', 'peso'])[RIGHT_HAND_SIDE];

    let language = getDetail(details, ['idioma', 'language'])[RIGHT_HAND_SIDE];
    language = translate[language] ? translate[language] : language; 

    return { 
      format, 
      pages, 
      isbn10, 
      isbn13, 
      dimensions, 
      publisher, 
      publishDate, 
      weight, 
      language 
    };

  } else {
    return {
      format: '', 
      pages: '', 
      isbn10: '', 
      isbn13: '', 
      dimensions: '', 
      publisher: '', 
      publishDate: '', 
      weight: '', 
      language: '' 
    }  
  }
};

const getInfo = async (page, target) => {
  return await page.evaluate(target => {
    const cover = document.querySelector(target.cover);
    const title = document.querySelector(target.title);
    const subtitle = document.querySelector(target.subtitle);
    const content = document.querySelector(target.contentIFrame);
    const details = document.querySelector(target.details);
  
    return {
      cover: cover ? cover.src : '',
      title: title ? title.innerText : '',
      subtitle: subtitle ? subtitle.innerText : '',
      content: content ? content.contentDocument.body.querySelector(target.content).innerText : '',
      details: details ? details.innerText : ''
    }  
  }, target);
};

export default {

  findBookData: async (isbn) => {

    let info = {};
  
    let target = targets[1];

    let browser;
    try { browser = await puppeteer.launch({ headless: true, args });
    } catch (e) { return errorHandler(browser, e); }

    let page;
    try { page = await browser.newPage();
    } catch (e) { return errorHandler(browser, e); }

    try { await page.goto(target.domain + `/s?k=${isbn}&ref=nb_sb_noss`, { waitUntil: 'load', timeout: 5000 });
    } catch (e) { return errorHandler(browser, e); }

    let buttonIsThere;
    try { buttonIsThere = await checkButton(page, target);
    } catch (e) { return errorHandler(browser, e); }

    if (buttonIsThere) {
      try { await click(page, target);
      } catch (e) { return errorHandler(browser, e); }
  
      try { info = await getInfo(page, target);
      } catch (e) { return errorHandler(browser, e); }
  
      info.details = parseDetails(info.details);

      try { await browser.close();
      } catch (e) { errorHandler(browser, e); }
    }
    return info;
  }
} 
