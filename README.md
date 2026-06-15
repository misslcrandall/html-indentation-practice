# html-indentation-practice (IN PROGRESS)
Tool for students to practice HTML indentation

## Demo Link:
https://misslcrandall.github.io/html-indentation-practice/

## About
When I began teaching HTML, I noticed many of my students struggled nesting elements and knowing when to indent elements.

I wanted to create an app that let them practice specific scenarios, like nested divs and sibling elements, so I setup a basic editor with a textarea element and iframe. I added some JS to make sure the text area could handle tabbed indentation, then began searching for a linter to check the formatting.

Finding a linter proved more difficult than I expected, since most were not designed to run in the client. Of the ones I could find, the linter focused more on validation errors than formatting, and did not catch indentation errors. With that in mind, I am currently pivoting using React so I can pull in https://html-eslint.org/ to the client.

Once that is working, the next step will be building in multiple challenges and the option to progress between them.

And of course, the fun part—styling!