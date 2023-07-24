<p align="center">
    <a href="https://umwics.vercel.app" rel="noopener" target="_blank">
        <img width="150" src="https://umwics.vercel.app/img/umwics-logo.png" alt="UMWics logo" />
    </a>
</p>

<h1 align="center">WICS Website-2023</h1>

<div align="center">
Rewritten wics site using Next.js.
This repository holds the WICS website-2023's source code!
<br>
<b>The source code of the WICS website is only available for use to develop the WICS official website by the WICS website committee.<br>
WICS website committee members can only contribute code to the codebase and are forbidden to share the website code with anyone outside WICS website committee.</b>

![GitHub last commit](https://img.shields.io/github/last-commit/umwics/wics-site-2020)
[![Website](https://img.shields.io/website/https/umwics.vercel.app?down_color=red&down_message=down&up_message=up)](https://umwics.vercel.app)
[![Slack](https://img.shields.io/badge/slack-umwics-green.svg?style=flat-square)](https://umwics.slack.com)
![GitHub language count](https://img.shields.io/github/languages/count/umwics/wics-site-2020)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/umwics/wics-site-2020)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)


</div>

## Before Getting Started

You don't need much to work on the site, just a text editor and a few basic tools.
Here is a guide to get you started.  
If you run into issues with this guide, don't hesitate to reach out over Slack, we're happy to help out!


#### Setting up Git

See [this article](https://help.github.com/articles/set-up-git/).

> You don't need to worry about the "Authenticating with GitHub from Git" section, just complete 1-3.

#### Installing Node.js and npm

To install Node.js and npm, go [here](https://nodejs.org) and follow the instructions.

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
    > Here I've used the name `fix-broken-link` to describe what my branch will contain.

```sh
$ git checkout -b fix-broken-link
```

Now feel free to make changes to the site! Now to preview changes to the site.


### Install it and run:

```bash
npm install
npm run dev

# If you face this type of problem when tried to run the website(what i did): Error: error:0308010C:digital envelope routines::unsupported
# Enter it into terminal in order to fix the problem:

#UNIX BASED OS:
export NODE_OPTIONS=--openssl-legacy-provider

#WINDOWS:
set NODE_OPTIONS=--openssl-legacy-provider

# or
yarn
yarn dev
```
Source: https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

-   You should see a message that ends with these lines (or similar):

```
> umwics@1.0.0 dev C:\Users\Juhee\Documents\projects\wics-site-2020
> next

ready - started server on http://localhost:3000
event - compiled successfully
```

Now you can navigate to `http://localhost:3000` to view the website.

While the site is running in the terminal, you can edit pages and they will update in [real time](https://nextjs.org/docs/basic-features/fast-refresh).

### Getting database access in development

If you are modifying a page that uses our API or requires authentication you probably want to have access to the firebase project.
You can reach out to us on slack and we will give you the API key's required to work on the page. Once you have the keys you can add
them to a `.env.local` file. You can find an example of this file called `.env.local.example`.

### Submitting Changes

Now that you've written a great new feature, the next step is to _commit_ those changes, and _push_ them to the GitHub repository.
Afterwards, you will make a _pull request_ for us to review and _merge_.

0. _update_ the changes(commits) from a remote repository(master) to the local repository: 

```sh
$ git pull
```

1. _Stage_ your files:

```sh
$ git add .
```

2. _Commit_ your changes.

```sh
$ git commit -m 'Fix broken link to CSS tutorial'
```

> **Note**: Your _commit message_ should concisely describe what you did.

3. _Push_ the commit to the GitHub repository.

```sh
$ git push origin fix-broken-link  # Remember to use the same name as your own branch!
```

4. Here, Git will ask you for your username and password.
   Enter your GitHub username and password here.

5. Create a _pull request_.
   To do so, follow the instructions found [here](https://help.github.com/articles/creating-a-pull-request/)!

With all this done, you may receive some feedback or requests for changes, or it may be merged straight into the live website.
