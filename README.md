# Veracity

This was a group project for the 24 hour HackUC II hackathon hosted at Union County Vocational Technical Schools in New Jersey on June 22-23. My group consisted of Eric, Nick, Matt, and myself. 

Our original Devpost project can be viewed here: [https://devpost.com/software/veracity-ai3lq1](https://devpost.com/software/veracity-ai3lq1)
Another Github repo for this project is Eric's: [https://github.com/schneidere/Veracity](https://github.com/schneidere/Veracity)

## Inspiration
We live in an information age like none other. Approximately 74.6% of the United States population has access to the Internet (according to a 2015 study), a resource upon which digital journalism has evolved and flourished. Thanks to this ever-strengthening trend, more and more Americans are increasingly relying upon free news articles written online as their primary or sole source of news.

The problem with this new influx of internet news media is that information is much more easily manipulated to represent biased data. In fact, it has been shown in a recent study conducted by Stanford University that consumers of online media are incredibly inept at differentiating credible news from sponsored media, satire, and falsified articles containing reports of bogus events.

As such, we decided to create Veracity in an attempt to help internet users to quickly distinguish credible news sources from fake content and identify potential sources of bias in the articles they read. Our goal is not to sway opinions in a specific fashion - rather, we want to empower individuals with potent information so that they can gain a better awareness of the opinions of others and see for themselves what the news they read wants them to think.

## What it does
Veracity (noun):

1. habitual observance of truth in speech or statement; truthfulness.
2. conformity to truth or fact; accuracy.

As previously mentioned, Veracity is a plugin (currently only for Google Chrome). Everyone can install it and click on its thumbnail icon while reading a specific news article to instantly find out:

1. How credible (factually accurate) the given online news site is.
2. The specific political leaning (right, left, centrist, etc.) of the site as a whole.
3. The approximate political leaning (right, left, centrist, etc.) of the news article being viewed.
4. The approximate political leaning (right, left, centrist, etc.) of any journalist(s) responsible for writing the given article.

## How we built it
Veracity all starts with a user navigating to a webpage. The first step Veracity - at this point just a Chrome extension - takes upon any pageload request is to detect special keywords using a string recognition algorithm to determine whether it is an actual news site or not. If it determines that it is a news site, it then takes the article, author, site, and URL data, uploading these items to a Python controller in the Cloud. This Python controller then parses the data fed to it and uploads it in relevant pieces to a Node.js script that interacts with the appropriate databases. The first thing that the Node.js script does is check to see if the article being visited already exists in our system. If so, the program returns the appropriate data for site credibility, site leaning, author leaning, and the article's predicted bias. However, if the article does not yet exist, it takes a very different route: First, we use Indico's machine learning algorithms via API to detect the inherent bias present in the article. From there, we store the result in our database and follow the first procedure to service the end user. In this way, users themselves serve as our spiders, crawling throughout the Web to add new information regarding articles to our existing collection. Additionally, once every 24 hours, we parse through an article database with a PHP script and collect aggregate scores for journalists based on all the articles they have published in our database. As such, we rank online journalists originally whereas for sites we utilize readly available aggregates. During this time, we also update our site by utilizing a Node.js web scraper that collects information from allsides.com, a nonpartisan political news aggregate. Once the data is sent back to the Python script, the script reformats the information in to a graphical display that can be shown in the Google Chrome extension tab.

## Challenges we ran into
Our initial challenge was getting the locally tested backend online in the cloud. Due to it being built on a Windows machine and our server being an Ubuntu 16.04, there were several issues that prevented our server from running at first. Beyond these syntax errors, our front and back ends communicated to each other via POST and were built by two separate developers. Our team had to establish common syntax between our two developers who used two disparate programming languages (Python vs. Node.js). In the end, perhaps our biggest challenge proved to be our incredible sleep deprivation. Despite the inane amount of caffeinated beverages and water at our disposal, we all felt the allure of sleep calling out to our vacant husks by the early morning.

## Accomplishments that we are proud of
Our goal for creating Veracity was to make something that people everyone could find useful. In that sense, we succeeded. Although the use of our program depends on the sentiment of its end user, our goal was to provide relevant information in a highly digestible format so that users could formulate their own positions based upon the clarity of data science.

## What we learned
We learned the incredible potential for browser extensions and their potential usefulness for an increasingly mobile world. Furthermore, we learned a significant amount regarding client/server interactions and the importance of having common conventions between front and back end developers.

## What's next for Veracity
Our final product was delivered under the constraints of a 24-hour timeframe, but in the future we plan on implementing the following improvements/features:

* A system that assigns ratings to unregistered sites based on scanning the articles there; this will let us add new sites to our database

* Weighted articles: Articles that are deemed more relevant will be given a higher weighted score, this will allow us to measure the change in political climate over time based on online news

* Make the plugin available to be installed on not just Chrome but on all mainstream browsers (Firefox, Opera, Microsoft Edge, etc.)

Additionally, given more time, we hope to make the entire system more efficient so that it could service as many users as required. We believe that Veracity has incredible potential to become a useful tool both for political junkies as well as the casual observer.