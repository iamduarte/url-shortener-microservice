# URL Shortener Microservice

Build a full stack JavaScript app that is functionally similar to this: https://url-shortener-microservice.freecodecamp.rocks. Working on this project will involve you writing your code using one of the following methods:

Clone this GitHub repo and complete your project locally.
Use our Replit starter project to complete your project.
Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.
If you use Replit, follow these steps to set up the project:

Start by importing the project on Replit.
Next, you will see a .replit window.
Select Use run command and click the Done button.
When you are done, make sure a working demo of your project is hosted somewhere public. Then submit the URL to it in the Solution Link field. Optionally, also submit a link to your project's source code in the GitHub Link field.

HINT: Do not forget to use a body parsing middleware to handle the POST requests. Also, you can use the function dns.lookup(host, cb) from the dns core module to verify a submitted URL.

# Tests

You should provide your own project, not the example URL.
Passed:You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
Passed:When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
Passed:If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }
