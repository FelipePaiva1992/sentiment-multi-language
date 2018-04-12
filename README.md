## sentiment (multi language)
#### AFINN-based sentiment analysis for Node.js (multi language)

### Forked from (https://github.com/thisandagain/sentiment) and modified by Felipe Paiva

#### Suported Languages
- Brazilian Portuguese (ptBR)
- English (usEN)


Sentiment is a Node.js module that uses the [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) wordlist to perform [sentiment analysis](http://en.wikipedia.org/wiki/Sentiment_analysis) on arbitrary blocks of input text. Sentiment provides serveral things:

- Performance (see benchmarks below)
- The ability to append and overwrite word / value pairs from the AFINN wordlist
- A build process that makes updating sentiment to future versions of the AFINN word list trivial

### Installation
```bash
npm install sentiment-multi-language
```

### Usage
```javascript
var sentiment = require('sentiment-multi-language');

var r1 = sentiment('Gatos são estúpidos!');
console.dir(r1);      // Score: -2, Comparative: -0.666

var r1 = sentiment('Cats are stupid!', 'usEN');
console.dir(r1);       // Score: -2, Comparative: -0.666
```

### Adding / overwriting words
You can append and/or overwrite values from AFINN by simply injecting key/value pairs into a sentiment method call:
```javascript
var sentiment = require('sentiment-multi-language');

var result = sentiment('Gatos são incríveis!', {
    'gatos': 5,
    'incríveis': 2  
});
console.dir(result);    // Score: 7, Comparative: 1.75
```
