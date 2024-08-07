const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());   


app.post('/reviewCongty', (req, res) => {
    const newReview = req.body;
  
    // Read existing data from file
    fs.readFile('review2.json', 'utf8', (err, data) => {
      let reviews = []; // Initialize reviews as an empty array unconditionally
  
      if (err) {
        console.error('Error reading file:', err);
      } else {
        try {
          reviews = JSON.parse(data);
          if (!Array.isArray(reviews)) {
            reviews = [];
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
  
      // Add new review
      reviews.push(newReview);
  
      // Write updated data to file
      fs.writeFile('review2.json', JSON.stringify(reviews, null, 2), (err) => {
        if (err) {
          console.error('Error saving review:', err);
          res.status(500).send('Error saving review');
        } else {
          res.send('Review saved successfully');
        }
      });
    });
  });
  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});