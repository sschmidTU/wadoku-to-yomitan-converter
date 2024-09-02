import FS from "fs";
import path from 'path';
import {fileURLToPath} from 'url';
import { Dictionary, DictionaryIndex, TermEntry } from "yomichan-dict-builder";

async function init() {
    console.log("generating Yomitan dictionary file. This may take a few seconds.");
    const __filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(__filename);
    // the following wadokudict file needs to be downloaded externally, see readme
    //   (EDICT-Version from here: https://www.wadoku.de/wiki/display/WAD/Downloads+und+Links -> extract text file)
    FS.readFile(dirname + "/wadokudict", "utf8" , (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        processFile(data, dirname);
    });
}

async function processFile(fileString, dirname) {
    const dictionary = new Dictionary({
        fileName: 'wadokuYomitan.zip',
    });
    
    const index = new DictionaryIndex()
    .setTitle('Wadokutan')
    .setRevision('0.1')
    .setAuthor('sschmidTU')
    .setDescription('Wadoku Japanese-German Dictionary (EDICT version) converted to Yomitan with yomichan-dict-builder')
    .setAttribution("MIT License")
    .setUrl('https://github.com/sschmidTU/wadoku-to-yomitan-converter')
    // ...additional index details
    .build();
    
    await dictionary.setIndex(index);

    const rows = fileString.split("\n");
    for (let i=0; i < rows.length - 1; i++) {
        const row = rows[i];
        let readingPartIndex = row.indexOf("[") + 1;
        // let definitionPartIndex = row.indexOf(" ", readingPartIndex + 1);
        let definitionPartIndex = row.indexOf("]") + 1;
        const wordPart = row.substring(0, readingPartIndex - 1).trim();
        if (wordPart.trim() === "") {
            continue;
        }
        const readingPart = row.substring(readingPartIndex, definitionPartIndex - 1).trim();
        const definitionPart = row.substring(definitionPartIndex + 1).trim();
        const definitions = definitionPart.split("/");

        const entry = new TermEntry(wordPart)
            .setReading(readingPart);

        let addedDefinition = false;
        for (const definition of definitions) {
            if (definition.trim() == "") {
                continue;
            }
            // /** @type {import('../dist/types/yomitan/termbank').StructuredContent} */
            // const sc = {
            //     tag: 'span',
            //     content: 'string',
            //     data: {
            //         'dict-data': definition
            //     },
            //     lang: 'de',
            //     style: {
            //         fontSize: '20px',
            //         fontWeight: 'normal',
            //         textDecorationLine: 'overline',
            //     },
            // }
            //console.log("definition: " + definition);
            // const detailedDefinition = {
            //     type: 'structured-content',
            //     content: sc,
            //   };
            entry.addDetailedDefinition(definition);
            addedDefinition = true;
        }
        if (!addedDefinition) {
            continue;
        }
        const termInformation = entry.build();
        await dictionary.addTerm(termInformation);
    }

    // export
    const stats = await dictionary.export('./');
    console.log('Done exporting!');
    console.table(stats);
}

init();
