# Team 8: Cre8tors - Chad Wall Code Critique
## Details
**Time:** 04/20/2022 07:40PM-3:00PM
## Critique
### HTML
* Very strong div-itis going on with the modals system. Large dependency on id and classes and a lack of semantic HTML.
* Modals could have been generalized web components or even templates which change based on their current role instead of just having three div modals constantly in the DOM.
* The structure of the HTML is generally unorganized in a semantic sense. Header, Main, and Footer tags arn't used even though those structures are used.
* In General, the HTML is more focused on catering to the style and the JS instead of setting up the content.
* There are many instances of content in the HTML existing only to set up some styling, which contradicts the purpose of HTML, which is to act as the provider of content.
### CSS
* CSS file main.css is only used in a single HTML file (index.html) which seems like a poor desicion as the whole purpose of a CSS file is that it can be cached utilized in multiple files to cut down on costs. Since it is just in one file it simply increases the overhead. This issue of a CSS file being used in only one file persists for all the CSS files.
* A good chunk of "!important"s thrown around, which entails there is a sizeable amount of obverlap in the CSS which implies the styling is rather tangled.
* A majority of the styles involving meaurements use pixels, which is pretty bad. This is because only absolute values are being used, meaning there is little leaniency towards varying screen sizes. It also shows that only the generic screen size of a monitor was considered (1920x1080).
* There is no consideration for different screen sizes and media queries are never used.
* A majority of the CSS rules are catered towards a specific class or id, which means any overlap in classes would cause a conflict (possibly why the !importants were everywhere). It also means that there could be a large amount of redundancy in code as id styling could be overlapping and could be caught in the same tag, but such nuance is lost when setting rules mostly for ids.
* The styling for the timer page and the modals in the page are seperated into different pages which is a bit confusing.
### Javascript
* window.onload is used isntead of DOMContentLoaded which could cause bottlenecks in loading to echo through the javascript.
* For the eventCloseModal, there is a ton of redundancy in the switch case, as we are doing a ton of get elements that we don't need to, which may cause an un-ncessary amount of lag.
* In the main js, the session date system seems brittle because the time, lastVisist, getting the session date are hingent on loads and unloads going through smoothly.
* Creating the progress bar is really brittle.
* In general, the task item is rather brittle because some attributes are check and maintained through the class value instead of some internal system while other attributes are maintained through their own attributes.
* In the stats section, thhe unload handler seems to set the stats list to the local storage, but this is redundant.
* Many values are hard-coded in, especially in the timer javascript. This means that any attempt at adding modularity will be harder to implement down the road if we plan to do that.
* Fair amount of magic numbers, at least in the timer js which could cause issues down the road. For example, the time of a break is 5 minutes, but the value which sets the time html, and the value which is given to starting the timer, can be made into two seperate values.
* Distractions are only logged in local storage if the session is completed.
* There are many instances of the same elements being grabbed constantly in functions even though they could be grabbed once at the start as global variables.