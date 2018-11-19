# node-assignment
Contains a simple POC where primality check is done in node and via c++ addon.

# requirements
* First of all make sure you have the following dependencies 
  ..* _python 2.7_ 
  ..* _gcc_
  ..* _node > 10_
  ..* _mongodb_ (Run mongo local or you can provide DATABASE_URL as env parameter while running project)

* `git clone` and `npm install`
* **If running on server other than macosx** do `npm run compile`. This runs `node-gyp` and compiles c++ addon and saves under `./build/Release/addon`

# `npm run start` to start local server at port 3000

# For API reference you can import the following postman collection https://gist.github.com/fuzzy-coder/e081a1804f45d75e037a15362559d94e
