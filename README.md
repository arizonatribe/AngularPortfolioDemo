# AngularPortfolioDemo
This is a simple demonstration of a website with basic features and navigation written in AngularJS and leveraging Node for simulating real APIs.

## Instructions
For quick demonstration purposes and for easier installation, there is currently no true data store but rather singleton caches local to each `.service.js` in the `server\services` directory.

After you've installed both [Node](https://nodejs.org/) and [Git](https://git-scm.com/), you can clone this project (make sure you're in a directory where it's okay to create this project):

```
git clone https://github.com/arizonatribe/AngularPortfolioDemo.git
```

Next, change from your current directory to the newly created `AngularPortfolioDemo/` project root folder:

```
cd AngularPortfolioDemo/
```

Now, you can launch the project by issuing the following command:

```
npm start
```

This single command runs a chain of commands which take care of installing all 3rd-party dependencies used in the project and then launches the application in a locally-hosted Node server. View the `scripts` block in the project's `package.json` file to see the commands it runs __prestart__ and __postinstall__.

## Viewing Documentation
Due to the way the code is documented throughout the application we can extract structured documentation into a browsable, styled, local HTML page. To create this documentation and view it in your web browser, issue the following command (make sure you're in the root `AngularPortfolioDemo/` folder for this project you cloned):

```
npm run docs
```

You should then see the code class structure and detailed descriptions of classes and methods in a navigation pane on the left. All the build automation tasks (Grunt) will be viewable as well.