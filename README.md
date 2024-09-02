# Wadoku to Yomitan Converter

This lets you convert an EDICT version of [Wadoku](https://www.wadoku.de/) (well-known Japanese-German dictionary)
to be used/imported in Yomitan (or Yomichan).

## Usage
* Run `npm install` (if you don't have npm, install it from [here](https://nodejs.org/en))
* Download the "EDICT-Version" of Wadoku from [here](https://www.wadoku.de/wiki/display/WAD/Downloads+und+Links)
* Extract the wadoku text file from the .tar.gz file (may need to extract twice with 7-zip)
* Put the file just named `wadoku` (no `.txt`) in this folder
* Run `npm run build`
* The `wadokuYomitan.zip` file will be in this folder
* Import this .zip file in Yomitan/Yomichan

Using [yomichan-dict-builder](https://github.com/MarvNC/yomichan-dict-builder/) - thanks!
Please note the [Wadoku license](https://www.wadoku.de/wiki/pages/viewpage.action?pageId=357).
