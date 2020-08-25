# WICS Website-2020
Rewritten wics site using next.js.
This repository holds the WICS website-2020's source code!

## Before Getting Started

You don't need much to work on the site, just a text editor and a few basic tools.
Here is a guide to get you started.  
If you run into issues with this guide, don't hesitate to reach out over Slack, we're happy to help out!

#### Installing an Editor/IDE

A decent all-round editor/IDE is [VSCode](https://code.visualstudio.com/).
However, everyone has their own preference and you're welcome to use whatever you like.
> Alternative IDEs:
>  *  [Atom](https://atom.io/)
>  *  [IntelliJ](https://www.jetbrains.com/idea/download/)

#### Setting up Git

See [this article](https://help.github.com/articles/set-up-git/).  
>You don't need to worry about the "Authenticating with GitHub from Git" section, just complete 1-3.

#### Installing Node.js and npm
To install Node.js and npm, go [here](https://nodejs.org/en/) and follow the instructions.  

---
## Contributing to the Site

### Making Changes

Now that you have Git installed.
1. clone the repository
```sh
$ git clone https://github.com/umwics/wics-site-2020
```
2. then change directory to it with this command:
```sh
$ cd wics-site-2020
```
3. Next, create a new branch.  
> **Note**: You should name it something concise but relevant to what you're going to work on.
Here I've used the name `fix-broken-link` to describe what my branch will contain.  
```sh
$ git checkout -b fix-broken-link
```



Now feel free to make changes to the site! Now to preview changes to the site.

### Wics Next.js testing

Now that you've made some changes, you probably want to see what they look like.

### Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

* You should see a message that ends with these lines (or similar):
```
> umwics@1.0.0 dev C:\Users\Juhee\Documents\projects\wics-site-2020
> next

ready - started server on http://localhost:3000
event - compiled successfully
```

Now you can navigate to `http://localhost:3000/` to view the  website. _(Don't forget the trailing slash!)_

While the site is running in the terminal, you can edit pages and they will update in real time.


### Submitting Changes

Now that you've written a great new feature, the next step is to *commit* those changes, and *push* them to the GitHub repository.
Afterwards, you will make a *pull request* for us to review and *merge*.

1. *Stage* your files:
```sh
$ git add .
```

2. *Commit* your changes.
```sh
$ git commit -m 'Fix broken link to CSS tutorial'
```
>**Note**: Your *commit message* should concisely describe what you did.



3. *Push* the commit to the GitHub repository.
```sh
$ git push origin fix-broken-link  # Remember to use the same name as your own branch!
```

4. Here, Git will ask you for your username and password.
Enter your GitHub username and password here.

5. Create a *pull request*.
To do so, follow the instructions found [here](https://help.github.com/articles/creating-a-pull-request/)!

With all this done, you may receive some feedback or requests for changes, or it may be merged straight into the live website.



#### Deployment (Not set it yet)
Deploy it to the cloud with [Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).


## Learning Resoures

Here are some tutorials for getting you on your feet with various tools and technologies:

* [Git](https://try.github.io/levels/1/challenges/1)
* [HTML](https://www.w3schools.com/html/html_intro.asp)
* [CSS](https://www.w3schools.com/css/css_intro.asp)
* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/docs/create-a-new-react-app.html)
* [npm](https://docs.npmjs.com/)

Optional:
* [Material-UI](https://material-ui.com/getting-started/installation/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Firebase](https://firebase.google.com/)
