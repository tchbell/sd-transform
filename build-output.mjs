// import { registerTransforms } from '@tokens-studio/sd-transforms';
// import StyleDictionary from 'style-dictionary';

// registerTransforms(StyleDictionary);

// const sd = StyleDictionary.extend({
//     source: ['tokens/**/*.json'], // Make sure this matches your token files!!!
//     platforms: {
//         css: {
//             transformGroup: 'tokens-studio',
//             buildPath: 'build/css/',
//             files: [
//                 {
//                     destination: 'variables.css',
//                     format: 'css/variables',
//                 },
//             ],
//         },
//     },
// });

// sd.cleanAllPlatforms();
// sd.buildAllPlatforms();

// import fs from 'fs';
// import path from 'path';
// import { registerTransforms } from '@tokens-studio/sd-transforms';
// import StyleDictionary from 'style-dictionary';

// registerTransforms(StyleDictionary);

// const brandFolder = 'tokens/Brands/BrandA'; // Specify the folder where brand files are located

// // Get a list of brand files in the specified folder
// const brandFiles = fs.readdirSync(brandFolder);
// console.log(brandFiles);
// const sd = StyleDictionary.extend({
//     source: ['tokens/**/*.json'], // Make sure this matches your token files!!!
//     platforms: {
//         css: {
//             transformGroup: 'tokens-studio',
//             buildPath: 'build/css/',
//             files: brandFiles.map(brandFile => ({
//                 destination: `${path.basename(brandFile, '.json')}.css`,
//                 format: 'css/variables',
//                 filter: (token) => token.attributes.category === path.basename(brandFile, '.json')
//             }))
//         },
//     },
// });

// sd.cleanAllPlatforms();
// sd.buildAllPlatforms();
import { registerTransforms, permutateThemes } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { readFile } from 'fs/promises';
registerTransforms(StyleDictionary, {
    /* options here if needed */
});


async function run() {
    const $themes = JSON.parse(await readFile('tokens/$themes.json', 'utf-8'));
    console.log('themes', $themes);
    const configs = $themes.map(theme => ({
        source: Object.entries(theme.selectedTokenSets)
            .filter(([, val]) => val !== 'disabled')
            .map(([tokenset]) => `${tokenset}.json`),
        platforms: {
            css: {
                transformGroup: 'tokens-studio',
                files: [
                    {
                        destination: `vars-${theme.name}.css`,
                        format: 'css/variables',
                    },
                ],
            },
        },
    }));

    console.log('configs', configs);
    configs.forEach(cfg => {
        console.log('cfg', cfg);
        const sd = StyleDictionary.extend(cfg);
        sd.cleanAllPlatforms(); // optionally, cleanup files first..
        sd.buildAllPlatforms();
    });
}

run();