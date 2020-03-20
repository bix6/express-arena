const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
    res.send("Bubbalu's Bodacious Burgers");
})

app.get('/coronavirus', (req, res) => {
    res.send('Lockdown in Effect ahhhhh');
})

app.get('/trash', (req, res) => {
    res.send('traaaaaaash');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
    `;
    res.send(responseText);
})

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); // don't send any data back to client
})

app.get('/greetings', (req, res) => {
    // Get values from request
    const name = req.query.name;
    const race = req.query.race;

    // Validate vals
    if (!name) {
        return res.status(400).send('Please provide a name');
    }
    if (!race) {
        return res.status(400).send('Please provide a race');
    }

    // Create response and send it
    const greeting = `Greetings ${name} the ${race}, welcome to hell!!!`
    res.send(greeting);
});

app.get('/sum', (req, res) => {
    // Get a, b and check they exist
    const {a, b} = req.query;

    if (!a) {
        return res.status(400).send('Please provide a');
    }
    if (!b) {
        return res.status(400).send('Please provide b');
    }

    // Convert to Numbers and confirm Number type
    // NaN = Not a Number
    const aNum = Number(a);
    const bNum = Number(b);

    if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
        return res.status(400).send('Values must be numbers');
    }

    // Create return string with sum
    const sumString = `The sum of ${aNum} and ${bNum} is ${aNum+bNum}`
    res.send(sumString);
});

app.get('/cipher', (req, res) => {
    // Get query vals and confirm they exist
    let { text, shift } = req.query;

    if(!text) {
        return res.status(400).send('Please provide text');
    }
    if(!shift) {
        return res.status(400).send('Please provide shift');
    }

    // Confirm shift is a number
    shift = Number(shift);
    if (Number.isNaN(shift)) {
        return res.status(400).send('Shift must be a number');
    }

    // Convert text to uppercase for ease
    // Create cipherString and loop through text
    // Adding to cipherString as we go
    text = text.toUpperCase();
    let cipherString = '';

    for (let i = 0; i < text.length; i++) {
        let charVal = text.charCodeAt(i);

        // A = 65, Z = 90
        // If char isn't A-Z we leave it as is
        if (charVal >= 65 && charVal <= 90) {
            charVal += shift;

            if (charVal > 90) {
                charVal = charVal % 90 + 64;
            }
        }

        cipherString += String.fromCharCode(charVal);
    }

    res.send(cipherString);
});

app.get('/lotto', (req, res) => {
    let { numbers } = req.query;

    // Check numbers
    if (!numbers) {
        return res.status(400).send('Please provide numbers');
    }

    // Create a Set (only allows unique vals)
    // After mapping numbers to Number type
    numbers = [...new Set(numbers.map(val => Number(val)))];

    if (numbers.length != 6) {
        return res.status(400).send('Please provide 6 unique values');
    }
    // Check numbers are within [1,20]
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        if (Number.isNaN(num) || num < 1 || num > 20) {
            return res.status(400).send('Values must be 1-20');
        }
    }

    // Create a Set to store the 6 unique lottoNums
    let lottoNums = new Set();

    while (lottoNums.size < 6) {
        lottoNums.add(Math.floor(Math.random()*20)+1);
    }

    // Compare the two sets and count the matches
    let matchCount = 0;

    numbers.forEach(num => {
        if (lottoNums.has(num)) {
            matchCount++;
        }
    })

    // Create response string
    let responseString = 'L for Love';

    if (matchCount === 4) {
        responseString = '4/6 You Win... Nothing!';
    }
    else if (matchCount === 5) {
        responseString = '5/6 You win 1 Bitcoin';
    }
    else if (matchCount === 5) {
        responseString = '6/6 Winner Winner Javascript Dinner';
    }

    res.send(responseString);
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});