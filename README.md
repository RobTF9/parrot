<h1 align="center">Parrot</h1>
<p/>
<p align="center">
<img src="./docs/readme/parrot.svg" alt="name"/>
<p/>
<h4 align="center">Teach a virtual parrot as you learn a new language.</h4>

<p align="center">
<a href="https://github.com/RobTF9/parrot/blob/main/LICENSE" target="blank">
<img src="https://img.shields.io/github/license/RobTF9/parrot" alt="licence" />
</a>
<a href="https://github.com/RobTF9/parrot/issues" target="blank">
<img src="https://img.shields.io/github/issues/RobTF9/parrot" alt="pull-requests"/>
</a>
<a href="https://github.com/RobTF9/parrot/pulls" target="blank">
<img src="https://img.shields.io/github/issues-pr/RobTF9/parrot?label=pull%20requests" alt="pull-requests"/>
</a>
</p>

<p align="center">
Welcome to Parrot, an open source project exploring the possibilities of using web technologies for learning languages and speech recognition.
</p>

## :rocket: Local development

Before you get started with local development you'll need to install and configure a few tools and services.

#### 1. Install yarn and node

The simplest way to do this is using Volta, a tool the helps manage node and yarn. You can find instructions on how to do that here: https://volta.sh/

#### 2. Install MongoDB

For local development we need a local instance of MongoDB, instructions available here: https://docs.mongodb.com/manual/installation/

\*Note: If you wish you can use an instance of MongoDB Atlas, a cloud hosted version of MongoDB. https://www.mongodb.com/cloud/atlas?tck=docs_server

#### 3. Configure Google Translate

In your `.env` file (see example for required variables) you'll need to provide a service account key. Follow the instrustions here: https://cloud.google.com/translate/docs/setup

#### 4. Configure Insomnia

This step is optional, you can use any HTTP client you like for testing endpoints. However, I use Insomnia: https://insomnia.rest/

Simply download the app and then import `insomnia-workspace.json` into the it.

#### 5. Install packages with Yarn

We're using yarn to manage packages so once you've cloned this repository (and followed the steps above) simple run the following command in the repo directory:

```
yarn
```

#### 6. Run local dev

To start up the local development server run:

```
yarn dev
```

The server will then be running on http://localhost:3000 with a hot reloading client up running on http://localhost:3002

#### 7. Running Storybook

If you want to work on front end components, without starting the server run:

```
yarn docs
```

This will start an instance of Storybook running on http://localhost:3001, without the server running. To add a new story, add a file to `/docs` called `Component.docs.jsx`. More information on using Storybook here: https://storybook.js.org/
