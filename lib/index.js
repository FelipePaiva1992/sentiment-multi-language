/**
 * AFINN-based sentiment analysis for Node.js
 *
 * @package sentiment-multi-language
 * @author Andrew Sliwinski <andrewsliwinski@acm.org> modified by Felipe Paiva (multi language)
 */

/**
 * Dependencies
 */
var assign = require('lodash.assign');
var afinnEN_US = require('../build/AFINN_EN_US.json');
var afinnPT_BR = require('../build/AFINN_PT_BR.json');
var tokenize = require('./tokenize');

var afinn = afinnPT_BR;
/**
 * Performs sentiment analysis on the provided input 'phrase'.
 *
 * @param {String} Input phrase
 * @param {String} OptionalLanguage specific Language ( default: pt-BR, en-US )
 * @param {Object} Optional sentiment additions to AFINN (hash k/v pairs)
 *
 * @return {Object}
 */
module.exports = function (phrase, language, inject, callback) {
    // Parse arguments
    if (typeof phrase === 'undefined') phrase = '';
    if (typeof inject === 'undefined') inject = null;
    if (typeof language === 'undefined') language = null;
    if (typeof language === 'object') inject = language;
    if (typeof inject === 'function') callback = inject;
    if (typeof callback === 'undefined') callback = null;

    //Language
    if (language !== null) {
        switch(language) {
        case 'pt-BR':
            afinn = afinnPT_BR;
            break;
        case 'en-US':
            afinn = afinnEN_US;
            break;
        default:
            afinn = afinnPT_BR;
        }
    }

    // Merge
    if (inject !== null) {
        afinn = assign(afinn, inject);
    }

    // Storage objects
    var tokens      = tokenize(phrase),
        score       = 0,
        words       = [],
        positive    = [],
        negative    = [];

    // Iterate over tokens
    var len = tokens.length;
    while (len--) {
        var obj = tokens[len];
        var item = afinn[obj];
        if (!afinn.hasOwnProperty(obj)) continue;

        words.push(obj);
        if (item > 0) positive.push(obj);
        if (item < 0) negative.push(obj);

        score += item;
    }

    // Handle optional async interface
    var result = {
        score:          score,
        comparative:    score / tokens.length,
        tokens:         tokens,
        words:          words,
        positive:       positive,
        negative:       negative
    };

    if (callback === null) return result;
    process.nextTick(function () {
        callback(null, result);
    });
};
